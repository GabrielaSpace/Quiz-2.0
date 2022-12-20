//Desordenar arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentQuestion = 0;


//Sacar preguntas de la api
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let questions = await resp.json();
    showQuestion(0);
    return questions;
}

//Hacer que las preguntas salgan de una en una
function showQuestion(index) {
    let fieldsets = document.querySelectorAll("fieldset");
    for (let i = 0; i < fieldsets.length; i++) {
        if (i === index) {
            fieldsets[i].style.display = "block";
        } else {
            fieldsets[i].style.display = "none";
        }
    }
}

let form = document.querySelector("form");
let counter = 0;
let correctCounter = 0;
let incorrectCounter = 0;

//Pintar en el DOM
getQuestions().then(questions => {
    for (element of questions.results) {
        let structure = {
            "question": element.question,
            "answers": shuffle([...element.incorrect_answers, element.correct_answer]),
            "solution": element.correct_answer
        }

        let fieldset = document.createElement("fieldset");
        form.appendChild(fieldset);
        fieldset.setAttribute("id", "fieldset" + counter);
        counter++

        let legend = document.createElement("legend");
        legend.innerHTML = structure.question;
        fieldset.appendChild(legend)

        let labels = document.createElement("div")
        labels.setAttribute("id", "div-questions");
        fieldset.appendChild(labels);
        for (answer of structure.answers) {
            let label = document.createElement('label');
            let input = document.createElement('input');

            input.setAttribute("name", structure.answers[0]);
            input.setAttribute("id", answer + "-field");
            input.setAttribute("value", answer);
            input.setAttribute("type", "radio");

            label.innerHTML = answer;
            label.setAttribute("for", answer + "-field");
            labels.appendChild(input);
            labels.appendChild(label);
        }

        let button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.innerHTML = "Enviar respuesta";
        fieldset.appendChild(button);


        button.addEventListener("click", event => {
            event.preventDefault();

            //Siguiente pregunta o resultados
            if (currentQuestion < 9) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                window.location.assign("results.html");
                //Almacenamiento de resultados
                const currentDate = new Date();
                const data = {
                    correctCounter: correctCounter,
                    date: currentDate.toString()
                };

                const dataString = JSON.stringify(data);
                localStorage.setItem(data.date, dataString);
            }
            //validación por pregunta 
            let inputs = document.querySelectorAll('input[type=radio]:checked');
            let values = [];

            for (input of inputs) {
                values.push(input.value)
            }
            if (values.includes(structure.solution)) {
                correctCounter++
            } else {
                incorrectCounter++;
            }
        });
    }
});

