// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "moneymind-1723e.firebaseapp.com",
  projectId: "moneymind-1723e",
  storageBucket: "moneymind-1723e.firebasestorage.app",
  messagingSenderId: "317378081976",
  appId: "1:317378081976:web:c831bfdf97f8763fc3f04d",
  measurementId: "G-CLKE9TCZR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);