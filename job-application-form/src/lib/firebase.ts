// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQORMcnZag5NHw4S8YJ4gyRlEOqERVRdI",
  authDomain: "job-application-form-41b08.firebaseapp.com",
  projectId: "job-application-form-41b08",
  storageBucket: "job-application-form-41b08.firebasestorage.app",
  messagingSenderId: "331817756087",
  appId: "1:331817756087:web:9b717ba20f6fe62440b432",
  measurementId: "G-SS49FX4D5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);