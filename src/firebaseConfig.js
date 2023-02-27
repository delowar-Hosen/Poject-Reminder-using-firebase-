// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-p73cyYdGo4q7RK76TaCSau1iP-dAOPc",
  authDomain: "poject-reminder.firebaseapp.com",
  projectId: "poject-reminder",
  storageBucket: "poject-reminder.appspot.com",
  messagingSenderId: "650754726205",
  appId: "1:650754726205:web:1853d8933dc7f6df23cd54",
  measurementId: "G-6D4S3VP7NW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
