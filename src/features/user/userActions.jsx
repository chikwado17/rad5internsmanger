import moment from 'moment';
import cuid from 'cuid';
import {toastr} from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import firebase from 'firebase';



//to update userprofile on firebase
export const updateProfile = (user) => {
    return async (dispatch, getState, {getFirebase}) => {

        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user;
        if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Profiled updated');
        }catch(error){
            console.log(error);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////

//storing image to firebase storage
export const uploadProfileImage = (file,fileName) => {
    return async (dispatch, getState, { getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name:imageName
        };
        try {
            dispatch(asyncActionStart());
            //upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            
            //get url of the image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
           
            //get userdoc
            let userDoc = await firestore.get(`users/${user.uid}`);
            //check if user has a photo, if not update profile with new image
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                });
                //update users profile.
                await user.updateProfile({
                    photoURL:downloadURL
                });
            }
            //add the new photo to photos collection
            await firestore.add({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos'}]
            },{
                name:imageName,
                url:downloadURL
            });
            dispatch(asyncActionFinish());
        }catch(error){
            console.log(error);
            dispatch(asyncActionError());
            throw new Error('Problem uploading photo');
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////

//action to delete photo from firebase storage and firestore collection
export const deletePhoto = (photo) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try{
       
            //firebase deleteFile to delete file from firebase in this case firebase storage photos
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
//deleting from firestore database
            await firestore.delete({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos', doc: photo.id}]
            });
     
        }catch(error){
            console.log('error');
     
            throw new Error('Problem deleting photo');
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////

//action to set main profile photo 
//with firebase data consistency
export const setMainPhoto = (photo) => {
    return async (dispatch, getState ) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        let userDocRef = firestore.collection('users').doc(user.uid);
        let eventAttendeeRef = firestore.collection('testimonys');
        try {
           let batch = firestore.batch();
           await batch.update(userDocRef, {
                photoURL: photo.url
           });

           let eventQuery = await eventAttendeeRef.where('userUid', '==', user.uid)
            .orderBy('eventDate');

           let eventQuerySnap = await eventQuery.get();

           for(let i = 0; i < eventQuerySnap.docs.length; i++){
               let eventDocRef = await firestore.collection('testimonies').doc(eventQuerySnap.docs[i].data().testimonyId);

               //checking if the user is hosting this particular event then update the hostPhotoURL
               let event = await eventDocRef.get();

               if(event.data().hostUid === user.uid){
                   batch.update(eventDocRef, {
                       hostPhotoURL: photo.url          
                   })
                }

        }

        await batch.commit();
        dispatch(asyncActionFinish());
        }catch(error){
            console.log(error);
            dispatch(asyncActionError());
            throw new Error('Prolem setting main photo')
        }
    }
}
