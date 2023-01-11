const firebaseConfig = {
    apiKey: "AIzaSyA9THvy5iaDALxLpY13-PKGXHO8rDZKFZY",
    authDomain: "quiz2-65615.firebaseapp.com",
    projectId: "quiz2-65615",
    storageBucket: "quiz2-65615.appspot.com",
    messagingSenderId: "27725364648",
    appId: "1:27725364648:web:dd8dc5efd1f6c4d99e319d"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore
const partidasDoc = db.collection("partidas");

function addPartida(puntuacion, fecha) {
    let userId = firebase.auth().currentUser.uid;
    partidasDoc.doc(userId).update({
        partidas: firebase.firestore.FieldValue.arrayUnion({ puntuacion, fecha })
    });
}

//Obtener los resultados del LocalStorage
const lastItemKey = localStorage.key(localStorage.length - 1);
const lastItemValue = JSON.parse(localStorage.getItem(lastItemKey));



//Mostrar preguntas y respuestas escogidas corregidas

let divEscogidas = document.querySelector("#labels-escogidos");

for (let i = 0; i < 10; i++) {
    let respuesta = document.createElement("p");
    if (lastItemValue.correct[i]) {
        respuesta.setAttribute("class", "correcta");
    } else {
        respuesta.setAttribute("class", "incorrecta");
    }
    respuesta.innerHTML = lastItemValue.answers[i];
    divEscogidas.appendChild(respuesta);
}



//Mostrar resultados
let score = document.querySelector('#score');

if (lastItemValue.correctCounter < 10) {
    score.textContent = '0' + lastItemValue.correctCounter + '/10';
} else {
    score.innerHTML = lastItemValue.correctCounter + '/10';
}








