// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkr4A_W9pTUACGX26gjxDHKI7DK_eIy80",
  authDomain: "todo-list-e689f.firebaseapp.com",
  projectId: "todo-list-e689f",
  storageBucket: "todo-list-e689f.appspot.com",
  messagingSenderId: "109960990625",
  appId: "1:109960990625:web:5e09ddee4ab4dfb53585e0",
  measurementId: "G-J48QWSB5GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);