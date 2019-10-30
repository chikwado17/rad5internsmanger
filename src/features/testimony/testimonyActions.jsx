import { toastr } from 'react-redux-toastr';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { createNewTestimony} from '../../app/common/utils/helpers';
import moment from 'moment';
import firebase from '../../app/config/firebase.js';
// import compareAsc from 'date-fns/compare_asc';


export const createTestimony = (testimony) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        const facebookUrl = getState().firebase.profile.facebookUrl;
        const twitterUrl = getState().firebase.profile.twitterUrl;
        const gitUrl = getState().firebase.profile.gitUrl;
        let newTestimony = createNewTestimony(user, photoURL, testimony, facebookUrl ,twitterUrl, gitUrl);

        try {
          let createdTestimony = await firestore.add(`testimonies`, newTestimony);

            await firestore.set(`testimonys/${createdTestimony.id}_${user.uid}`, {
                testimonyId: createdTestimony.id,
                userUid:user.uid,
                eventDate:testimony.date,
                host:true
            })
            toastr.success('success', 'Testimony has been created');
        }catch(error){
            toastr.error('Oops!', 'Unable to add testimony');
        }
    }
};

export const deleteTestimony = (testimonyId) => ({
    type: 'DELETE_TESTIMONY',
    testimonyId
});





export const updateTestimony = (testimony) => {
   return async (dispatch, getState, { getFirestore }) => {
       const firestore = getFirestore();
       if(testimony.date !== getState().firestore.ordered.testimonies[0].date) {
           testimony.date = moment(testimony.date).toDate();
       }
       try {
            await firestore.update(`testimonies/${testimony.id}`, testimony);
            toastr.success("Success", "Testimony has been updated");
          
       }catch(error){
        
            toastr.errofirebase("Opps!!!", "Error occured updating testimony");
        }
   }
}



//for filtering
export const getTestimonyDashboard = (lastTestimony) => {
    return async (dispatch, getState) => {
       
        // let today = new Date(Date.now());
        const firestore = firebase.firestore();
        const testimonyRef = firestore.collection('testimonies');
       
        try {
            dispatch(asyncActionStart());
            let startAfter = lastTestimony && await firestore.collection('testimonies').doc(lastTestimony.id).get();
            let query;

            lastTestimony ? query = testimonyRef
            // .where('date', '>=', today)
            .orderBy('date').startAfter(startAfter)
            .limit(2)

            : query = testimonyRef
            // .where('date', '>=', today)
            .orderBy('date').limit(2)

            let querySnap = await query.get();
     
                if(querySnap.docs.length === 0) {
                    dispatch(asyncActionFinish());
                    return querySnap;
                }

            let testimony = [];

            for(let i = 0; i < querySnap.docs.length; i++) {
                let tst = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
                testimony.push(tst);
            }

            dispatch({
                type: "FETCH_TESTIMONY",
                testimony
            })
            dispatch(asyncActionFinish())

            return querySnap;
        }catch(error){
            console.log(error);
            dispatch(asyncActionError());
        }
    }
}


//for chat/comment
//adding comment/chat to firebase
export const addTestimonyComment = (testimonyId, values, parentId) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        // getting logged in user profile
        const profile = getState().firebase.profile;
        //getting current logged in user id.
        const user = firebase.auth().currentUser;

        let newComment = {
            parentId:parentId,
            displayName:profile.displayName,
            photoURL: profile.photoURL || 'assets/user.png',
            uid:user.uid,
            text:values.comment,
            date: Date.now()
        }
        try{
            await firebase.push(`testimony_chat/${testimonyId}`, newComment);
        }catch(error){
            console.log(error);
            toastr.error('Oops!', 'Error sending comment');
        }
    }
}