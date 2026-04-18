import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = initializeApp({
  apiKey:"AIza...",
  authDomain:"zhaobmfiles.firebaseapp.com",
  projectId:"zhaobmfiles"
});

const db = getFirestore();

window.addBal = async ()=>{
  const uid = document.getElementById("uid").value;
  const amount = parseInt(document.getElementById("amount").value);

  const q = await getDocs(collection(db,"users"));
  q.forEach(async d=>{
    if(d.data().uidNum == parseInt(uid)){
      await updateDoc(doc(db,"users",d.id),{
        balance: d.data().balance + amount
      });
      alert("Added!");
    }
  });
}

async function load(){
  const q = await getDocs(collection(db,"deposits"));
  let html="";

  q.forEach(d=>{
    const data = d.data();
    html += `
      <div>
        <p>${data.amount}</p>
        <img src="${data.img}" width="100">
      </div>
    `;
  });

  document.getElementById("list").innerHTML = html;
}

load();
