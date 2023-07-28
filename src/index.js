const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const ONLY_NUM_REG_EXP = /\D+/gi;
const FINISH_TIME_TEXT = 'время закончилось';
const TIMER_STEP_MS = 1000;

const formattingTime = (time) => {
  return `${time <= 9 ? '0' + time : time}`;
};

const renderTimer = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 60 / 60);
  let minutes = Math.floor(totalSeconds / 60) - hours * 60;
  let seconds = totalSeconds % 60;
  let timerTemplate = [hours, minutes, seconds].map(formattingTime).join(':');

  timerEl.textContent = timerTemplate;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = () => {
  let timer;

  return (totalSeconds) => {
    renderTimer(totalSeconds--);
    clearInterval(timer);

    timer = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        timerEl.textContent = FINISH_TIME_TEXT;
      } else {
        renderTimer(totalSeconds--);
      }
    }, TIMER_STEP_MS);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (evt) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  inputEl.value = evt.target.value.replace(ONLY_NUM_REG_EXP, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
