const projectName = "JavaScript Calculator";
console.log(projectName);

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "0",
      prevValue: "",
      expression: "",
    };

    this.updateInput = this.updateInput.bind(this);
    this.genResult = this.genResult.bind(this);
  }

  updateInput(e) {
    switch (e.target.id) {
      case "clear":
        this.setState({
          input: "0",
          prevValue: "",
          expression: "",
        });
        break;
      case "subtract":
        this.setState({
          input: e.target.textContent,
          prevValue: "",
          expression: this.state.expression + e.target.textContent,
        });
        break;
      case "add":
      case "multiply":
      case "divide":
        if (this.state.expression.includes("=")) {
          this.setState({
            input: e.target.textContent,
            prevValue: "",
            expression: this.state.input + e.target.textContent,
          });
        } else if (
          this.state.expression.endsWith("*-") ||
          this.state.expression.endsWith("+-") ||
          this.state.expression.endsWith("/-")
        ) {
          this.setState({
            input: e.target.textContent,
            prevValue: "",
            expression:
              this.state.expression.substr(
                0,
                this.state.expression.length - 2
              ) + e.target.textContent,
          });
        } else if (
          this.state.expression.endsWith("+") ||
          this.state.expression.endsWith("/") ||
          this.state.expression.endsWith("*")
        ) {
          this.setState({
            input: e.target.textContent,
            prevValue: "",
            expression:
              this.state.expression.substr(
                0,
                this.state.expression.length - 1
              ) + e.target.textContent,
          });
        } else {
          this.setState({
            input: e.target.textContent,
            prevValue: "",
            expression: this.state.expression + e.target.textContent,
          });
        }
        break;
      case "decimal":
        if (
          !this.state.input.includes(".") &&
          !(
            this.state.input.endsWith("+") ||
            this.state.input.endsWith("-") ||
            this.state.input.endsWith("/") ||
            this.state.input.endsWith("*")
          )
        ) {
          this.setState({
            input: this.state.prevValue + e.target.textContent,
            prevValue: this.state.prevValue + e.target.textContent,
            expression: this.state.expression + e.target.textContent,
          });
        } else if (!this.state.input.includes(".")) {
          this.setState({
            input: this.state.prevValue + "0" + e.target.textContent,
            prevValue: this.state.prevValue + "0" + e.target.textContent,
            expression: this.state.expression + "0" + e.target.textContent,
          });
        }
        break;
      case "zero":
        if (this.state.input.startsWith("0")) {
          this.setState({
            input: "0",
            prevValue: "",
            expression: this.state.expression,
          });
          break;
        }
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        if (this.state.prevValue.length >= 19) {
          this.setState({
            input: "Max limit reached",
            prevValue: this.state.prevValue,
            expression: this.state.expression,
            numCount: this.state.numCount,
          });
        }
        if (this.state.expression.includes("=")) {
          this.setState({
            input: e.target.textContent,
            prevValue: e.target.textContent,
            expression: e.target.textContent,
          });
        } else {
          this.setState({
            input: this.state.prevValue + e.target.textContent,
            prevValue: this.state.prevValue + e.target.textContent,
            expression: this.state.expression + e.target.textContent,
          });
        }
        break;
    }
  }

  genResult() {
    const regex = /[0-9]+[.][0-9]*|[0-9]+|[/*+-]/g;

    const exp = this.state.expression.match(regex).join("");
    console.log("expression:-");
    console.log(exp);
    const result = eval(exp);
    console.log(result);

    this.setState({
      input: `${result}`,
      prevValue: this.state.prevValue,
      expression: this.state.expression + " = " + ` ${result}`,
    });
  }

  render() {
    return (
      <main id="app">
        <DisplayBox
          display={this.state.input}
          expression={this.state.expression}
        />
        <CalculatorPad
          handler={this.updateInput}
          generateResult={this.genResult}
        />
      </main>
    );
  }
}

const DisplayBox = function (props) {
  return (
    <div id="display-box">
      <span id="expression">{props.expression}</span>
      <p id="display">{props.display}</p>
    </div>
  );
};

const CalculatorPad = function (props) {
  return (
    <div id="calc-pad">
      <button id="clear" className="btn" onClick={props.handler}>
        AC
      </button>
      <button id="divide" className="btn" onClick={props.handler}>
        /
      </button>
      <button id="multiply" className="btn" onClick={props.handler}>
        *
      </button>
      <button id="seven" className="btn" onClick={props.handler}>
        7
      </button>
      <button id="eight" className="btn" onClick={props.handler}>
        8
      </button>
      <button id="nine" className="btn" onClick={props.handler}>
        9
      </button>
      <button id="subtract" className="btn" onClick={props.handler}>
        -
      </button>
      <button id="four" className="btn" onClick={props.handler}>
        4
      </button>
      <button id="five" className="btn" onClick={props.handler}>
        5
      </button>
      <button id="six" className="btn" onClick={props.handler}>
        6
      </button>
      <button id="add" className="btn" onClick={props.handler}>
        +
      </button>
      <button id="one" className="btn" onClick={props.handler}>
        1
      </button>
      <button id="two" className="btn" onClick={props.handler}>
        2
      </button>
      <button id="three" className="btn" onClick={props.handler}>
        3
      </button>
      <button id="equals" className="btn" onClick={props.generateResult}>
        =
      </button>
      <button id="zero" className="btn" onClick={props.handler}>
        0
      </button>
      <button id="decimal" className="btn" onClick={props.handler}>
        .
      </button>
    </div>
  );
};

ReactDOM.render(<CalculatorApp />, document.getElementById("root"));
