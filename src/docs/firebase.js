import { getDatabase, ref, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateCurrentUser,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkapxEwhLRDpETdBPOVkWrvfmx3aLj4bQ",
  authDomain: "fir-react-app-a024a.firebaseapp.com",
  projectId: "fir-react-app-a024a",
  storageBucket: "fir-react-app-a024a.appspot.com",
  messagingSenderId: "1074738748573",
  appId: "1:1074738748573:web:bf9abce6b6d22a5b5a0874",
  measurementId: "G-JHTGZJW9SL",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getDatabase();
const messagesRef = ref(db, "messages");




export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, database, ref, push };

export const firestore = getFirestore(app);




// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase


export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateCurrentUser(auth, { displayName: name });
};

export const signIn = async (email, password) => {

  await signInWithEmailAndPassword (auth, email,password);
};


   