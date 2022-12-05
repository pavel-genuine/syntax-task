// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCboq_ixsn8kQlf11uFdsm4HuYPrifNQts",
  authDomain: "syntax-task.firebaseapp.com",
  projectId: "syntax-task",
  storageBucket: "syntax-task.appspot.com",
  messagingSenderId: "1090750649842",
  appId: "1:1090750649842:web:4830a1d4da81251928876b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;