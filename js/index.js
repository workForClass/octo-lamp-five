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

window.addEventListener("DOMContentLoaded", () => {
  let timeLimit = 60;
  const timer = document.querySelector("#time");
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";

    const timeCountDown = () => {
      if (timeLimit === 0) {
        clearInterval(countDown);
      } else {
        timeLimit--;
        timer.innerText = timeLimit;
      }
    };
    let countDown = setInterval(timeCountDown, 1000);
    countDown;
  });



  
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: 'What is the speed of sound?',
      o: ['120 km/h', '1,200 km/h', '400 km/h', '700 km/h'],
      a: 1,
    },
    {
      q: 'Which was the first film by Disney to be produced in colour?',
      o: ['Toy Story', 'Sleeping Beauty', 'Snow White and the Seven Dwarfs', 'Cinderella'],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      // outer loop (.map) -> iterate through the obj within the arr
      // inner loop -> iterate through the arr within obj (options)
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        // li_0_0
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (quizItem.a === i) {
          //change background color of li element here
          liElement.style.backgroundColor = "green";
        }

        // i=> 0, 1, 2, 3

        if (radioElement.checked) {
          // in every loop, the radioElement increments/changes as there are 4
          // code for task 1 goes here
          if (quizItem.a === i) {
            score++;
          }
        }
      }
      const scoreText = document.querySelector("#score");
      scoreText.innerHTML = `Your score is${score}`;

      timeLimit = 0;
      timer.innerText = 0;
    });
  };
  const btnSubmit = document.querySelector("#btnSubmit");

  btnSubmit.addEventListener("click", calculateScore);

  const btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener("click", () => {
    window.location.reload();
  });
  // call the displayQuiz function

  // click start btn -> eventListener / timer attached to setInteraval

  displayQuiz();
});
