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
const users = db.collection("users");
const createContact = (user) => {
  //crea una colección en Firebase
  users.add(user)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
      readAll()
    })
    .catch((error) => console.error("Error adding document: ", error));
}

