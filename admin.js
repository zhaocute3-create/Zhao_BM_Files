import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp({
 apiKey:"AIzaSy...",
 projectId:"zhaobmfiles"
});

const db=getFirestore(app);

// LOAD DEPOSITS + STOCKS
async function load(){
 const dep=await getDocs(collection(db,"deposits"));
 const stocks=await getDocs(collection(db,"stocks"));

 let html="<h3>Deposits</h3>";

 dep.forEach(d=>{
  const x=d.data();
  html+=`
  <div>
    <p>₱${x.amount}</p>
    <img src="${x.receipt}" width="100"><br>
    <button onclick="approve('${d.id}','${x.userId}',${x.amount})">Approve</button>
    <button onclick="del('${d.id}')">Delete</button>
  </div>`;
 });

 html+="<h3>Add Stock</h3>";
 html+=`
 <input id="game" placeholder="Game">
 <input id="acc" placeholder="Account">
 <button onclick="addStock()">Add</button>
 `;

 document.body.innerHTML=html;
}

window.approve = async(id,uid,amt)=>{
 const userRef=doc(db,"users",uid);
 const snap=await getDocs(collection(db,"users"));

 snap.forEach(async d=>{
  if(d.id===uid){
    await updateDoc(userRef,{
      balance:d.data().balance + amt
    });
  }
 });

 await deleteDoc(doc(db,"deposits",id));
 alert("Approved!");
 load();
};

window.del = async(id)=>{
 await deleteDoc(doc(db,"deposits",id));
 load();
};

window.addStock = async()=>{
 await addDoc(collection(db,"stocks"),{
  game:game.value,
  account:acc.value,
  used:false
 });
 alert("Stock added");
 load();
};

load();
