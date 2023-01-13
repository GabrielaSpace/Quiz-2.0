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


const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      alert(`Se ha registrado ${user.email}`);
      partidasDoc.doc(user.uid).set({ partidas: [] })
    })

};
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;
  pass === pass2 ? signUpUser(email, pass) : alert("Las contraseñas no coinciden");
  document.getElementById("form1").reset();
})
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      alert(`Se ha logado ${user.email}`)
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    });
}
const signOut = () => {
  let user = firebase.auth().currentUser;
  firebase.auth().signOut().then(() => {
    console.log("Sale del sistema: " + user.email)
  }).catch((error) => {
    console.log("Hubo un error: " + error);
  });
}

document.getElementById("form2").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass);
  document.getElementById("form2").reset();
})
document.getElementById("signOut").addEventListener("click", signOut);
// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(`Está en el sistema:${user.email}`);
  } else {
    console.log("No hay usuarios en el sistema");
  }
});


// Obtener las últimas cuatro partidas
const obtenerUltimasPartidas = async () => {
  await firebase.auth().onAuthStateChanged(async () => {
    const userId = await firebase.auth().currentUser.uid;
    const doc = await partidasDoc.doc(userId).get();
    const partidasData = await doc.data();
    const cuartaPartida = await partidasData.partidas[partidasData.partidas.length - 1];
    const terceraPartida = await partidasData.partidas[partidasData.partidas.length - 2];
    const segundaPartida = await partidasData.partidas[partidasData.partidas.length - 3];
    const primeraPartida = await partidasData.partidas[partidasData.partidas.length - 4];
    let resultado = ['',];
    let intento = [];
    resultado.push(cuartaPartida.puntuacion, terceraPartida.puntuacion, segundaPartida.puntuacion, primeraPartida.puntuacion);
    intento.push(cuartaPartida.fecha.slice(3, 16), terceraPartida.fecha.slice(3, 16), segundaPartida.fecha.slice(3, 16), primeraPartida.fecha.slice(3, 16));
    // Variables para almacenar las ultimas cuatro partidas jugadas 
    const res4 = resultado[1];
    const date4 = intento[0];
    let score4 = document.querySelector('#lastPlayed');
    score4.innerHTML = `Respuestas correctas: ${res4}`;
    let scoreDate4 = document.querySelector('#date4');
    scoreDate4.innerHTML = date4;

    const res3 = resultado[2];
    const date3 = intento[1];
    let score3 = document.querySelector('#thirdPlayed');
    score3.innerHTML = `Respuestas correctas: ${res3}`;
    let scoreDate3 = document.querySelector('#date3');
    scoreDate3.innerHTML = date3;

    const res2 = resultado[3];
    const date2 = intento[2];
    let score2 = document.querySelector('#secondPlayed');
    score2.innerHTML = `Respuestas correctas: ${res2}`;
    let scoreDate2 = document.querySelector('#date2');
    scoreDate2.innerHTML = date2;

    const res1 = resultado[4];
    const date1 = intento[3];
    let score1 = document.querySelector('#firstPlayed');
    score1.innerHTML = `Respuestas correctas: ${res1}`;
    let scoreDate1 = document.querySelector('#date1');
    scoreDate1.innerHTML = date1;

    var data = {
      // A labels array that can contain any sort of values
      labels: intento,
      // labels: ['', '1st', '2nd', '3rd', '4th'],
      // Our series array that contains series objects or in this case series data arrays
      series: [resultado],
    };
    const options = {
      axisY: {
        stepSize: 1,
        scaleMinSpace: 1,
        showLabel: true,
        showPoint: true,
        low: 0,
        high: 10,
        onlyInteger: true
      }
    }
    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Line('.ct-chart', data, options);
  })
}

obtenerUltimasPartidas()


