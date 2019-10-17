import firebase from 'firebase'
import 'firebase/firestore';


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDJDkZqR5qFJw68FdWfmFPG_ZIq2Nh6GoQ",
    authDomain: "rad5internsmanager.firebaseapp.com",
    databaseURL: "https://rad5internsmanager.firebaseio.com",
    projectId: "rad5internsmanager",
    storageBucket: "rad5internsmanager.appspot.com",
    messagingSenderId: "182812747831",
    appId: "1:182812747831:web:10e7fb81e14882add677b2",
    measurementId: "G-MBQ329S9J3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

  export default firebase;
