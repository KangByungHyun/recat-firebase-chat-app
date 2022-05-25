// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { initializeApp } from "firebase/compat/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCih7GkJAKAAH0nG9H0D7GQ9gaJb9swrDg",
    authDomain: "react-firebase-chat-app-b51ba.firebaseapp.com",
    databaseURL: "https://react-firebase-chat-app-b51ba-default-rtdb.firebaseio.com//",
    projectId: "react-firebase-chat-app-b51ba",
    storageBucket: "react-firebase-chat-app-b51ba.appspot.com",
    messagingSenderId: "755563083691",
    appId: "1:755563083691:web:2e003b67c4a95920c644ee",
    measurementId: "G-2LMQ0SRKS7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('app-firebase.js', app);
//const analytics = getAnalytics(app);

export default app;


