
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };