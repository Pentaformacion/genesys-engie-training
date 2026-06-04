// ======================================
// FIREBASE CONFIG
// ======================================

const firebaseConfig = {
  apiKey: "AIzaSyAsy_6xBBZ77vqeskM0BT64mnbQ-eHXkss",
  authDomain: "genesyscloud-db5a0.firebaseapp.com",
  projectId: "genesyscloud-db5a0",
  storageBucket: "genesyscloud-db5a0.firebasestorage.app",
  messagingSenderId: "451639211739",
  appId: "1:451639211739:web:7c37433d72ff7d34d5befe",
  measurementId: "G-Q84BFDS58E"
};

// ======================================
// INICIALIZAR FIREBASE
// ======================================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// ======================================
// REFERENCIAS DE COLECCIONES
// ======================================

const advisorsRef = db.collection("advisors");

const interactionsRef = db.collection("interactions");

const messagesRef = db.collection("messages");

const evaluationsRef = db.collection("evaluations");

const reportsRef = db.collection("reports");

// ======================================
// VALIDAR CONEXIÓN
// ======================================

db.collection("system")
.doc("connection")
.set({
  status: "online",
  updated: new Date()
})
.then(() => {

  console.log(
    "✅ Firebase conectado correctamente"
  );

})
.catch((error) => {

  console.error(
    "❌ Error Firebase:",
    error

function login(role){

const name =
document.getElementById(
"userName"
).value.trim();

if(name===""){

alert("Ingresa tu nombre");

return;

}

currentUser = name;

currentRole = role;

if(role==="advisor"){

document.getElementById(
"loginScreen"
).style.display = "none";

document.getElementById(
"advisorView"
).style.display = "block";

document.getElementById(
"advisorName"
).innerText = name;

}

if(role==="trainer"){

document.getElementById(
"loginScreen"
).style.display = "none";

document.getElementById(
"trainerView"
).style.display = "block";

}

console.log(
"Login correcto:",
role
);

}
