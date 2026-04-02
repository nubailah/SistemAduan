import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = { /* paste config sini */ };
apiKey: "AIzaSyCWK-Z2WtsiLXkDDwjDat4yG29Ziw97-no",
  authDomain: "sistem-aduan-31d8c.firebaseapp.com",
  projectId: "sistem-aduan-31d8c",
  storageBucket: "sistem-aduan-31d8c.firebasestorage.app",
  messagingSenderId: "611315545250",
  appId: "1:611315545250:web:5720794633d1339614d3fb",
  measurementId: "G-0SPGBTZJV5"

// ====== LOGIN ======
const loginForm = document.getElementById("loginForm");
if(loginForm){
loginForm.addEventListener("submit", async e=>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try{
    const userCred = await signInWithEmailAndPassword(auth,email,password);
    document.getElementById("loginForm").style.display="none";
    document.getElementById("aduanSection").style.display="block";
    console.log("Login berjaya",userCred.user.email);
  }catch(err){alert(err.message);}
});
}

// ====== SUBMIT ADUAN ======
const aduanForm = document.getElementById("aduanForm");
if(aduanForm){
  aduanForm.addEventListener("submit", async e=>{
    e.preventDefault();
    await addDoc(collection(db,"aduan"),{
      nama: document.getElementById("nama").value,
      id: document.getElementById("id").value,
      kategori: document.getElementById("kategori").value,
      aduan: document.getElementById("aduan").value,
      status: "BARU",
      response: "",
      tarikh: new Date()
    });
    document.getElementById("msg").innerText="Aduan berjaya dihantar!";
    aduanForm.reset();
  });
}

// ====== LOAD ADMIN DASHBOARD ======
const table = document.getElementById("dataTable");
if(table){
  loadData();
}
async function loadData(){
  const querySnapshot = await getDocs(collection(db,"aduan"));
  table.innerHTML="";
  querySnapshot.forEach(docSnap=>{
    const d=docSnap.data();
    table.innerHTML+=`
<tr>
<td>${d.nama}</td>
<td>${d.id}</td>
<td>${d.kategori}</td>
<td>${d.aduan}</td>
<td>
<select id="status-${docSnap.id}">
<option ${d.status==="BARU"?"selected":""}>BARU</option>
<option ${d.status==="DALAM PROSES"?"selected":""}>DALAM PROSES</option>
<option ${d.status==="SELESAI"?"selected":""}>SELESAI</option>
</select>
</td>
<td><input type="text" id="resp-${docSnap.id}" value="${d.response}" placeholder="Tulis response"></td>
<td><button onclick="updateAduan('${docSnap.id}')">Update</button></td>
</tr>
    `;
  });
}

// ====== UPDATE STATUS + RESPONSE ======
window.updateAduan = async function(id){
  const ref = doc(db,"aduan",id);
  const status = document.getElementById(`status-${id}`).value;
  const response = document.getElementById(`resp-${id}`).value;
  await updateDoc(ref,{status: status,response: response});
  loadData();
}




