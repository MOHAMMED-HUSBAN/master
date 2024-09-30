import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB8bk_JGbxCsJr5MBwYaESMSajDXK37Efg",
    authDomain: "masterauth-2d09c.firebaseapp.com",
    projectId: "masterauth-2d09c",
    storageBucket: "masterauth-2d09c.appspot.com",
    messagingSenderId: "579272803047",
    appId: "1:579272803047:web:d2dfc7455872c3337cd842",
    measurementId: "G-PBS6QCTKVH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
