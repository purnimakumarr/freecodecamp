const projectName = "25 + 5 Clock";
console.log(projectName);

class ClockApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionLength: 25,
      breakLength: 5,
      current: "Session",
      isTimer: "stopped",
      timeLeft: 1500,
    };

    this.breakLengthUpdate = this.breakLengthUpdate.bind(this);
    this.sessionLengthUpdate = this.sessionLengthUpdate.bind(this);
    this.reset = this.reset.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.clock = this.clock.bind(this);
    this.timer = this.timer.bind(this);
  }

  breakLengthUpdate(e) {
    if (
      this.state.isTimer === "stopped" &&
      e.target.id === "break-decrement" &&
      this.state.breakLength > 1
    ) {
      this.setState({
        breakLength: this.state.breakLength - 1,
      });
      if (this.state.current === "Break")
        this.setState({
          timeLeft: (this.state.breakLength - 1) * 60,
        });
    } else if (
      this.state.isTimer === "stopped" &&
      e.target.id === "break-increment" &&
      this.state.breakLength < 60
    ) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      });
      if (this.state.current === "Break")
        this.setState({
          timeLeft: (this.state.breakLength + 1) * 60,
        });
    }
  }

  sessionLengthUpdate(e) {
    if (
      this.state.isTimer === "stopped" &&
      e.target.id === "session-decrement" &&
      this.state.sessionLength > 1
    ) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
      });
      if (this.state.current === "Session")
        this.setState({
          timeLeft: (this.state.sessionLength - 1) * 60,
        });
    } else if (
      this.state.isTimer === "stopped" &&
      e.target.id === "session-increment" &&
      this.state.sessionLength < 60
    ) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
      });
      if (this.state.current === "Session")
        this.setState({
          timeLeft: (this.state.sessionLength + 1) * 60,
        });
    }
  }

  clock() {
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;

    if (minutes >= 10 && seconds >= 10) return minutes + ":" + seconds;
    else if (minutes <= 9 && seconds >= 10)
      return "0" + minutes + ":" + seconds;
    else if (minutes >= 10 && seconds <= 9)
      return minutes + ":" + "0" + seconds;
    else return "0" + minutes + ":" + "0" + seconds;
  }

  reset() {
    window.clearInterval(this.state.intervalId);
    const audioEl = document.getElementById("beep");
    audioEl.pause();
    audioEl.currentTime = 0;

    this.setState({
      sessionLength: 25,
      breakLength: 5,
      current: "Session",
      isTimer: "stopped",
      timeLeft: 1500,
      intervalId: "",
    });
  }

  timer() {
    if (this.state.current === "Session") {
      if (this.state.timeLeft > 0)
        this.setState({
          timeLeft: this.state.timeLeft - 1,
        });
      else if (this.state.timeLeft === 0) {
        const audioEl = document.getElementById("beep");
        audioEl.currentTime = 0;
        let interval = window.setTimeout(function () {
          audioEl.play();
          window.clearTimeout(interval);
        }, 0);
        audioEl.pause();

        this.setState({
          current: "Break",
          timeLeft: this.state.breakLength * 60,
        });
      } else
        this.setState({
          current: "Break",
          timeLeft: this.state.breakLength * 60,
        });
    } else if (this.state.current === "Break") {
      if (this.state.timeLeft > 0)
        this.setState({
          timeLeft: this.state.timeLeft - 1,
        });
      else if (this.state.timeLeft === 0) {
        const audioEl = document.getElementById("beep");
        audioEl.currentTime = 0;
        let interval = window.setTimeout(function () {
          audioEl.play();
          window.clearTimeout(interval);
        }, 0);
        audioEl.pause();

        this.setState({
          current: "Session",
          timeLeft: this.state.sessionLength * 60,
        });
      } else
        this.setState({
          current: "Session",
          timeLeft: this.state.sessionLength * 60,
        });
    }
  }

  updateTimer() {
    console.log("updateTimer");
    if (this.state.isTimer === "running") {
      window.clearInterval(this.state.intervalId);
      this.setState({
        isTimer: "stopped",
      });
    } else if (this.state.isTimer === "stopped") {
      this.setState({
        isTimer: "running",
      });
      this.setState({
        intervalId: window.setInterval(this.timer, 1000),
      });
    }
  }

  render() {
    return (
      <div class="container">
        <h1>25 + 5 Clock</h1>
        <LengthController
          session={this.state.sessionLength}
          break={this.state.breakLength}
          breakUpdate={this.breakLengthUpdate}
          sessionUpdate={this.sessionLengthUpdate}
        />
        <Timer currentLabel={this.state.current} clockTime={this.clock()} />
        <TimerControl reset={this.reset} updateTimer={this.updateTimer} />
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}

const LengthController = (props) => {
  return (
    <section class="length-controller">
      <div class="break-box">
        <span id="break-label">Break Length</span>
        <div class="flex-box">
          <div class="btn">
            <ion-icon
              class="icon"
              name="arrow-down-outline"
              id="break-decrement"
              onClick={props.breakUpdate}
            ></ion-icon>
          </div>
          <p id="break-length">{props.break}</p>
          <div class="btn">
            <ion-icon
              class="icon"
              name="arrow-up-outline"
              id="break-increment"
              onClick={props.breakUpdate}
            ></ion-icon>
          </div>
        </div>
      </div>

      <div class="session-box">
        <span id="session-label">Session Length</span>
        <div class="flex-box">
          <div class="btn">
            <ion-icon
              class="icon"
              name="arrow-down-outline"
              id="session-decrement"
              onClick={props.sessionUpdate}
            ></ion-icon>
          </div>
          <p id="session-length">{props.session}</p>
          <div class="btn">
            <ion-icon
              class="icon"
              name="arrow-up-outline"
              id="session-increment"
              onClick={props.sessionUpdate}
            ></ion-icon>
          </div>
        </div>
      </div>
    </section>
  );
};

const Timer = (props) => {
  return (
    <section class="timer">
      <p id="timer-label">{props.currentLabel}</p>
      <p id="time-left">{props.clockTime}</p>
    </section>
  );
};

const TimerControl = (props) => {
  return (
    <section class="timer-control flex-box">
      <div id="start_stop" class="btn" onClick={props.updateTimer}>
        <ion-icon class="icon" name="play-outline"></ion-icon>
        <ion-icon class="icon" name="pause-outline"></ion-icon>
      </div>
      <div class="btn">
        <ion-icon
          class="icon"
          id="reset"
          name="refresh-outline"
          onClick={props.reset}
        ></ion-icon>
      </div>
    </section>
  );
};

ReactDOM.render(<ClockApp />, document.getElementById("app"));
