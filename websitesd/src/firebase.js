import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCETTolVq50iN2Ml2hAtpvOp4qHWjzbepo",
  authDomain: "fleet-sync-34563.firebaseapp.com",
  databaseURL: "https://fleet-sync-34563-default-rtdb.firebaseio.com",
  projectId: "fleet-sync-34563",
  storageBucket: "fleet-sync-34563.firebasestorage.app",
  messagingSenderId: "164513145998",
  appId: "1:164513145998:web:f0e605ec74e21edcf395df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
