//Obtener los resultados del LocalStorage
const lastItemKey = localStorage.key(localStorage.length - 1);
const lastItemValue = JSON.parse(localStorage.getItem(lastItemKey));



//Mostrar preguntas y respuestas escogidas corregidas

let divEscogidas = document.querySelector("#labels-escogidos");

for (let i = 0; i < 10; i++){
    let respuesta = document.createElement("p");
    if (lastItemValue.correct[i]){
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








