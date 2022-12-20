//Obtener los resultados del LocalStorage
const lastItemKey = localStorage.key(localStorage.length - 1);
const lastItemValue = JSON.parse(localStorage.getItem(lastItemKey));
lastItemValue

//Mostrar resultados
let score = document.querySelector('#score');

if (lastItemValue.correctCounter < 10) {
    score.textContent = '0' + lastItemValue.correctCounter + '/10';
} else {
    score.innerHTML = lastItemValue.correctCounter + '/10';
}
