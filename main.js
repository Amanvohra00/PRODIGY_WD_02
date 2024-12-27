let startTime, updatedTime, elapsedTime = 0;
let interval;
let running = false;

const timer = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
  if (!running) {
    start();
  } else {
    pause();
  }
});

resetBtn.addEventListener('click', reset);

lapBtn.addEventListener('click', recordLap);

function start() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(updateTimer, 100);
  running = true;
  startPauseBtn.textContent = 'Pause';
}

function pause() {
  clearInterval(interval);
  running = false;
  startPauseBtn.textContent = 'Start';
}

function reset() {
  clearInterval(interval);
  elapsedTime = 0;
  running = false;
  timer.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  laps.innerHTML = '';
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;

  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  timer.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(unit) {
  return unit < 10 ? '0' + unit : unit;
}

function recordLap() {
  const lapTime = timer.textContent;
  const lapElement = document.createElement('li');
  lapElement.textContent = `Lap: ${lapTime}`;
  laps.appendChild(lapElement);
}