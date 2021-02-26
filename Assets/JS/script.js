let rootEL = document.querySelector(".root");
let timeDisplay = document.querySelector("#time-left");

let testButton = document.querySelector("#test");

function startTimer()
{
    timerValue = 120;
    let timeInterval = setInterval(
        function()
        {
            timeDisplay.textContent = timerValue;
            timerValue--;

            if (timerValue === 0)
            {
                clearInterval(timeInterval);

                endGame();
            }
        },
        1000
    );
}


testButton.addEventListener("click", e =>
{
    startTimer();
})

