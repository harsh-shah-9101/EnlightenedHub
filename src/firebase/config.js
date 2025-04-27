



import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firebase before any other Firebase operations
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
auth.useDeviceLanguage();

const githubProvider = new GithubAuthProvider();

// Helper function to get current user state
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, 
            (user) => {
                unsubscribe();
                resolve(user);
            },
            reject
        );
    });
};

export { auth, githubProvider };