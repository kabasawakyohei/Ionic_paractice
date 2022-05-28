import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { FIREBASE_CONFIG } from "./firebaseConfig";

initializeApp(FIREBASE_CONFIG);

const auth = getAuth();
export default auth;

export const authenticateGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export const isAuth = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth,(user) => {
      resolve(user || null);
    });
  });
};