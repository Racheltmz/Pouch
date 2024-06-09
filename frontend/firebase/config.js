// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR4tGGj-GL2AFimVC2Q27f-HWFD51BGWA",
  authDomain: "pouch-68119.firebaseapp.com",
  databaseURL: "https://pouch-68119-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pouch-68119",
  storageBucket: "pouch-68119.appspot.com",
  messagingSenderId: "990511746212",
  appId: "1:990511746212:web:881a967fc8967b48caea31",
  measurementId: "G-6T2559M5ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { db, auth };