// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe6pm8-tXOtiu40I4pvjrJQiIWO2YXJnA",
  authDomain: "netflixgpt-fd7d3.firebaseapp.com",
  projectId: "netflixgpt-fd7d3",
  storageBucket: "netflixgpt-fd7d3.appspot.com",
  messagingSenderId: "587629639488",
  appId: "1:587629639488:web:022100319a4dc0677d6ca5",
  measurementId: "G-BDK8C317D1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
