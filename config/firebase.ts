// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3EIACWtRjLCJGkLk5Bo8sFcCOKVO9vhY",
  authDomain: "app-fest-236ba.firebaseapp.com",
  projectId: "app-fest-236ba",
  storageBucket: "app-fest-236ba.appspot.com",
  messagingSenderId: "152166030817",
  appId: "1:152166030817:web:8a51ff9d1ae64942e606a0",
  measurementId: "G-FYJ6QXSYG7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
