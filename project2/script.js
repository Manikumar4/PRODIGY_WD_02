// script.js
let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;
let paused = false;
let lapTimes = [];

const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

startStopBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
});

pauseBtn.addEventListener('click', () => {
    if (paused) {
        timer = setInterval(updateTime, 10);
        pauseBtn.textContent = 'Pause';
    } else {
        clearInterval(timer);
        pauseBtn.textContent = 'Resume';
    }
    paused = !paused;
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(Math.floor(milliseconds / 10))}`;
        lapTimes.push(lapTime);
        updateLapTimes();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    paused = false;
    startStopBtn.textContent = 'Start';
    pauseBtn.textContent = 'Pause';
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapTimes = [];
    updateDisplay();
    updateLapTimes();
});

clearLapsBtn.addEventListener('click', () => {
    lapTimes = [];
    updateLapTimes();
});

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(Math.floor(milliseconds / 10));
}

function updateLapTimes() {
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            lapTimes.splice(index, 1);
            updateLapTimes();
        });
        
        lapItem.appendChild(deleteBtn);
        lapList.appendChild(lapItem);
    });
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}