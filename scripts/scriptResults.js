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

//Mostrar preguntas y respuestas escogidas corregidas

let divEscogidas = document.querySelector("#labels-escogidos");

const obtenerPartidas = async () => {
    await firebase.auth().onAuthStateChanged(async () => {
        const userId = await firebase.auth().currentUser.uid;
        const doc = await partidasDoc.doc(userId).get();
        const partidasData = await doc.data();
        const ultimaPartida = await partidasData.partidas[partidasData.partidas.length - 1];
        for (let i = 0; i < 10; i++) {
            let respuesta = document.createElement("p");
            if (ultimaPartida.correct[i]) {
                respuesta.setAttribute("class", "correcta");
            } else {
                respuesta.setAttribute("class", "incorrecta");
            }
            respuesta.innerHTML = ultimaPartida.answers[i];
            divEscogidas.appendChild(respuesta);
        }
        //Mostrar resultados
        let score = document.querySelector('#score');
        console.log(ultimaPartida)
        if (ultimaPartida.puntuacion < 10) {
            score.textContent = '0' + ultimaPartida.puntuacion + '/10';
        } else {
            score.innerHTML = ultimaPartida.puntaucion + '/10';
        }
    })
}
obtenerPartidas()



