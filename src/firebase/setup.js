import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBgTn0xzZMaBYevb-l4p63HbXIlr4iYPqo",
  authDomain: "fir-newsweb.firebaseapp.com",
  databaseURL: "https://fir-newsweb-default-rtdb.firebaseio.com",
  projectId: "fir-newsweb",
  storageBucket: "fir-newsweb.appspot.com",
  messagingSenderId: "219200501364",
  appId: "1:219200501364:web:0f79566d917d24d0c8c321",
  measurementId: "G-4Z6T2NW2MX"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const googleProvider= new GoogleAuthProvider(app)