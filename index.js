const fs = require('fs');
const path = require('path');

const quotesFile = path.join(__dirname, 'quotes.txt');

function addQuote(quote, author) {
  if (!quote) {
    console.error("No quote provided");
    process.exit(1);
  }

  const quoteLine = `${quote}|${author || 'Anonymous'}\n`;

  fs.appendFile(quotesFile, quoteLine, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      process.exit(1);
    }
    console.log("Quote added successfully");
  });
}

function getQuote() {
  fs.readFile(quotesFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      process.exit(1);
    }
    const quotes = data.split('\n').filter(line => line.trim() !== '');
    if (quotes.length === 0) {
      console.log("No quotes available");
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      console.log(randomQuote);
    }
  });
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'addQuote':
    addQuote(args[0], args[1]);
    break;
  case 'getQuote':
    getQuote();
    break;
  default:
    console.error("Unknown command");
    process.exit(1);
}


program.parse();

