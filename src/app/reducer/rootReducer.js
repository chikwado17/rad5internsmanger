import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { testimonyReducer } from '../../features/testimony/testimonyReducer';
import { modalReducer } from '../../features/modals/modalReducer';
import { authReducer } from '../../features/auth/authReducer';
import { asyncReducer } from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
    async:asyncReducer,
    auth: authReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    form:FormReducer,
    testimony:testimonyReducer,
    modals:modalReducer,
    toastr:toastrReducer
});

export default rootReducer;