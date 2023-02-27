// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = GoogleAuthProvider();

export default app;