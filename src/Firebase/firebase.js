import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTHNIz63mCuK51GEgzTLCOepIOgV7IO70",
  authDomain: "instagram-9cf2e.firebaseapp.com",
  projectId: "instagram-9cf2e",
  storageBucket: "instagram-9cf2e.appspot.com",
  messagingSenderId: "38120478323",
  appId: "1:38120478323:web:8f5a410f8afcadee9d7c06",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
