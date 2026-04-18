import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

window.register = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);

    const user = userCred.user;

    // ✅ SAVE SA FIRESTORE
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      balance: 0,
      uidNum: Date.now() // pwede mo palitan later (1,2,3 system)
    });

    alert("✅ Register success");
  } catch (e) {
    alert("❌ " + e.message);
  }
};
