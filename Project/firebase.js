// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js"; // Optional: For login/register
// import { getFirestore } from "firebase/firestore"; // Optional: For product data, orders

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZd8m4zwvSJ-g1bAmJPqMJ6nlwxzqMHzA",
  authDomain: "techtrend-ecommerce.firebaseapp.com",
  projectId: "techtrend-ecommerce",
  storageBucket: "techtrend-ecommerce.firebasestorage.app",
  messagingSenderId: "173725345288",
  appId: "1:173725345288:web:31f1f3c5296a51f22f53bd",
  measurementId: "G-6KNT6Y44NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore(app);