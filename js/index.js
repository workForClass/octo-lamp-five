/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';

    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer === -1) {
          timer = duration;
          e.preventDefault();
          e.stopPropagation();
          display.innerHTML = 'Times Up!' * minutes
          calculateScore(e)
        }
      }, 1000);
    }
  
      var fiveMinutes = 60 * 5/20;
      display = document.querySelector('#time');
      startTimer(fiveMinutes, display);
    
  });


  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: "What is an Aubergine?",
      o: [
        "Eggplant",
        "Toothpaste",
        "Clothing Brand",
        "A beautiful place on the French Riviera."
      ],
      a: 0
    },
    {
      q: "How many pies would you need to feed 21 travellers, if each pie is going to fill 3 hungry travellers?",
      o: [
        10,
        4,
        7,
        "Never enough pies!"
      ],
      a: 2
    }
  ];
  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    let btnSubmit = `<div>
                        <button type="submit" class="btn btn-primary" id="btnSubmit">
                          Submit Quiz
                        </button>
                        <button type="reset" class="btn btn-primary" id="btnReset">
                          Reset Quiz
                        </button>
                        <span id="score"></span>
                     </div>`;

    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay + btnSubmit;
    });
    quizWrap.addEventListener('submit', calculateScore);
  };

  // Calculate the score
  const calculateScore = (e) => {
    let score = 0;
    let scoreHTML = document.querySelector("#score");
    quizArray.map((quizItem, index) => {

      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);
        //console.log(quizItem.a)

        if (radioElement.checked >= 0) {
          e.preventDefault()
        }
        if (quizItem.a === i) {
          //change background color of li element here
          liElement.style.backgroundColor = "lightgreen";
          radioElement.value = 'true';
          console.log(i)
        
          if (radioElement.checked) {
            // code for task 1 goes here
            console.log(quizItem.a);
            score++;
            scoreHTML.innerHTML = `Your current score is ${score} / 5.`;
            console.log(`Your current score is ${score}.`); 
          }
      }
      }
    });
  };
  // call the displayQuiz function
  displayQuiz();

  // Reset Button
  let btnReset = document.querySelector('#btnReset');
  btnReset.addEventListener('click', function(){window.location.reload()});
});
