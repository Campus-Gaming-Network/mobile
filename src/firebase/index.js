import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { FIREBASE_CONFIG } from "../constants/firebase";

let auth;

initializeApp(FIREBASE_CONFIG);

auth = getAuth();

export { auth };
