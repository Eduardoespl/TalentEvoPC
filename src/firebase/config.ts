// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5XI2r6TBFYPxf7p_OpvytkL6ns8bKg_s",
  authDomain: "talentevopc.firebaseapp.com",
  projectId: "talentevopc",
  storageBucket: "talentevopc.appspot.com",
  messagingSenderId: "424503598820",
  appId: "1:424503598820:web:b94e2241695be0b66796f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth, app};
