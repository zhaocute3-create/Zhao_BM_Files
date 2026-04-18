import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey:"AIzaSyAyxbJtIGOfiU5_h8BRKsXyK4RC_wIET3s",
  projectId:"zhaobmfiles"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

window.add=async()=>{
  const uid=parseInt(document.getElementById("uid").value);
  const amt=parseInt(document.getElementById("amount").value);

  const q=await getDocs(collection(db,"users"));

  q.forEach(async d=>{
    if(d.data().uidNum===uid){
      await updateDoc(doc(db,"users",d.id),{
        balance:d.data().balance+amt
      });
      alert("Added!");
    }
  });
};

async function load(){
  const q=await getDocs(collection(db,"deposits"));
  let h="";
  q.forEach(d=>{
    const x=d.data();
    h+=`<p>${x.amount}</p><img src="${x.receipt}" width="100">`;
  });
  document.getElementById("list").innerHTML=h;
}
load();
