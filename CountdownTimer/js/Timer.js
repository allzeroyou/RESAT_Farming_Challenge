export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      hours: root.querySelector(".timer-part-hours"),
      minutes: root.querySelector(".timer-part-minutes"),
      seconds: root.querySelector(".timer-part-seconds"),
      control: root.querySelector(".timer-btn-control"),
      reset: root.querySelector(".timer-btn-reset"),
    };
    this.interval = null; //
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("몇 분 집중하실? ");
      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      } else {
        const inputHours = prompt("몇 시간 집중하실? ");
        if (inputHours >= 1) {
          this.stop();
          this.remainingSeconds = inputHours * 3600; // Convert hours to seconds
          this.updateInterfaceTime();
        } else {
          // Handle invalid input or display an error message
          console.log("Invalid input for hours");
        }
      }
    });
  }
  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");

    console.log(minutes, seconds);
  }
  //
  updateInterfaceControls() {
    if (this.interval === null) {
      // start
      this.el.control.innerHTML = `<span class="material-icons"> play_arrow </span> `;
      this.el.control.classList.add("time-btn-start");
      this.el.control.classList.remove("time-btn--stop");
    } else {
      // pause
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("time-btn--stop");
      this.el.control.classList.remove("time-btn-start");
    }
  }

  // 시,분,초 버전
  updateInterfaceTime() {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.hours.textContent = hours.toString().padStart(2, "0");
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");

    console.log(hours, minutes, seconds);
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();
      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);
    this.updateInterfaceControls();
  }
  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControls();
  }
  static getHTML() {
    return `
    <span class="timer-part timer-part-hours">00</span>
    <span class="timer-part">:</span>
    <span class="timer-part timer-part-minutes">00</span>
    <span class="timer-part">:</span>
    <span class="timer-part timer-part-seconds">00</span>
    <button type="button" class="timer-btn timer-btn-control timer-btn-start">
      <span class="material-icons"> play_arrow </span>
    </button>
    <button type="button" class="timer-btn timer-btn-reset">
      <span class="material-icons"> timer </span>
    </button>

    `;
  }
}
