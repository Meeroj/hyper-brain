// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvPB_g2by5UegilbOOgfjnxZqyL1u86Go",
    authDomain: "hyper-brain.firebaseapp.com",
    projectId: "hyper-brain",
    storageBucket: "hyper-brain.appspot.com",
    messagingSenderId: "239644096901",
    appId: "1:239644096901:web:03ba3562536885874aacec",
    measurementId: "G-F0GG5R2CK0"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
