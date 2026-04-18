// 🔥 Firebase config (PALITAN MO)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyxbJtIGOfiU5_h8BRKsXyK4RC_wIET3s",
  authDomain: "zhaobmfiles.firebaseapp.com",
  projectId: "zhaobmfiles",
  storageBucket: "zhaobmfiles.firebasestorage.app",
  messagingSenderId: "898227903245",
  appId: "1:898227903245:web:c21f3fa479b13c7971ae44"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
