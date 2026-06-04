const firebaseConfig = {
  apiKey: "AIzaSyAsy_6xBBZ77vqeskM0BT64mnbQ-eHXkss",
  authDomain: "genesyscloud-db5a0.firebaseapp.com",
  projectId: "genesyscloud-db5a0",
  storageBucket: "genesyscloud-db5a0.firebasestorage.app",
  messagingSenderId: "451639211739",
  appId: "1:451639211739:web:7c37433d72ff7d34d5befe"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("Firebase iniciado correctamente");

javascript
// VARIABLES

let currentUser = "";
let currentRole = "";

// CREDENCIALES FORMADOR

const TRAINER_USER = "instructor";
const TRAINER_PASSWORD = "ENGIE2026";

// LOGIN

function login(role) {

    const input =
    document.getElementById("userName");

    if (!input) {
        alert("No existe el campo userName");
        return;
    }

    const name =
    input.value.trim();

    if (name === "") {

        alert("Ingresa tu nombre");

        return;
    }

    // LOGIN ASESOR

    if(role === "advisor"){

        currentUser = name;
        currentRole = role;

        db.collection("advisors")
        .doc(name)
        .set({

            name:name,
            role:"advisor",
            status:"En Cola",
            login:new Date()

        });

        document.getElementById(
        "login-screen"
        ).style.display = "none";

        document.getElementById(
        "advisor-view"
        ).style.display = "block";

        console.log(
            "Asesor conectado:",
            name
        );

        return;
    }

    // LOGIN FORMADOR

    const password =
    prompt("Contraseña de Formador");

    if(
        name === TRAINER_USER &&
        password === TRAINER_PASSWORD
    ){

        currentUser = name;
        currentRole = role;

        document.getElementById(
        "login-screen"
        ).style.display = "none";

        document.getElementById(
        "trainer-view"
        ).style.display = "block";

        console.log(
            "Formador conectado"
        );

    }else{

        alert(
            "Credenciales incorrectas"
        );

    }

}
