// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2zpB-jynAz1uNSKH1i7b_W9rGIDnmW1Q",
  authDomain: "in-kindd.firebaseapp.com",
  projectId: "in-kindd",
  storageBucket: "in-kindd.firebasestorage.app",
  messagingSenderId: "783418826187",
  appId: "1:783418826187:web:9ce1bb17027ba141596a4e",
  measurementId: "G-1LYJ5D0VPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);