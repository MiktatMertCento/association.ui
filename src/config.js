import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCa3ZadxYDZmn7XNJJj44DTsWTxjJWI15k",
  authDomain: "dernek-mc.firebaseapp.com",
  projectId: "dernek-mc",
  storageBucket: "dernek-mc.appspot.com",
  messagingSenderId: "876717851776",
  appId: "1:876717851776:web:8d742334c2a3dcc5239265"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { auth, firebase, db, storage, googleAuthProvider, emailAuthProvider };
