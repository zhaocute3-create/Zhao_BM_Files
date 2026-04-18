import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp({
  apiKey:"AIzaSyAyxbJtIGOfiU5_h8BRKsXyK4RC_wIET3s",
  authDomain:"zhaobmfiles.firebaseapp.com",
  projectId:"zhaobmfiles"
});

const auth = getAuth(app);
const db = getFirestore(app);

function msg(t, ok=true){
  const m=document.getElementById("msg");
  m.innerText=t;
  m.style.color = ok ? "#00ff88" : "#ff4d4d";
}

window.register = async ()=>{
  try{
    const res = await createUserWithEmailAndPassword(auth,email.value,pass.value);
    const user = res.user;

    const counter = doc(db,"meta","counter");
    const snap = await getDoc(counter);

    let uid = 1;
    if(snap.exists()) uid = snap.data().count + 1;

    await setDoc(counter,{count:uid});

    await setDoc(doc(db,"users",user.uid),{
      email:user.email,
      uidNum:uid,
      balance:0
    });

    msg("✅ Registered");
  }catch(e){ msg(e.message,false); }
};

window.login = async ()=>{
  try{
    msg("⏳ Logging in...");
    await signInWithEmailAndPassword(auth,email.value,pass.value);
    msg("✅ Success");
    setTimeout(()=>location="dashboard.html",1000);
  }catch(e){ msg(e.message,false); }
};
