// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBadaorInVVfpPHFb_mdp7zy5mHStqMXDs",
  authDomain: "videoapp-f279f.firebaseapp.com",
  projectId: "videoapp-f279f",
  storageBucket: "videoapp-f279f.appspot.com",
  messagingSenderId: "263012380728",
  appId: "1:263012380728:web:0c4c73b48e59bb02f9b6cd",
  measurementId: "G-GGQXG8JV2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;