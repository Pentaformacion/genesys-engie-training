// =====================================
// FIREBASE CONFIG
// GENESYS CLOUD ENGIE TRAINING
// =====================================

const firebaseConfig = {

apiKey: "TU_API_KEY",

authDomain: "TU_PROYECTO.firebaseapp.com",

projectId: "TU_PROYECTO",

storageBucket: "TU_PROYECTO.appspot.com",

messagingSenderId: "XXXXXXXX",

appId: "XXXXXXXX"

};

// INICIALIZAR

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// =====================================
// COLECCIONES
// =====================================

const advisorsRef =
db.collection("advisors");

const interactionsRef =
db.collection("interactions");

const messagesRef =
db.collection("messages");

const evaluationsRef =
db.collection("evaluations");

const reportsRef =
db.collection("reports");

// =====================================
// VARIABLES GLOBALES
// =====================================

let currentUser = "";

let currentRole = "";

let currentInteraction = "";

let selectedAdvisor = "";

let activeCase = null;

let timerSeconds = 0;

let timerInterval = null;

// =====================================
// LOGIN
// =====================================

function login(role){

const name =
document.getElementById(
"userName"
).value.trim();

if(name===""){

alert(
"Ingresa un nombre"
);

return;

}

currentUser = name;

currentRole = role;

// REGISTRO DE USUARIO

advisorsRef.doc(name).set({

name:name,

role:role,

status:"Disponible",

lastLogin:new Date()

});

// VISTA ASESOR

if(role==="advisor"){

document.getElementById(
"loginScreen"
).style.display="none";

document.getElementById(
"advisorView"
).style.display="block";

document.getElementById(
"advisorName"
).innerText=name;

loadResponses();

listenMessages();

}

// VISTA FORMADOR

if(role==="trainer"){

document.getElementById(
"loginScreen"
).style.display="none";

document.getElementById(
"trainerView"
).style.display="block";

loadAdvisors();

listenTrainer();

}

}

// =====================================
// TIMER
// =====================================

function startInteractionTimer(){

clearInterval(timerInterval);

timerSeconds = 0;

timerInterval = setInterval(()=>{

timerSeconds++;

let min =
Math.floor(timerSeconds/60);

let sec =
timerSeconds%60;

document.getElementById(
"interactionTimer"
).innerText =

String(min).padStart(2,"0")
+
":"
+
String(sec).padStart(2,"0");

},1000);

}

function stopInteractionTimer(){

clearInterval(
timerInterval
);

}

// =====================================
// MENSAJES
// =====================================

function sendMessage(){

const input =
document.getElementById(
"messageInput"
);

let text =
input.value.trim();

if(text==="") return;

messagesRef.add({

advisor:currentUser,

interaction:currentInteraction,

sender:"advisor",

text:text,

timestamp:
firebase.firestore.FieldValue.serverTimestamp()

});

input.value="";

evaluateResponse(text);

simulateCustomerResponse();

}

// =====================================
// ESCUCHAR MENSAJES
// =====================================

function listenMessages(){

messagesRef
.orderBy("timestamp","asc")
.onSnapshot(snapshot=>{

const chat =
document.getElementById(
"chatContainer"
);

chat.innerHTML="";

snapshot.forEach(doc=>{

const data =
doc.data();

if(
data.advisor !== currentUser
) return;

const div =
document.createElement("div");

div.className =
"message " +
(data.sender==="advisor"
? "agent"
: "customer");

div.innerText =
data.text;

chat.appendChild(div);

});

chat.scrollTop =
chat.scrollHeight;

});

}

// =====================================
// FORMADOR
// =====================================

function loadAdvisors(){

advisorsRef.onSnapshot(snapshot=>{

const container =
document.getElementById(
"advisorContainer"
);

container.innerHTML="";

snapshot.forEach(doc=>{

let advisor =
doc.data();

container.innerHTML +=

`
<div class="advisorCard">

<b>${advisor.name}</b>

<br>

Estado:
${advisor.status}

</div>
`;

});

});

}

// =====================================
// MONITOREO
// =====================================

function listenTrainer(){

messagesRef
.orderBy("timestamp","asc")
.onSnapshot(snapshot=>{

const monitor =
document.getElementById(
"monitorChat"
);

monitor.innerHTML="";

snapshot.forEach(doc=>{

let data =
doc.data();

monitor.innerHTML +=

`
<div style="
padding:8px;
margin-bottom:6px;
border-bottom:1px solid #eee;
">

<b>${data.advisor}</b>

<br>

${data.text}

</div>
`;

});

});

}