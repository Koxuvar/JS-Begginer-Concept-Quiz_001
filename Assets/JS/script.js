let rootEL = document.querySelector(".root");
let timeDisplay = document.querySelector("#time-left");

let testButton = document.querySelector("#test");
let testButton2 = document.querySelector("#test2");

let timerValue = 120;

function startTimer()
{
    
    let timeInterval = setInterval(
        function()
        {
            timerValue--;
            timeDisplay.textContent = timerValue;
            
            testButton2.addEventListener("click", e =>
            {
                timerValue -= 5;
            });

            if (timerValue <= 0)
            {
                clearInterval(timeInterval);
                timeDisplay.textContent = "Game Over";

                endGame();
            }
        },
        1000
    );
}


function loseTime()
{

    timerValue = timerValue - 5;
}

testButton.addEventListener("click", e =>
{
    startTimer();
});


