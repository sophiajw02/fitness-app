// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpmtMVf5iUdpzY0Ildo2NSbmho3kEDLLc",
  authDomain: "fitness-app-b30d2.firebaseapp.com",
  projectId: "fitness-app-b30d2",
  storageBucket: "fitness-app-b30d2.appspot.com",
  messagingSenderId: "330159312117",
  appId: "1:330159312117:web:a607ac9ff9d9560da849bc",
  measurementId: "G-SZDX956HV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);