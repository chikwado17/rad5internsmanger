import moment from 'moment';
import cuid from 'cuid';
import {toastr} from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import firebase from '../../app/config/firebase';



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

//action to set main profile photo
export const setMainPhoto = (photo) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        try {
            return await firebase.updateProfile({
                photoURL:photo.url
            })
        }catch(error){
            console.log(error);
            throw new Error('Prolem setting main photo')
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////

// //action to set main profile photo 
// //with firebase data consistency
// export const setMainPhoto = (photo) => {
//     return async (dispatch, getState ) => {
//         dispatch(asyncActionStart());
//         const firestore = firebase.firestore();
//         const today = new Date(Date.now());
//         const user = firebase.auth().currentUser;

//         //getting user document which is user data's
//         let userDocRef = firestore.collection('users').doc(user.uid);
//         //getting the event attendee collection
//         let eventAttendeeRef = firestore.collection('event_attendee');


//         try {
//             //batch for data consistency
//            let batch = firestore.batch();
//            //updating the user doc photourl
//            await batch.update(userDocRef, {
//                 photoURL: photo.url

//            });

//            let eventQuery = await eventAttendeeRef.where('userUid', '==', user.uid)
//                 .where('eventDate', '>', today);

//             //getting the exact data of the eventQuery and loop through them
//            let eventQuerySnap = await eventQuery.get();

//            for(let i = 0; i < eventQuerySnap.docs.length; i++){
//                let eventDocRef = await firestore.collection('events').doc(eventQuerySnap.docs[i].data().eventId);

//                //checking if the user is hosting this particular event then update the hostPhotoURL
//                let event = await eventDocRef.get();
// //checking if the user is hosting this particular event then update the hostPhotoURL
//                if(event.data().hostUid === user.uid){
//                    batch.update(eventDocRef, {
//                        hostPhotoURL: photo.url,
//                        //and also update the attendees photo
//                        [`attendees.${user.uid}.photoURL`]: photo.url
//                    })
//                }else {
//                 batch.update(eventDocRef, {
                   
//                     [`attendees.${user.uid}.photoURL`]: photo.url
//                })
//            }

//         }

//         await batch.commit();
//         dispatch(asyncActionFinish());
//         }catch(error){
//             console.log(error);
//             dispatch(asyncActionError());
//             throw new Error('Prolem setting main photo')
//         }
//     }
// }


///////////////////////////////////////////////////////////////////////////////////////////////

//without data consistency called transaction method.

// export const goingToEvent = (event) => {
//     return async (dispatch, getState, {getFirestore}) => {
//         const firestore = getFirestore();
//         const user = firestore.auth().currentUser;
//         const photoURL = getState().firebase.profile.photoURL;

//         const attendee = {
//             going: true,
//             joinDate: Date.now(),
//             photoURL: photoURL || '/assets/user.png',
//             displayName:user.displayName,
//             host:false
//         }
//         try{
//             await firestore.update(`events/${event.id}`,{
//                 [`attendees.${user.uid}`]: attendee
//             })

//             await firestore.set(`event_attendee/${event.id}_${user.uid}`,{
//                 eventId:event.id,
//                 userUid:user.uid,
//                 eventDate:event.date,
//                 host:false
//             })

//             toastr.success('Success', 'You have signed in for this event');
//         }catch(error){

//             console.log(error);
//             toastr.error('Oops!', 'Problem signing up to event')
//         }
//     }
// }



//with data consistency -> Transaction
export const goingToEvent = (event) => {
    return async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;

        const attendee = {
            going: true,
            joinDate: Date.now(),
            photoURL: profile.photoURL || '/assets/user.png',
            displayName: profile.displayName,
            host:false
        }
        try{

            let eventDocRef = firestore.collection('events').doc(event.id);
            let eventAttendeeDocRef = firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`);

            await firestore.runTransaction(async (transaction) => {

                await transaction.get(eventDocRef);

                // updating an event with user going to an event
                await transaction.update(eventDocRef, {

                    [`attendees.${user.uid}`]: attendee
                });

                await transaction.set(eventAttendeeDocRef, {
                    eventId:event.id,
                    userUid:user.uid,
                    eventDate:event.date,
                    host:false
                })
            })

            dispatch(asyncActionFinish());
            toastr.success('Success', 'You have signed in for this event');
        }catch(error){

            console.log(error);
            dispatch(asyncActionError());
            toastr.error('Oops!', 'Problem signing up to event')
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////


export const cancelGoingToEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;

        try{
            await firestore.update(`events/${event.id}`,{

                //firestore.fieldvalue.delete is a method to delete a single document in firestore
                [`attendees.${user.uid}`]: firestore.FieldValue.delete()
            })

            await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

            toastr.success('Success', 'You have removed yourself from the event');

        }catch(error){
            console.log(error);
            toastr.error('Oops!', 'Something went wrong');
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////


//method to filter events by past events and future events by date and also filter events hosted by the host which is the current user
export const getUserEvents = (userUid, activeTab) => {
    return async (dispatch, getState) => {
        const firestore =  firebase.firestore();
        const today = new Date(Date.now());
        let eventsRef = firestore.collection('event_attendee');
        let query;

        switch(activeTab){
            case 1: //for past event filtering
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('eventDate', '<=', today)
                    .orderBy('eventDate', 'desc');
                    break;
            case 2: //for future event filtering
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('eventDate', '>=', today)
                    .orderBy('eventDate');
                    break;
            case 3: //for host event filtering
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('host', '==', true)
                    .orderBy('eventDate', 'desc');
                    break;
            default:
            query = eventsRef
                .where('userUid', '==', userUid)
                .orderBy('eventDate', 'desc');
                break;
        }

        try{
            dispatch(asyncActionStart());
            let querySnap = await query.get();
            let events = [];

            for(let i = 0; i < querySnap.docs.length; i++) {
                    let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
                    events.push({...evt.data(), id: evt.id })
            }
            dispatch({
                type: "FETCH_EVENTS",
                events
            });
            dispatch(asyncActionFinish());
        }catch(error){
            console.log(error);
            dispatch(asyncActionError());
        }
    } 
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//creating an action to follow a user then
//create a subcollection on users collection named following that will store the user been followed document
export const followUser = (userToFollow) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore(); 
        const user = firestore.auth().currentUser;

        const following = {
            photoURL: userToFollow.photoURL || '/assets/user.png',
            city: userToFollow.city || 'Unknown City',
            displayName: userToFollow.displayName
        };

        try {

            await firestore.set({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'following', doc: userToFollow.id}]
            }, following);

        }catch(error){
            console.log(error);
        }
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//action to unfollow a user
export const unfollowUser = (userToUnfollow) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;

        try {

            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'following',  doc: userToUnfollow.id }]
            })

        }catch(error) {
            console.log(error);
        }
    }
}