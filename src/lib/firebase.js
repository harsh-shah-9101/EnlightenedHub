// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGW_3IHUeLe9TBgQgoRg7-KrG1x0AYzQk",
  authDomain: "enlightenedhub-72532.firebaseapp.com",
  databaseURL: "https://enlightenedhub-72532-default-rtdb.firebaseio.com",
  projectId: "enlightenedhub-72532",
  storageBucket: "enlightenedhub-72532.firebasestorage.app",
  messagingSenderId: "286797449345",
  appId: "1:286797449345:web:dbd585646df9181837a580",
  measurementId: "G-5T6XRW0VGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);