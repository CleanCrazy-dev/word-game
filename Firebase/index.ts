import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLTuyDnCvtfDukqxsaliO1r9kgiHazzZY",
    authDomain: "imagina-word.firebaseapp.com",
    projectId: "imagina-word",
    storageBucket: "imagina-word.appspot.com",
    messagingSenderId: "802170688669",
    appId: "1:802170688669:web:705d4cc98675fea7edb074",
    measurementId: "G-YB4TXNZ3RT",
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.firestore();
export { firebase, storage as default };
