let isWorkMode = true;
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startBtn');
const resetButton = document.getElementById('resetBtn');
const modeButton = document.getElementById('modeBtn');

let timeLeft = WORK_TIME;
let timerId = null;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    modeButton.textContent = isWorkMode ? 'Switch to Rest Mode' : 'Switch to Work Mode';
    updateDisplay();
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    
    // Only show confetti when switching to rest mode
    if (!isWorkMode) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function startTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startButton.textContent = 'Start';
                alert(isWorkMode ? 'Work time is up! Take a break!' : 'Break time is up! Back to work!');
            }
        }, 1000);
        startButton.textContent = 'Pause';
    }
}

function resetTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    startButton.textContent = 'Start';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);

updateDisplay(); 