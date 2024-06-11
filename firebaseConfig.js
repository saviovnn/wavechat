// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAyrxgtYmkdUD1Lc_T4AmyJHE8eq-kttnQ",
  authDomain: "wavechat-5934e.firebaseapp.com",
  projectId: "wavechat-5934e",
  storageBucket: "wavechat-5934e.appspot.com",
  messagingSenderId: "637119495910",
  appId: "1:637119495910:web:59a647dbd1fa694d2b4527",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
