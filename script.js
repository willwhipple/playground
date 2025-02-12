let isWorkMode = true;
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startBtn');
const modeButton = document.getElementById('modeBtn');
const progressBar = document.getElementById('progress-bar');
const addTimeButton = document.getElementById('addTimeBtn');
const resetButton = document.getElementById('resetBtn');

let timeLeft = WORK_TIME;
let timerId = null;

resetButton.style.display = 'none';
addTimeButton.disabled = true;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - Productivity Hub`;
}

function updateProgressBar(timeLeft, totalTime) {
    const progress = timeLeft / totalTime;
    progressBar.style.transform = `scaleX(${progress})`;
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    modeButton.innerHTML = isWorkMode ? '<i class="fas fa-coffee"></i>' : '<i class="fas fa-briefcase"></i>';
    progressBar.classList.toggle('rest-mode', !isWorkMode);
    addTimeButton.classList.toggle('rest-mode', !isWorkMode);
    updateDisplay();
    updateProgressBar(timeLeft, isWorkMode ? WORK_TIME : REST_TIME);
    
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        addTimeButton.disabled = true;
    }
    
    if (!isWorkMode) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function resetTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    timeLeft = isWorkMode ? WORK_TIME : REST_TIME;
    startButton.textContent = 'Start';
    addTimeButton.disabled = true;
    resetButton.style.display = 'none';
    updateDisplay();
    updateProgressBar(timeLeft, isWorkMode ? WORK_TIME : REST_TIME);
}

function startTimer() {
    if (timerId) {
        // Pausing the timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        addTimeButton.disabled = true;
        resetButton.style.display = 'flex'; // Keep visible when paused
    } else {
        // Starting the timer
        const totalTime = isWorkMode ? WORK_TIME : REST_TIME;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            updateProgressBar(timeLeft, totalTime);
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startButton.textContent = 'Start';
                addTimeButton.disabled = true;
                resetButton.style.display = 'none'; // Hide when timer completes
                alert(isWorkMode ? 'Work time is up! Take a break!' : 'Break time is up! Back to work!');
            }
        }, 1000);
        startButton.textContent = 'Pause';
        addTimeButton.disabled = false;
        resetButton.style.display = 'flex'; // Show when timer starts
    }
}

function addFiveMinutes() {
    const fiveMinutes = 5 * 60; // 300 seconds
    timeLeft += fiveMinutes;
    const totalTime = isWorkMode ? WORK_TIME : REST_TIME;
    updateDisplay();
    updateProgressBar(timeLeft, totalTime);
}

startButton.addEventListener('click', startTimer);
modeButton.addEventListener('click', toggleMode);
addTimeButton.addEventListener('click', addFiveMinutes);
resetButton.addEventListener('click', resetTimer);

updateDisplay(); 