const firebaseConfig = {
  apiKey: "AIzaSyAsy_6xBBZ77vqeskM0BT64mnbQ-eHXkss",
  authDomain: "genesyscloud-db5a0.firebaseapp.com",
  projectId: "genesyscloud-db5a0",
  storageBucket: "genesyscloud-db5a0.firebasestorage.app",
  messagingSenderId: "451639211739",
  appId: "1:451639211739:web:7c37433d72ff7d34d5befe"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();

console.log("Firebase iniciado correctamente");

// Variables globales
let currentUser = "";
let currentRole = "";

// Credenciales del formador
const TRAINER_USER = "instructor";
const TRAINER_PASSWORD = "ENGIE2026";

// Login
function login(role) {

  const input = document.getElementById("userName");

  if (!input) {
    alert("No existe el campo userName");
    return;
  }

  const name = input.value.trim();

  if (name === "") {
    alert("Ingresa tu nombre");
    return;
  }

  // Login Asesor
  if (role === "advisor") {

    currentUser = name;
    currentRole = role;

    db.collection("advisors")
      .doc(name)
      .set({
        name: name,
        role: "advisor",
        status: "En Cola",
        login: new Date()
      })
      .then(() => {
        console.log("Asesor registrado");
      })
      .catch((error) => {
        console.error("Error Firestore:", error);
      });

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("advisor-view").style.display = "block";

    escucharCasos();

    return;
  }

  // Login Formador
  
const password = prompt("Contraseña de Formador");

if (
    name === TRAINER_USER &&
    password === TRAINER_PASSWORD
) {

    currentUser = name;
    currentRole = role;

    document.getElementById("login-screen").style.display = "none";

    document.getElementById("trainer-view").style.display = "block";

    console.log("Formador conectado");

    cargarAsesores();

} else {

    alert("Credenciales incorrectas");

}

}

function cargarAsesores(){

    const lista =
    document.getElementById("advisor-list");

    if(!lista) return;

    db.collection("advisors")
    .onSnapshot((snapshot)=>{

        lista.innerHTML="";

        snapshot.forEach((doc)=>{

            const data = doc.data();

            lista.innerHTML += `

            <div class="advisor-card">

                <span onclick="seleccionarAsesor('${data.name}')">

                    🟢 ${data.name}

                </span>

                <button onclick="eliminarAsesor('${doc.id}')">

                    ❌

                </button>

            </div>

            `;

        });

    });

}

let advisorSelected = "";

function seleccionarAsesor(name){

    advisorSelected = name;

    console.log(
        "Asesor seleccionado:",
        name
    );

    document.getElementById(
    "monitor-container"
    ).innerHTML = `

    <div style="padding:20px;">

        <h2>${name}</h2>

        <p>
        Asesor seleccionado
        </p>

    </div>

    `;

}

function eliminarAsesor(id){

    const confirmar = confirm(
        "¿Eliminar asesor?"
    );

    if(!confirmar) return;

    db.collection("advisors")
    .doc(id)
    .delete();

}

function limpiarAsesores(){

    const confirmar = confirm(
        "¿Eliminar TODOS los asesores?"
    );

    if(!confirmar) return;

    db.collection("advisors")
    .get()

    .then(function(snapshot){

        snapshot.forEach(function(doc){

            doc.ref.delete();

        });

        alert(
            "Lista limpiada"
        );

    });

}

function escucharCasos(){

    db.collection("cases")

    .where(
        "asesor",
        "==",
        currentUser
    )

    .where(
        "estado",
        "==",
        "nuevo"
    )

    .onSnapshot((snapshot)=>{

        snapshot.forEach((doc)=>{

            const caso =
            doc.data();

            mostrarCaso(
                caso,
                doc.id
            );

        });

    });

}

function mostrarCaso(caso,id){

    const panel =
    document.getElementById(
    "conversation-area"
    );

    if(!panel) return;

    panel.innerHTML = `

    <div class="cliente-card">

        <h3>

        ${caso.cliente}

        </h3>

        <p>

        ${caso.mensaje}

        </p>

    </div>

    `;

    document.getElementById(
    "customer-name"
    ).innerText =
    caso.cliente;

    document.getElementById(
    "customer-account"
    ).innerText =
    caso.cuenta;

  db.collection("cases") .doc(id) .update({ estado:"asignado" });

document.addEventListener("click",function(e){

    if(e.target.id==="send-btn"){

        const input =
        document.getElementById(
        "message-input"
        );

        const texto =
        input.value.trim();

        if(texto==="") return;

        const area =
        document.getElementById(
        "conversation-area"
        );

        area.innerHTML += `

        <div style="
        text-align:right;
        margin-top:15px;
        ">

            <div style="
            display:inline-block;
            background:#0057ff;
            color:white;
            padding:10px;
            border-radius:10px;
            ">

            ${texto}

            </div>

        </div>

        `;

        input.value="";

    }

});

}

// Logout
function logout() {
  location.reload();
}
