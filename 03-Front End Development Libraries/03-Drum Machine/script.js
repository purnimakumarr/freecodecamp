const projectName = "Drum Machine";
console.log(projectName);

const bank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drumBank: bank,
      display: "",
    };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  playSound(e) {
    let source, displayText;
    this.state.drumBank.forEach(function (item) {
      if (item.keyTrigger === e.target.textContent) {
        source = item.url;
        displayText = item.id;
      }
    });

    const audio = document.getElementById(e.target.textContent);
    audio.src = source;
    audio.currentTime = 0;
    audio.play();
    this.updateDisplay(displayText);
    console.log(e.target.textContent + " key clicked!");
  }

  updateDisplay(text) {
    this.setState({
      drumBank: bank,
      display: text,
    });
  }

  handleKeyPress(e) {
    let keyPressed = e.key.toUpperCase(),
      source,
      displayText;
    console.log(keyPressed + " key pressed!");
    this.state.drumBank.forEach(function (item) {
      if (item.keyTrigger == keyPressed) {
        source = item.url;
        displayText = item.id;
      }
    });
    const audio = document.getElementById(keyPressed);
    audio.src = source;
    audio.currentTime = 0;
    audio.play();
    this.updateDisplay(displayText);
  }

  changeVolume(e) {
    const audioEl = document.getElementsByTagName("audio");
    audioEl.forEach(function (audio) {
      audio.volume = e.target.value / 100;
    });
    this.setState({
      drumBank: this.state.drumBank,
      display: "Volume: " + e.target.value,
    });
    console.log("Volume set to " + e.target.value);
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="drum-pad-box">
          <button
            className="drum-pad"
            id="drum-pad-Q"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            Q
            <audio src="#" className="clip" id="Q" />
          </button>

          <button
            className="drum-pad"
            id="drum-pad-W"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            W
            <audio src="#" className="clip" id="W" />
          </button>
          <button
            className="drum-pad"
            id="drum-pad-E"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            E
            <audio src="#" className="clip" id="E" />
          </button>

          <button
            className="drum-pad"
            id="drum-pad-A"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            A
            <audio src="#" className="clip" id="A" />
          </button>
          <button
            className="drum-pad"
            id="drum-pad-S"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            S
            <audio src="#" className="clip" id="S" />
          </button>
          <button
            className="drum-pad"
            id="drum-pad-D"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            D
            <audio src="#" className="clip" id="D" />
          </button>

          <button
            className="drum-pad"
            id="drum-pad-Z"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            Z
            <audio src="#" className="clip" id="Z" />
          </button>
          <button
            className="drum-pad"
            id="drum-pad-X"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            X
            <audio src="#" className="clip" id="X" />
          </button>
          <button
            className="drum-pad"
            id="drum-pad-C"
            onClick={(this.playSound = this.playSound.bind(this))}
          >
            C
            <audio src="#" className="clip" id="C" />
          </button>
        </div>

        <div id="display-box">
          <p id="display">{this.state.display}</p>
          <input
            className="volume-range"
            type="range"
            min="0"
            max="100"
            defaultValue="100"
            onChange={this.changeVolume}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("app"));
