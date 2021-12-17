class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="quote-box" className="container-fluid">
        <blockquote id="text-box" className="blockquote">
          <p id="text" className="text-center"></p>
          <p id="author" className="text-center"></p>
        </blockquote>
        <div className="action-box">
          <button id="new-quote">New Quote</button>
          <a
            href="twitter.com/intent/tweet"
            target="_top"
            title="Tweet this quote!"
            id="tweet-quote"
          >
            <i id="icon" className="fa fa-twitter"></i>
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#wrapper"));

const colors = [
  "#343a40",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
  "#d9480f",
  "#e67700",
  "#5c940d",
  "#2b8a3e",
  "#087f5b",
  "#0b7285",
  "#1864ab",
  "#364fc7",
  "#5f3dc4",
  "#862e9c",
  "#a61e4d",
  "#c92a2a",
  "#212529",
];

var quotes, currentQuote, currentAuthor, currentColor;

$.ajax({
  headers: {
    Accept: "application/json",
  },
  url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
  success: function (response) {
    if (typeof response === "string") {
      console.log("JSONquotes");
      console.log(JSON.parse(response));
      quotes = JSON.parse(response).quotes;
    }
  },
});

function generateRandomColor() {
  currentColor = colors[Math.floor(Math.random() * colors.length)];
}

function getRandomQuote() {
  console.log("quotes");
  console.log(quotes);
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)].quote;
  currentAuthor = quotes[Math.floor(Math.random() * quotes.length)].author;
}

$(document).ready(function () {
  //generate a random color
  generateRandomColor();

  //set initial html for quote-box
  getRandomQuote();

  $("#text")
    .html("&quot; " + currentQuote + " &quot;")
    .css("color", currentColor);
  $("#author")
    .html("&mdash; " + currentAuthor)
    .css("color", currentColor);
  $("body").css("background-color", currentColor);
  $("#new-quote").css("background-color", currentColor);
  $("#tweet-quote").css("background-color", currentColor);

  //new-quote button is clicked
  $("#new-quote").click(function (e) {
    console.log("New-quote button clicked!");
    //generate random color
    generateRandomColor();
    $("body").css("background-color", currentColor);
    $("#new-quote").animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $(this).css("background-color", currentColor);
    });
    $("#tweet-quote").animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $(this).css("background-color", currentColor);
    });

    //generate a random quote and change the html
    getRandomQuote();
    $("#text").animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $("#text")
        .html("&quot; " + currentQuote + " &quot;")
        .css("color", currentColor);
    });
    $("#author").animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $("#author")
        .html("&mdash; " + currentAuthor)
        .css("color", currentColor);
    });
  });

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
      encodeURIComponent('" ' + currentQuote + ' "' + " - " + currentAuthor)
  );
});
