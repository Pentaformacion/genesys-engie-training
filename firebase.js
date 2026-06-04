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

// VARIABLES

let currentUser = "";
let currentRole = "";

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

    currentUser = name;
    currentRole = role;

    if (role === "advisor") {

        document.getElementById(
        "login-screen"
        ).style.display = "none";

        document.getElementById(
        "advisor-view"
        ).style.display = "block";

    }

    if (role === "trainer") {

        document.getElementById(
        "login-screen"
        ).style.display = "none";

        document.getElementById(
        "trainer-view"
        ).style.display = "block";

    }

    console.log(
        "Usuario conectado:",
        name,
        role
    );

}

// LOGOUT

function logout(){

location.reload();

}
