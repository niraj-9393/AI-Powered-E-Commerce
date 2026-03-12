import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "login-89886.firebaseapp.com",
  projectId: "login-89886",
  storageBucket: "login-89886.firebasestorage.app",
  messagingSenderId: "318741279061",
  appId: "1:318741279061:web:16b0b4ddf825115c0e3fdc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };