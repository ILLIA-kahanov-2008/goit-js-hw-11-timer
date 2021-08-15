class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  getRefs = () => {
    const container = document.querySelector(this.selector);
    const days = container.querySelector('[data-value="days"]');
    const hours = container.querySelector('[data-value="hours"]');
    const minutes = container.querySelector('[data-value="mins"]');
    const seconds = container.querySelector('[data-value="secs"]');
    const startBtn = container.querySelector(".start");
    const stopBtn = container.querySelector(".stop");

    return { container, days, hours, minutes, seconds, startBtn, stopBtn };
  };

  updateTimer({ container, days, hours, minutes, seconds }) {
    const time = this.targetDate - Date.now();

    if (time < 0) {
      this.stop(container);
      return;
    }
    days.textContent = Math.floor(time / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    hours.textContent = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, "0");
    minutes.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    seconds.textContent = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
  }

  start = () => {
    console.log("start", this);
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  };

  stop = () => {
    clearInterval(this.intervalId);
    this.getRefs().container.innerHTML = "<h1>Time is over</h1>";
  };

  addListeners({ startBtn, stopBtn }) {
    startBtn.addEventListener("click", this.start);
    stopBtn.addEventListener("click", this.stop);
  }
}

// const newTimerBtn = document.querySelector('.new-timer');
// newTimerBtn.addEventListener('click', createNewTimer)

// function createNewTimer() {
//   const userYear = prompt('Edit countdown year in number format (example, 2021)');
//   const userMonth = prompt('Edit countdown month in number format (example, 01)');
//   const userDay = prompt('Edit countdown day in number format (example, 01)');
//   const userHours = prompt('Edit countdown hours in number format (example, 01)');
//   const userMinutes = prompt('Edit countdown minutes in number format (example, 01)');
//   const timer = new CountdownTimer({
//     selector: '#timer-1',
//   targetDate: new Date(`${userYear}-${userMonth}-${userDay}T${userHours}:${userMinutes}`),
//   // targetDate: new Date(`${userDate} ${userTime}`),
//   });

//   timer.start();
//   timer.addListeners(timer.getRefs())
// }

const newYearTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jan 01, 2022 00:00"),
});

newYearTimer.addListeners(newYearTimer.getRefs());
