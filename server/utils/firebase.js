// const the functions you need require(the SDKs you need
const { initializeApp } = require('firebase/app');
// const { getAnalytics } require('firebase/analytics'
// const { getDatabase } = require('firebase/database');
const { getAuth } = require('firebase/auth');
require('dotenv').config();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
const auth = getAuth(app);

module.exports = { app, auth }