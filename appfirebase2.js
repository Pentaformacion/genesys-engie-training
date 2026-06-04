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

function login(role){
alert("Login funcionando");
}

function logout(){
location.reload();
}
