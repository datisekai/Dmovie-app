// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_rbdJTqnpt64OMQXqCC26Boo5LviM5Hc",
  authDomain: "dmovie-app.firebaseapp.com",
  projectId: "dmovie-app",
  storageBucket: "dmovie-app.appspot.com",
  messagingSenderId: "798032523404",
  appId: "1:798032523404:web:dfe928ca272bfafde30ba9",
  measurementId: "G-013J3T2YVG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
