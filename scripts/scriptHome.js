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

const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      alert(`se ha registrado ${user.email}`);
      partidasDoc.doc(user.uid).set({ partidas: [] })
    })
    
};
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;
  pass === pass2 ? signUpUser(email, pass) : alert("error passwords didn´t match");
  document.getElementById("form1").reset();
})
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      alert(`se ha logado ${user.email}`)
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

  //Obtener los cuatro últimos resultados para home 
resultado=['',];
intento=[];

for(let i=1; i<localStorage.length;i++){

  const partidaJugadaKey = localStorage.key(localStorage.length-i);
  const partidaJugadaValue = JSON.parse(localStorage.getItem(partidaJugadaKey));
  resultado.push = partidaJugadaValue.correctCounter;
  intento.push= partidaJugadaValue.data;
  console.log(intento)
  console.log(resultado)
}





  //Defino una variable para almacenar las ultimas cuatro partidas jugadas 
  const lastPlayedKey = localStorage.key(localStorage.length - 1);
  const lastPlayedValue = JSON.parse(localStorage.getItem(lastPlayedKey));
  const res4= lastPlayedValue.correctCounter;
  const date4=lastPlayedValue.date.slice(0, 25);

  let score4 =document.querySelector('#lastPlayed');
  score4.innerHTML = `Correct Answers: ${res4}`;
  let scoreDate4=document.querySelector('#date4');
  scoreDate4.innerHTML = `1st attempt: ${date4}`;

 // para almacenar  la partida 3
  const thirdPlayedKey = localStorage.key(localStorage.length-2);
  const thirdPlayedValue = JSON.parse(localStorage.getItem(thirdPlayedKey));
  const res3= thirdPlayedValue.correctCounter;
  const date3=thirdPlayedValue.date.slice(0,25);

  let score3 =document.querySelector('#thirdPlayed');
  score3.innerHTML =`Correct Answers: ${res3}`;
  let scoreDate3=document.querySelector('#date3');
  scoreDate3.innerHTML = `2nd attempt:  ${date3}`;

 // para almacenar  la partida 2

  const secondPlayedKey = localStorage.key(localStorage.length-3);
  const secondPlayedValue = JSON.parse(localStorage.getItem(secondPlayedKey));
  const res2= secondPlayedValue.correctCounter;
  const date2= secondPlayedValue.date.slice(0,25);

  let score2 =document.querySelector('#secondPlayed');
  score2.innerHTML = `Correct Answers: ${res2}`;
  let scoreDate2=document.querySelector('#date2');
  scoreDate2.innerHTML = `3rd attempt:${date2}`;

  // para almacenar  la partida 1

  const firstPlayedKey = localStorage.key(localStorage.length-4);
  const firstPlayedValue = JSON.parse(localStorage.getItem(firstPlayedKey));
  const res1= firstPlayedValue.correctCounter;
  const date1= firstPlayedValue.date.slice(0,25);

  let score1 =document.querySelector('#firstPlayed');
  score1.innerHTML = `Correct Answers: ${res1}`;
  let scoreDate1=document.querySelector('#date1');
  scoreDate1.innerHTML = `4th attempt: ${date1}`;

//Almaceno las 4 variables en un array 

/* const prueba =['',]
for(let i=0; i< localStorage.length;i++){

  prueba.push(res1,res2,res3,res4)
  console.log(prueba);
}
const hits = ['',res1,res2,res3,res4];
 */
var data = {
  // A labels array that can contain any sort of values
  labels: intento,
  // labels: ['', '1st', '2nd', '3rd', '4th'],
  // Our series array that contains series objects or in this case series data arrays
  // series: [prueba]
  series: [resultado],
};
const options = {
  axisY:{
  stepSize: 1,
  scaleMinSpace: 1,
  showLabel: true,
  showPoint:true,
  low:0,
  high:10,
  onlyInteger:true
  }}
// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.ct-chart', data, options);



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

const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      showMessage(`se ha registrado ${user.email}`);
      // ...
      // Guarda El usuario en Firestore
      createUser({
        id: user.uid,
        email: user.email
      });
    })
    .catch((error) => {
      showMessage("Error en el sistema" + error.message);
    });
};
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;
  pass === pass2 ? signUpUser(email, pass) : alert("error passwords didn´t match");
  document.getElementById("form1").reset();
})
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      showMessage(`se ha logado ${user.email}`)
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
    });
}
const signOut = () => {
  let user = firebase.auth().currentUser;
  firebase.auth().signOut().then(() => {
    showMessage("Sale del sistema: " + user.email)
  }).catch((error) => {
    showMessage("Hubo un error: " + error);
  });
}
document.getElementById("form2").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass)
  document.getElementById("form2").reset();
})
document.getElementById("signOut").addEventListener("click", signOut);
// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    showMessage(`Está en el sistema:${user.email}`);
  } else {
    showMessage("No hay usuarios en el sistema");
  }
});

function showMessage(message, type = "success") {
  Toastify({
    text: message,
    duration: 4000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === "success" ? "green" : "red",
    },
  }).showToast();
}