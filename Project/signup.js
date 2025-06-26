// signup.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';

const signupForm = document.getElementById('Signup'); // This is your <form> element

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  const password = document.getElementById("pass").value;
  if (!password) {
    alert("Please enter your password.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signup successful', userCredential.user);
      alert('Account created!');
      signupForm.reset();
       // 🔁 Redirect after 1 second (or immediately)
      setTimeout(() => {
        window.location.href = 'Home.html'; // Change to your desired page
      }, 1000);
    })
    .catch((error) => {
      alert(error.message);
    });
});
