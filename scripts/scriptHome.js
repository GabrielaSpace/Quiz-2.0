

  //Obtener los cuatro últimos resultados para home 

  //Defino una variable para almacenar las ultimas cuatro partidas jugadas 
  const lastPlayedKey = localStorage.key(localStorage.length - 1);
  const lastPlayedValue = JSON.parse(localStorage.getItem(lastPlayedKey));
  const res4= lastPlayedValue.correctCounter;
  const date4=lastPlayedValue.date.slice(0, 25);

  let score4 =document.querySelector('#lastPlayed');
  score4.innerHTML = `Correct Answers: ${res4}`;
  let scoreDate4=document.querySelector('#date4');
  scoreDate4.innerHTML = `4th attempt: ${date4}`;

 // para almacenar  la partida 3
  const thirdPlayedKey = localStorage.key(localStorage.length-2);
  const thirdPlayedValue = JSON.parse(localStorage.getItem(thirdPlayedKey));
  const res3= thirdPlayedValue.correctCounter;
  const date3=thirdPlayedValue.date.slice(0,25);

  let score3 =document.querySelector('#thirdPlayed');
  score3.innerHTML =`Correct Answers: ${res3}`;
  let scoreDate3=document.querySelector('#date3');
  scoreDate3.innerHTML = `3rd attempt: ${date3}`;

 // para almacenar  la partida 2

  const secondPlayedKey = localStorage.key(localStorage.length-3);
  const secondPlayedValue = JSON.parse(localStorage.getItem(secondPlayedKey));
  const res2= secondPlayedValue.correctCounter;
  const date2= secondPlayedValue.date.slice(0,25);

  let score2 =document.querySelector('#secondPlayed');
  score2.innerHTML = `Correct Answers: ${res2}`;
  let scoreDate2=document.querySelector('#date2');
  scoreDate2.innerHTML = `2nd attempt: ${date2}`;

  // para almacenar  la partida 1

  const firstPlayedKey = localStorage.key(localStorage.length-4);
  const firstPlayedValue = JSON.parse(localStorage.getItem(firstPlayedKey));
  const res1= firstPlayedValue.correctCounter;
  const date1= firstPlayedValue.date.slice(0,25);

  let score1 =document.querySelector('#firstPlayed');
  score1.innerHTML = `Correct Answers: ${res1}`;
  let scoreDate1=document.querySelector('#date1');
  scoreDate1.innerHTML = `1st attempt: ${date1}`;

//Almaceno las 4 variables en un array 

const hits = ['',res1,res2,res3,res4];

var data = {
  // A labels array that can contain any sort of values
  labels: ['', '1st', '2nd', '3rd', '4th'],
  // Our series array that contains series objects or in this case series data arrays
  series: [hits]
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
