import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBwfENs30TQCqNtbIeFkjNSQ0nYud0iS8I",
  authDomain: "travelmate-c4239.firebaseapp.com",
  projectId: "travelmate-c4239",
  storageBucket: "travelmate-c4239.firebasestorage.app",
  messagingSenderId: "615442225098",
  appId: "1:615442225098:web:fbb6eb88dccd93b28fa133",
  measurementId: "G-E6CVVNKPTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }