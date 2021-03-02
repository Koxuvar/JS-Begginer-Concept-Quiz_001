const rootEL = document.querySelector(".root");
const timeDisplay = document.querySelector("#time-left");
const startButton = document.querySelector("#start-game");
const welcomeBox = document.querySelector(".welcome");
const questionSection = document.querySelector(".questionSection");
const questionTitle = document.querySelector("#questionh1");
const questions = document.querySelector("#questions") 

const quizQuestions = [
    'Inside which HTML element do we put the JavaScript?',//1
    'What is the correct JavaScript syntax to change the content of the HTML element below?<br><br>&lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;</p>',//2
    'Where is the correct place to insert a JavaScript?',//3
    'What is the correct syntax for referring to an external script called "xxx.js"?',//4
    'The external JavaScript file must contain the <script> tag.',//5
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

const quizAnswers = [
    ['"<scripting>"','"<script>"','"<js>"','"<javascript>"', 2],
    ['document.getElementByName("p").innerHTML = "Hello World!";', ' #demo.innerHTML = "Hello World!";', ' document.getElement("p").innerHTML = "Hello World!";', ' document.getElementById("demo").innerHTML = "Hello World!";', 4],
    ['<script\\\>\n', '"\<head\>"', '"Both the \<script\> tag and the \<head\> tag are acceptable"', 3],
    [' <script name="xxx.js">', ' <script href="xxx.js">', ' <script src="xxx.js">', 3],
    ['True', 'False', 2],
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

let timerValue = 120;
let currentQuestion = 0;
let questionAsked = false;
let arrQuestionsAsked = [];
let points = 0;


function startTimer()
{
    
    let timeInterval = setInterval(
        function()
        {
            timerValue--;
            timeDisplay.textContent = timerValue;

            if (timerValue <= 0)
            {
                clearInterval(timeInterval);
                

                endGame();
            }
        },
        1000
    );
}


/*
* getRandomInt
* multiplies a random number between 0 and 1 with a specified max value and floors that product to return the next lowest whole number
* @param {max} the max value for the random Int to be - ex: 3 returns 0, 1, or 2
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function loseTime(event)
{   
    event.stopPropagation();
    timerValue = timerValue - 5;
}

function hideWelcome()
{
    welcomeBox.style.display = "none";
    questionSection.style.display = "block";
    return;
}

function clearNodes(parent)
{
    while(parent.firstChild)
    {
        parent.removeChild(parent.firstChild);
    }
    return;
}

function getQuestion()
{   
    questionAsked = false;

    currentQuestion = getRandomInt(quizQuestions.length);
    console.log(currentQuestion);
    for (var a = 0; a <= arrQuestionsAsked.length; a++)
    {
        if (currentQuestion == arrQuestionsAsked[a])
        {
            questionAsked = false;
        }
        else if (arrQuestionsAsked.length == quizQuestions.length)
        {
            endGame();
        }
        else
        {
            questionAsked = true;
            break;
        }
    }
    
    if (questionAsked)
    {
        arrQuestionsAsked.push(currentQuestion);
        questionTitle.textContent = quizQuestions[currentQuestion];

        displayAnswers();
    }
    else
    {
        getQuestion();
    }

}

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


function checkQuestion(questionToBeChecked)
{
    for (var a = 0; a < arrQuestionsAsked.length; a++)
    {
        if (questionToBeChecked == arrQuestionsAsked[a])
        {
            questionAsked = false;
        }
        else if (arrQuestionsAsked.length == quizQuestions.length)
        {
            return 'endGame';
        }
        else
        {
            questionAsked = false;
            return true;
        }
    }

    return false;
}

function runGame()
{
    hideWelcome();
    startTimer();
    getQuestion();
}

function endGame()
{
    timeDisplay.textContent = "Game Over";
    questionSection.style.display = "none";
}

startButton.addEventListener("click", runGame);

questions.addEventListener("click", event =>
{
    var isButton = event.target.nodeName === 'BUTTON';
    console.log(event)
    if (!isButton)
    {
        return;
    }
    else
    {
        var chosenAnswer = event.target.dataset.aNum;
        if (chosenAnswer == quizAnswers[currentQuestion][quizAnswers[currentQuestion].length - 1] - 1)
        {
            points += 1;
            getQuestion();
        }
        else
        {
            loseTime(event)
        }
    }
});