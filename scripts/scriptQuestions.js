function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let questions = await resp.json();
    return questions;
  }

  let form = document.querySelector("form");

  getQuestions()
   .then(questions => {
      for (element of questions.results) {
        let structure = {
          "question": element.question,
          "answers": shuffle([...element.incorrect_answers, element.correct_answer]),
          "solution": element.correct_answer
        }
        
        let fieldset = document.createElement("fieldset");
        form.appendChild(fieldset);

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
            input.setAttribute("id", answer);
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
        
      }
    }
  )