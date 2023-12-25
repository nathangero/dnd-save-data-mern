import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { config } from "dotenv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let firebaseConfig;

if (!import.meta.env?.VITE_FIREBASE_API) {
  // Run dotenv for node server
  config();
  firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API,
    authDomain: process.env.VITE_FIREBASE_DOMAIN,
    databaseURL: process.env.VITE_FIREBASE_DATABASE,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSENGING_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
  }
} else {
  // Run vite env for react frontend
  firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGING_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  }
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
