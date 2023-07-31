// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDko6DOd8LLJdHLZPAyyCOknQo0GiPDxbg",
  authDomain: "react-cursos-99b06.firebaseapp.com",
  projectId: "react-cursos-99b06",
  storageBucket: "react-cursos-99b06.appspot.com",
  messagingSenderId: "62593048904",
  appId: "1:62593048904:web:f28b76282dd1cacb4ed37d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );