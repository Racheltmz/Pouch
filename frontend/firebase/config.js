// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_DB_URL, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_SENDERID, REACT_APP_APPID, REACT_APP_MEASUREMENTID } from "@env"

// Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DB_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDERID,
  appId: REACT_APP_APPID,
  measurementId: REACT_APP_MEASUREMENTID
};

console.log(REACT_APP_FIREBASE_API_KEY);
console.log(REACT_APP_AUTH_DOMAIN);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { db, auth };