import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

function msg(t, ok=true){
  const m=document.getElementById("msg");
  if(!m)return;
  m.innerText=t;
  m.style.color = ok ? "#00ff88" : "#ff4d4d";
}

// REGISTER
window.register = async ()=>{
  try{
    const res = await createUserWithEmailAndPassword(auth,email.value,pass.value);
    const user = res.user;

    const counterRef = doc(db,"meta","counter");
    const snap = await getDoc(counterRef);

    let uidNum = 1;
    if(snap.exists()){
      uidNum = snap.data().count + 1;
    }

    await setDoc(counterRef,{count:uidNum});

    await setDoc(doc(db,"users",user.uid),{
      email:user.email,
      uidNum:uidNum,
      balance:0
    });

    msg("✅ Register Success!");
  }catch(e){ msg("❌ "+e.message,false); }
};

// LOGIN
window.login = async ()=>{
  try{
    msg("⏳ Logging in...");
    await signInWithEmailAndPassword(auth,email.value,pass.value);

    msg("✅ Login Success!");
    setTimeout(()=>location="dashboard.html",1000);

  }catch(e){ msg("❌ "+e.message,false); }
};
