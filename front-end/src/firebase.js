// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wsm-app-kita.firebaseapp.com",
  projectId: "wsm-app-kita",
  storageBucket: "wsm-app-kita.appspot.com",
  messagingSenderId: "910023696108",
  appId: "1:910023696108:web:38684ac91265fe78e10fc9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

