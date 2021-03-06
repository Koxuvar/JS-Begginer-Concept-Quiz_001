/*-------------------------- HTML ELEMENTS --------------------------*/

const rootEL = document.querySelector(".root");
const timeDisplay = document.querySelector("#time-left");
const startButton = document.querySelector("#start-game");
const welcomeBox = document.querySelector(".welcome");
const questionSection = document.querySelector(".questionSection");
const questionTitle = document.querySelector("#questionh1");
const questions = document.querySelector("#questions");
const highScoreBox = document.querySelector('#highscores');
const highScores = document.querySelector('#scores');
const showwHighScoresButton = document.querySelector('#show-high-scores');
const playerScore = document.querySelector('#player-score');
const scoreForm = document.querySelector('#score-form');
const userInit = document.querySelector('#user-initials-form');
const initials = document.querySelector('#initials');
const clearScores = document.querySelector('#clear-high-scores');
const playAgainButton = document.querySelector('#play-again');

/*-------------------------- QUESTIONS AND ANSWERS --------------------------*/

/*
* @param {quizQuestions}
* an array of questions that will be asked for the quiz
*/
const quizQuestions = [
    'How do you log "Hello World!" in the browser console?',//1
    'What is the correct JavaScript syntax to change the content of the HTML paragraph with an id of "demo"?',//2
    'Variables need to be initialized to a value?',//3
    'What type of variables can I store in an array?',//4
    'The external JavaScript file must be contained in a <script> tag.',//5
    'How do you write "Hello World" in an alert box?',//6
    'How do you create a function in JavaScript?',//7
    'How do you call a function named "myFunction"?',//8
    'How to write an IF statement in JavaScript?',//9
    'How to write an IF statement for executing some code if "i" is NOT equal to 5?',//10
    'How does a WHILE loop start?',//11
    'How does a FOR loop start?',//12
    'How can you add a comment in a JavaScript?',//13
    'How do you declare a JavaScript variable?',//14
    'What is the correct way to write a JavaScript array?',//15
    'JavaScript is the same as Java.',//16
    'Which event occurs when the user clicks on an HTML element?'//17
]

/*
* @param {quizAnswers}
* a 2D array consisting of the answers to the questions in the quiz.
* each answer is an entry in the array and the final entry is a number that points to the correct answer.
! NOTE: the "correct answer" number at the end of the array points to which answer is correct numerically not the index of that answer.
*/
const quizAnswers = [
    ['consoleLog("Hello World!")', 'print("Hello World!")', 'console.log(\"Hello World!\")', 'feedback("Hello World!")', 3],
    ['document.getElementByName("p").innerHTML = "Hello World!";', ' #demo.innerHTML = "Hello World!";', ' document.getElement("p").innerHTML = "Hello World!";', ' document.getElementById("demo").innerHTML = "Hello World!";', 4],
    ['True', 'False', 2],
    ['Numbers', 'Booleans', 'Strings', 'All of the above', 4],
    ['True', 'False', 1],
    [' msgBox("Hello World");', ' msg("Hello World");', ' alert("Hello World");', ' alertBox("Hello World");', 3],
    ['function:myFunction()', 'function myFunction()', 'void namespace::myFunction()', 2],
    ['call function myFunction()', 'call myFunction()', 'myFunction()', 3],
    ['if i = 5', 'if i = 5 then', 'if i == 5 then', 'if (i == 5)', 4],
    ['if (i != 5)', 'if (i <> 5)', 'if i =! 5 then', 'if i <> 5', 1],
    ['while (i <= 10)', 'while (i <= 10; i++)', 'while i = 1 to 10', 1],
    ['for (var i = 0; i <= 5; i++)', 'for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for i = 1 to 5', 1],
    ['"This is a comment', '\<!--This is a comment--\>', '//this is a comment',3],
    ['v carName;', 'var carName;', 'variable carName;', 'std::string carName;', 2],
    ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 4],
    ['False', 'True', 1],
    ['onchange', 'onmouseover', 'onmouseclick', 'onclick', 4]
]

/*-------------------------- VARIABLE DECLARATION --------------------------*/

let timerValue; //Set Game time here
let currentQuestion = 0; //used to select question and answer from arrays above
let questionAlreadyAsked;
let arrQuestionsAsked = [];//previously asked questions so no repeats
let points = 0;//users score
let arrhighScores = localStorage.highScores == null? localStorage.setItem('highScores', JSON.stringify([])) : JSON.parse(localStorage.highScores);
let highScoreVisible = false;



/*-------------------------- UTILITY FUNCTIONS --------------------------*/

/*
* getRandomInt
* multiplies a random number between 0 and 1 with a specified max value and floors that product to return the next lowest whole number
* @param {max} the max value for the random Int to be - ex: 3 returns 0, 1, or 2
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
*addToHighScores
*takes in a value and adds it to the {arrhighscores} array and stores that array in localStorage
*/
function addToHighScores(value)
{
    arrhighScores.push(value);
    
    localStorage.setItem("highScores",JSON.stringify(arrhighScores));
}

/*
*getHighScores
*takes the value for highScores in localStorage and displays them in the high scores DOM element
*/
function getHighScores()
{
    arrhighScores = JSON.parse(localStorage.highScores);
    clearNodes(highScores);
    arrhighScores.forEach( score =>
    {
        let playerScore = document.createElement('h3');
        playerScore.innerHTML = score;
        highScores.appendChild(playerScore);
    });
}

/*
*clearHighScores
*clears out the value for key highScores in local storage and calls getHighScores to update the DOM
*/
function clearHighScores()
{
    localStorage.setItem('highScores', JSON.stringify([]));
    getHighScores();
}



/*
* loseTime
* removes 10 seconds from the clock.
*/
function loseTime(event)
{   
    event.stopPropagation();
    timerValue = timerValue - 10;
}

/*
* hideWelcome
* utility function to clear the page of the welcome screen and other elements and display the question div
*/
function hideWelcome()
{
    
    welcomeBox.style.display = "none";
    highScoreBox.style.display = "none";
    showwHighScoresButton.style.display = "none";
    questionSection.style.display = "block";
    playAgainButton.style.display = "none";
    highScoreVisible = false;
    showwHighScoresButton.style.display = "block";
    return;
}

/*
* clearNodes
* utility function to clear all children of a given html element
* @param {parent} the parent HTML element that will have all its children removed from
*/
function clearNodes(parent)
{
    while(parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
    return;
}

/*
* startTimer
* initializes a game timer and displays it to the DOM. if time runs out or the game runs out of questions to ask it calls endGame()
*/
function startTimer()
{
    
    let timeInterval = setInterval(
        function()
        {
            timerValue--;
            timeDisplay.textContent = timerValue;

            if (timerValue <= 0 || arrQuestionsAsked.length == quizQuestions.length)
            {
                clearInterval(timeInterval);
                endGame();
            }
        },
        1000
    );
}

/*
* getQuestion
* gets a random number and uses that to index a question from the {quizQuestions} array. the random number is also stored to global variable {currentQuestion} for access elsewhere
* logic is performed here to check whether the question has been asked before or not.
*/
function getQuestion()
{   
    questionAlreadyAsked = true;

    currentQuestion = getRandomInt(quizQuestions.length);
    for (var a = 0; a < arrQuestionsAsked.length; a++)
    {
        if (currentQuestion == arrQuestionsAsked[a])
        {
            questionAlreadyAsked = false;
            break;
        }
        else if (arrQuestionsAsked.length == quizQuestions.length)
        {
            questionAlreadyAsked = false;
            return;
        }
        else
        {
            questionAlreadyAsked = true;
        }
    }
    
    if (!questionAlreadyAsked)
    {
        getQuestion();
    }
    else
    {
        arrQuestionsAsked.push(currentQuestion);
        questionTitle.textContent = quizQuestions[currentQuestion];

        displayAnswers();
    }

}


/*
* displayAnswers
* calls clearNodes to clear previous questions and then grabs the answers associated with the question asked using {currentQuestion} and creates buttons for each and appends them to the DOM
*/
function displayAnswers()
{
    clearNodes(questions);

    for (var i = 0; i < quizAnswers[currentQuestion].length - 1; i++)
    {
        var buttonAdd = document.createElement("button");
        buttonAdd.innerHTML = quizAnswers[currentQuestion][i];
        buttonAdd.dataset.aNum = i;

        questions.appendChild(buttonAdd);
    }

}

/*-------------------------- GAME FUNCTIONS --------------------------*/
/*
*runGame
* starts the game when the "Start Game" button is pressed. initializes game params as well.
*/
function runGame()
{
    arrQuestionsAsked = [];
    timerValue = 120;
    points = 0;
    hideWelcome();
    startTimer();
    getQuestion();
}

/*
* endGame
* clears away the question prompt and displays users score and high scores 
*/
function endGame()
{
    timeDisplay.textContent = "Game Over";
    highScoreBox.style.display = "block";
    highScoreVisible = true;
    questionSection.style.display = "none";
    scoreForm.style.display = "block";
    playAgainButton.style.display = "block";


    playerScore.textContent = points;
}

/*-------------------------- EVENT LISTENERS --------------------------*/

/*
* Start the game with the start Button
*/
startButton.addEventListener("click", runGame);

/*
* Event listener for if an answer is selected and validates that answer against the correct index.
*/
questions.addEventListener("click", event =>
{
    var isButton = event.target.nodeName === 'BUTTON';

    if (!isButton)
    {
        return;
    }
    else
    {
        var chosenAnswer = event.target.dataset.aNum;
        if (chosenAnswer == quizAnswers[currentQuestion][quizAnswers[currentQuestion].length - 1] - 1)
        {
            points += timerValue;
            getQuestion();
        }
        else
        {
            loseTime(event)
        }
    }
});

/*
* Toggles the High Scores Box
*/
showwHighScoresButton.addEventListener('click', event =>
{
    event.stopPropagation();

    if(!highScoreVisible)
    {
        getHighScores();
        highScoreBox.style.display = "block";
        highScoreVisible = true;
    }
    else
    {
        highScoreBox.style.display = "none";
        highScoreVisible = false;
    }
});

/*
* Event listener for the enter key being pressed after a user enters their initials
*/
userInit.addEventListener('submit', e =>
{
    e.preventDefault();

    let inits = initials.value;
    if(inits)
    {
    addToHighScores(`${points} _ ${inits}`);
    getHighScores();
    scoreForm.style.display = "none";
    }

    initials.value = '';
    

});

/*
* Event listener for the clear high scores button.
*/
clearScores.addEventListener('click', e =>
{
    e.stopPropagation();

    clearHighScores();
});

/*
* Event listener for the play again button
*/
playAgainButton.addEventListener('click', runGame);