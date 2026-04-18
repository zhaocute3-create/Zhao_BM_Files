import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "zhaobmfiles.firebaseapp.com",
  projectId: "zhaobmfiles",
  storageBucket: "zhaobmfiles.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

let currentUser;

onAuthStateChanged(auth, async user => {
  if(!user) return;

  currentUser = user;

  const refUser = doc(db,"users",user.uid);
  let snap = await getDoc(refUser);

  if(!snap.exists()){
    const metaRef = doc(db,"meta","counter");
    let meta = await getDoc(metaRef);

    let uidNum = 1;
    if(meta.exists()){
      uidNum = meta.data().count + 1;
    }

    await setDoc(metaRef,{count:uidNum});
    await setDoc(refUser,{
      email:user.email,
      uidNum:uidNum,
      balance:0
    });
  }

  loadData();
});

async function loadData(){
  const refUser = doc(db,"users",currentUser.uid);
  const snap = await getDoc(refUser);

  document.getElementById("uid").innerText = snap.data().uidNum;
  document.getElementById("bal").innerText = snap.data().balance;
}

window.register = async ()=>{
  try{
    await createUserWithEmailAndPassword(auth,email.value,pass.value);
    msg.innerText="Registered!";
  }catch(e){ msg.innerText=e.message; }
}

window.login = async ()=>{
  try{
    await signInWithEmailAndPassword(auth,email.value,pass.value);
    location="dashboard.html";
  }catch(e){ msg.innerText=e.message; }
}

window.showDeposit = ()=>{
  depositBox.style.display="block";
}

window.submitDeposit = async ()=>{
  msg.innerText="Submitting...";

  const file = document.getElementById("file").files[0];
  const storageRef = ref(storage,"receipts/"+Date.now());
  await uploadBytes(storageRef,file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db,"deposits"),{
    uid:currentUser.uid,
    amount:amount.value,
    ref:ref.value,
    img:url,
    status:"pending"
  });

  msg.innerText="Submitted!";
}

window.generate = async ()=>{
  const game = document.getElementById("game").value;

  const q = await getDocs(collection(db,"accounts"));
  q.forEach(async d=>{
    if(d.data().game==game){
      alert(d.data().user+" / "+d.data().pass);
    }
  });
                          }
