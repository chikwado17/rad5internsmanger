import { toastr } from 'react-redux-toastr';
// // import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { createNewTestimony} from '../../app/common/utils/helpers';
import moment from 'moment';
// import firebase from '../../app/config/firebase.js';
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
            await firestore.add(`testimonies`, newTestimony);
            toastr.success('success', 'Testimony has been created');
        }catch(error){
            toastr.error('Oops!', 'Unable to add testimony');
        }
    }
};


// export const createTestimony = (testimony) => ({
//     type: 'CREATE_TESTIMONY',
//     testimony
// });



// export const updateTestimony = (testimony) => ({
//     type: 'UPDATE_TESTIMONY',
//     testimony
// });



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
        
            toastr.error("Opps!!!", "Error occured updating testimony");
        }
   }
}

