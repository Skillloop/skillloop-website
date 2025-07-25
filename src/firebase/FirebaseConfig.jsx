// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDs8zbYsMoMQdQUqsj-w2vlyBGzlrmDidU",
  authDomain: "skillloop-945f8.firebaseapp.com",
  projectId: "skillloop-945f8",
  storageBucket: "skillloop-945f8.firebasestorage.app",
  messagingSenderId: "1026924769877",
  appId: "1:1026924769877:web:16ccbe56fb5c2605e4dadc",
  measurementId: "G-ZTRQ098SSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const analytics = getAnalytics(app);

export {fireDB, auth, googleProvider}