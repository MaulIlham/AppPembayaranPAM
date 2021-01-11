import * as firebase from 'firebase'
import firestore from 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyAnG8baFJplp7ZVEBK773F97tfNamvDee8",
    authDomain: "pembayaranpam.firebaseapp.com",
    databaseURL: "https://pembayaranpam-default-rtdb.firebaseio.com",
    projectId: "pembayaranpam",
    storageBucket: "pembayaranpam.appspot.com",
    messagingSenderId: "1071024372701",
    appId: "1:1071024372701:web:a8e0d7457f8dd64a191434",
    measurementId: "G-1FZ0KW7NN7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase
