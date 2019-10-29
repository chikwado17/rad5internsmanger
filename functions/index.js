const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (type, testimony, id) => {
    return {
        type: type,
        testimonyDate: testimony.date,
        postedBy: testimony.postedBy,
        title: testimony.title,
        photoURL: testimony.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: testimony.hostUid,
        testimonyId: id
    }
}


exports.createActivity = functions.firestore
    .document('testimonies/{testimonyId}')
    .onCreate(testimony => {
        let newTestimony = testimony.data();
        console.log(newTestimony);

        const activity = newActivity('newTestimony', newTestimony, testimony.id)
        console.log(activity);

        return admin.firestore().collection('activity')
            .add(activity)
            .then((docRef) => {
                return console.log('Acivity Created with ID: ', docRef.id);
            })
            .catch((err) => {
                return console.log("Error adding activity", err);
            })
    })