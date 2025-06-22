let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function timeToString(ms) {
  let date = new Date(ms);
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
}

function stop() {
  clearInterval(timerInterval);
}

startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    start();
    startStopBtn.textContent = 'Pause';
  } else {
    stop();
    startStopBtn.textContent = 'Start';
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
  stop();
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  startStopBtn.textContent = 'Start';
  isRunning = false;
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = timeToString(elapsedTime);
    lapsList.appendChild(li);
  }
});
