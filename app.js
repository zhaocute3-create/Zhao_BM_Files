import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyxbJtIGOfiU5_h8BRKsXyK4RC_wIET3s",
  authDomain: "zhaobmfiles.firebaseapp.com",
  projectId: "zhaobmfiles",
  storageBucket: "zhaobmfiles.firebasestorage.app",
  messagingSenderId: "898227903245",
  appId: "1:898227903245:web:c21f3fa479b13c7971ae44"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let msg = document.getElementById("msg");

// ✅ REGISTER FIXED
try {
  const res = await createUserWithEmailAndPassword(auth, email.value, pass.value);

  showMsg("✅ Register Success!", "success");

} catch (e) {
  showMsg("❌ " + e.message, "error");
}

    // UID system
    const uidRef = doc(db, "meta", "counter");
    const snap = await getDoc(uidRef);

    let newUID = 1;

    if (snap.exists()) {
      newUID = snap.data().count + 1;
    }

    await setDoc(uidRef, { count: newUID });

    // SAVE USER
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uidNum: newUID,
      balance: 0
    });

    showMsg("✅ Register Success!", "success");
  } catch (e) {
    showMsg("❌ " + e.message, "error");
  }
};

// ✅ LOGIN FIXED
window.login = async () => {
  try {
  await signInWithEmailAndPassword(auth, email.value, pass.value);

  showMsg("✅ Login Success!", "success");

  setTimeout(() => {
    location = "dashboard.html";
  }, 1000);

} catch (e) {
  showMsg("❌ " + e.message, "error");
  }
};
