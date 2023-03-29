
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyACgIOBNKtsbR0sQv4ShKbrvvC23nsOaSY",
  authDomain: "conversation-f404b.firebaseapp.com",
  projectId: "conversation-f404b",
  storageBucket: "conversation-f404b.appspot.com",
  messagingSenderId: "1086843355365",
  appId: "1:1086843355365:web:7377b697db7263bd25540c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore();
export const storage=getStorage();
