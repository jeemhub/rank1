// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC388byiK4PIsYGqzgPGTHU5we_f63i4VM",
  authDomain: "rank-87c16.firebaseapp.com",
  projectId: "rank-87c16",
  storageBucket: "rank-87c16.appspot.com",
  messagingSenderId: "757104282891",
  appId: "1:757104282891:web:9a00b3811d17e11442660e",
  measurementId: "G-KTJWBXF1QG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth= getAuth(app);
const analytics = getAnalytics(app);

