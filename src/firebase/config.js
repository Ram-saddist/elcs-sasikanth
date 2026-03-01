import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiyvwgyoNb67rbFbfhR4O9FeS9YNkyVLo",
  authDomain: "electronic-ecommerece.firebaseapp.com",
  projectId: "electronic-ecommerece",
  storageBucket: "electronic-ecommerece.firebasestorage.app",
  messagingSenderId: "631263376373",
  appId: "1:631263376373:web:ab01f7ff719ebf654526bc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
