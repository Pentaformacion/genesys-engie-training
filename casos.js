// ======================================
// CASOS ENGIE TRAINING
// ======================================

const responsesLibrary = [

{
title:"Cierre de interacción",
text:"Gracias por contactar a ENGIE. ¿Hay algo más en lo que pueda ayudarte?"
},

{
title:"Pago BBVA",
text:"Puedes realizar el pago mediante BBVA utilizando la referencia bancaria correspondiente."
},

{
title:"Envío de factura",
text:"Con gusto realizamos el envío de tu factura al correo registrado."
},

{
title:"Emergencia",
text:"Por seguridad evita manipular cualquier instalación. Hemos generado el reporte correspondiente."
},

{
title:"Cambio de titular",
text:"Para el cambio de titular requerimos INE vigente y comprobante de domicilio."
}

];

// ======================================
// CASOS
// ======================================

const trainingCases = {

factura: {

customer: {

name:"Jessica Merlo",

account:"5100142626",

address:"Puebla Centro",

segment:"Residencial"

},

conversation:[

"Buenas tardes",

"Mi factura llegó mucho más alta este mes.",

"Generalmente pago alrededor de $300.",

"Ahora aparecen $740.",

"¿Podrías ayudarme a revisar?",

"Entiendo.",

"Muchas gracias por la información."

]

},

titular: {

customer: {

name:"Ana López",

account:"1122334455",

address:"Colonia Reforma",

segment:"Residencial"

},

conversation:[

"Buenas tardes",

"Necesito realizar un cambio de titular.",

"Acabo de rentar la vivienda.",

"Tengo INE vigente.",

"También cuento con contrato de arrendamiento.",

"¿Dónde puedo enviar los documentos?",

"Perfecto gracias."

]

},

gas: {

customer: {

name:"Roberto Gómez",

account:"9988776655",

address:"Centro Histórico",

segment:"Residencial"

},

conversation:[

"Necesito ayuda urgente.",

"Percibo un fuerte olor a gas.",

"Proviene de la zona del medidor.",

"No observamos fuego.",

"El olor sigue aumentando.",

"¿Cuánto tarda el técnico?",

"Gracias."

]

},

suministro: {

customer: {

name:"Laura Hernández",

account:"7845123698",

address:"Colonia Las Flores",

segment:"Residencial"

},

conversation:[

"Buenas tardes.",

"No tengo suministro de gas.",

"Desde ayer por la noche.",

"Los vecinos sí cuentan con servicio.",

"¿Podrían revisarlo?",

"Quedo pendiente.",

"Gracias."

]

},

facturaCorreo: {

customer: {

name:"Miguel Torres",

account:"6587412365",

address:"Puebla Norte",

segment:"Residencial"

},

conversation:[

"Buenas tardes.",

"No recibí mi factura.",

"Normalmente llega a mi correo.",

"Este mes no la encuentro.",

"¿Me la podrían reenviar?",

"Muchas gracias."

]

}

};

// ======================================
// VARIABLES
// ======================================

let currentCase = null;

let currentStep = 0;

// ======================================
// CARGAR RESPUESTAS
// ======================================

function loadResponses(){

const container =
document.getElementById(
"responsesContainer"
);

if(!container) return;

container.innerHTML = "";

responsesLibrary.forEach(item=>{

container.innerHTML +=

`
<div
class="responseItem"
onclick="insertResponse('${item.text}')">

<div class="responseTitle">
${item.title}
</div>

<div>
${item.text}
</div>

</div>
`;

});

}

// ======================================
// INSERTAR RESPUESTA
// ======================================

function insertResponse(text){

document.getElementById(
"messageInput"
).value = text;

}

// ======================================
// LANZAR CASO
// ======================================

function launchCase(caseId){

currentCase =
trainingCases[caseId];

currentStep = 0;

if(!currentCase){
return;
}

// DATOS CLIENTE

document.getElementById(
"customerName"
).innerText =
currentCase.customer.name;

document.getElementById(
"customerAccount"
).innerText =
currentCase.customer.account;

document.getElementById(
"customerAddress"
).innerText =
currentCase.customer.address;

document.getElementById(
"customerSegment"
).innerText =
currentCase.customer.segment;

// LIMPIAR CHAT

const chat =
document.getElementById(
"chatContainer"
);

chat.innerHTML = "";

// ARRANCAR TIMER

startInteractionTimer();

// MENSAJE INICIAL

messagesRef.add({

advisor:currentUser,

interaction:Date.now(),

sender:"customer",

text:
currentCase.conversation[0],

timestamp:
firebase.firestore.FieldValue.serverTimestamp()

});

}

// ======================================
// CLIENTE AUTOMÁTICO
// ======================================

function simulateCustomerResponse(){

if(
!currentCase
){
return;
}

currentStep++;

if(
currentStep >=
currentCase.conversation.length
){
return;
}

setTimeout(()=>{

messagesRef.add({

advisor:currentUser,

interaction:"training",

sender:"customer",

text:
currentCase.conversation[
currentStep
],

timestamp:
firebase.firestore.FieldValue.serverTimestamp()

});

},2000);

}

// ======================================
// EVALUADOR
// ======================================

let score = {

greeting:false,

validation:false,

solution:false,

closing:false

};

function evaluateResponse(text){

let msg =
text.toLowerCase();

if(
msg.includes("buenas") ||
msg.includes("hola")
){

score.greeting = true;

}

if(
msg.includes("cuenta") ||
msg.includes("titular")
){

score.validation = true;

}

if(
msg.includes("apoyo") ||
msg.includes("revisar") ||
msg.includes("solución")
){

score.solution = true;

}

if(
msg.includes("gracias") ||
msg.includes("excelente día")
){

score.closing = true;

}

saveScore();

}

function saveScore(){

let total = 0;

if(score.greeting) total +=25;
if(score.validation) total +=25;
if(score.solution) total +=25;
if(score.closing) total +=25;

evaluationsRef.doc(currentUser).set({

advisor:currentUser,

score:total,

updated:new Date()

});

}