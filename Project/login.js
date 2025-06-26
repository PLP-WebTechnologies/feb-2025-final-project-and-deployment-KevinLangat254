// login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';

const loginForm = document.getElementById('Login');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      alert("Login successful!");

      // ✅ Redirect after successful login
      window.location.href = 'Home.html'; // Replace with your actual homepage
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
});
