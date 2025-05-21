// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwWwbTa0as7AZQy-fMVDg5dKDU9bWMYkc",
  authDomain: "recipe-book-a-10.firebaseapp.com",
  projectId: "recipe-book-a-10",
  storageBucket: "recipe-book-a-10.firebasestorage.app",
  messagingSenderId: "13700733715",
  appId: "1:13700733715:web:07a270bf6ff327531118e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);