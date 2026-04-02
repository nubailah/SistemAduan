// IMPORT FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIG
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWK-Z2WtsiLXkDDwjDat4yG29Ziw97-no",
  authDomain: "sistem-aduan-31d8c.firebaseapp.com",
  projectId: "sistem-aduan-31d8c",
  storageBucket: "sistem-aduan-31d8c.firebasestorage.app",
  messagingSenderId: "611315545250",
  appId: "1:611315545250:web:5720794633d1339614d3fb",
  measurementId: "G-0SPGBTZJV5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// SUBMIT ADUAN
// ==========================
const form = document.getElementById("aduanForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "aduan"), {
      nama: document.getElementById("nama").value,
      id: document.getElementById("id").value,
      kategori: document.getElementById("kategori").value,
      aduan: document.getElementById("aduan").value,
      status: "BARU",
      tarikh: new Date()
    });

    document.getElementById("msg").innerHTML = "Aduan berjaya dihantar!";
    form.reset();
  });
}

// ==========================
// LOAD DATA ADMIN
// ==========================
const table = document.getElementById("dataTable");

if (table) {
  loadData();
}

async function loadData() {
  const querySnapshot = await getDocs(collection(db, "aduan"));

  table.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const d = docSnap.data();

    table.innerHTML += `
      <tr>
        <td>${d.nama}</td>
        <td>${d.id}</td>
        <td>${d.kategori}</td>
        <td>${d.aduan}</td>
        <td>${d.status}</td>
        <td>
          <button onclick="updateStatus('${docSnap.id}')">Selesai</button>
        </td>
      </tr>
    `;
  });
}

// ==========================
// UPDATE STATUS
// ==========================
window.updateStatus = async function(id) {
  const ref = doc(db, "aduan", id);

  await updateDoc(ref, {
    status: "SELESAI"
  });

  loadData();
};
