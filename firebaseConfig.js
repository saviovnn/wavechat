// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAQcsrxfpS5YMANC-NwNnLRFP4AWG7IxaQ",
  authDomain: "fir-chat-6065f.firebaseapp.com",
  projectId: "fir-chat-6065f",
  storageBucket: "fir-chat-6065f.appspot.com",
  messagingSenderId: "163696938193",
  appId: "1:163696938193:web:6ba0966414a6a00dc009f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
