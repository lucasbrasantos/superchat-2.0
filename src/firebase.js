import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5bXMNqSc4uUel9AuEHE2RW2z5OPiuKOE",
    authDomain: "superchat-2-9c507.firebaseapp.com",
    projectId: "superchat-2-9c507",
    storageBucket: "superchat-2-9c507.appspot.com",
    messagingSenderId: "628772168837",
    appId: "1:628772168837:web:50f6d822f4c3eed00935ec"
  };
  
  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();