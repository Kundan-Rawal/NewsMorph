import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfPVmGvZcV8BL6_W6YZfoTe4UpMKNLlhY",
    authDomain: "newsmorph.firebaseapp.com",
    projectId: "newsmorph",
    storageBucket: "newsmorph.firebasestorage.app",
    messagingSenderId: "453511275395",
    appId: "1:453511275395:web:26dabdd1b3a35bd859ccb6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };