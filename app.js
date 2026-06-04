// ======================================
// APP.JS
// GENESYS CLOUD ENGIE TRAINING
// ======================================

// ESTADO ACTUAL

let advisorStatus = "Disponible";

let acwTimer = null;

let acwSeconds = 60;

let interactionHistory = [];

// ======================================
// CAMBIO DE ESTADO
// ======================================

const presenceSelect =
document.getElementById(
"presenceStatus"
);

if(presenceSelect){

presenceSelect.addEventListener(
"change",
function(){

advisorStatus =
this.value;

updateAdvisorStatus();

});

}

function updateAdvisorStatus(){

if(!currentUser){
return;
}

advisorsRef.doc(
currentUser
).update({

status:advisorStatus

});

}

// ======================================
// HISTORIAL
// ======================================

function addHistory(item){

interactionHistory.push({

date:new Date(),

description:item

});

}

function getHistory(){

return interactionHistory;

}

// ======================================
// ACW
// ======================================

function startACW(){

let panel =
document.getElementById(
"chatContainer"
);

if(!panel){
return;
}

panel.innerHTML =

`
<div
style="
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100%;
">

<h2>
Trabajo después de llamada
</h2>

<div
id="acwTimer"
style="
font-size:50px;
margin-top:20px;
font-weight:bold;
color:#0066ff;
">
01:00
</div>

</div>
`;

acwSeconds = 60;

clearInterval(acwTimer);

acwTimer = setInterval(()=>{

acwSeconds--;

let min =
Math.floor(acwSeconds/60);

let sec =
acwSeconds % 60;

document.getElementById(
"acwTimer"
).innerText =

String(min).padStart(2,"0")
+
":"
+
String(sec).padStart(2,"0");

if(acwSeconds<=0){

clearInterval(
acwTimer
);

returnToQueue();

}

},1000);

}

function returnToQueue(){

document.getElementById(
"chatContainer"
).innerHTML =

`
<div class="queueScreen">

<div class="queueIcon">

💬

</div>

<div class="queueText">

Está esperando en la cola para manejar las conversaciones entrantes asignadas

</div>

</div>
`;

document.getElementById(
"customerName"
).innerText =
"Sin interacción";

document.getElementById(
"customerAccount"
).innerText =
"-";

document.getElementById(
"customerAddress"
).innerText =
"-";

document.getElementById(
"customerSegment"
).innerText =
"-";

stopInteractionTimer();

}

// ======================================
// FINALIZAR INTERACCION
// ======================================

function finishInteraction(){

addHistory(
"Interacción finalizada"
);

startACW();

}

function closeCase(){

finishInteraction();

}

// ======================================
// DASHBOARD FORMADOR
// ======================================

function loadMetrics(){

evaluationsRef.onSnapshot(
snapshot=>{

const container =
document.getElementById(
"metricsContainer"
);

if(!container){
return;
}

container.innerHTML = "";

snapshot.forEach(doc=>{

let data =
doc.data();

container.innerHTML +=

`
<div
style="
padding:10px;
margin-bottom:10px;
background:white;
border-radius:8px;
border:1px solid #ddd;
">

<b>

${data.advisor}

</b>

<br>

Resultado:

${data.score}%

</div>
`;

});

});

}

// ======================================
// EXPORTAR CSV
// ======================================

function exportCSV(){

evaluationsRef.get()
.then(snapshot=>{

let csv =

"ASESOR,CALIFICACION\n";

snapshot.forEach(doc=>{

let data =
doc.data();

csv +=

`${data.advisor},${data.score}\n`;

});

const blob =
new Blob(

[csv],

{
type:"text/csv"
}

);

const link =
document.createElement(
"a"
);

link.href =
URL.createObjectURL(
blob
);

link.download =
"Reporte_ENGIE.csv";

link.click();

});

}

// ======================================
// TRANSFERENCIAS
// ======================================

function transferCase(area){

messagesRef.add({

advisor:currentUser,

sender:"system",

text:

"Transferido a: " +
area,

timestamp:
firebase.firestore.FieldValue.serverTimestamp()

});

}

function transferBilling(){

transferCase(
"Facturación"
);

}

function transferSupervisor(){

transferCase(
"Supervisor"
);

}

function transferEmergencies(){

transferCase(
"Emergencias"
);

}

// ======================================
// INICIO
// ======================================

window.onload = ()=>{

console.log(
"Genesys ENGIE listo"
);

if(
typeof loadResponses
=== "function"
){

loadResponses();

}

if(
typeof loadMetrics
=== "function"
){

loadMetrics();

}

};