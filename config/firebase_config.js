import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjt7poQhUWr9aS4TqZosTSVnUrldLFhMw",
  authDomain: "adventour-app-8f086.firebaseapp.com",
  projectId: "adventour-app-8f086",
  storageBucket: "adventour-app-8f086.firebasestorage.app",
  messagingSenderId: "681194859420",
  appId: "1:681194859420:web:c70648f9ac1d5233d83659",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
