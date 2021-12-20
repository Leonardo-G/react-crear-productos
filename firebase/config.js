import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyANxVpuQLg50sAIuVxbXw_uStltskBdajo",
  authDomain: "product-hunt-68845.firebaseapp.com",
  projectId: "product-hunt-68845",
  storageBucket: "product-hunt-68845.appspot.com",
  messagingSenderId: "234494160548",
  appId: "1:234494160548:web:b99f69298e48b714298031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()