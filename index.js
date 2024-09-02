const { program } = require("commander");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const QUOTE_FILE = path.resolve(__dirname, "quotes.txt");

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const quotes = data.split('\n').filter(line => line.trim() !== '');

      if (quotes.length === 0) {
        console.log(chalk.red("No quotes found."));
        return;
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);
      const [quote, author] = quotes[randomIndex].split('|');

      console.log(chalk.blue(`"${quote.trim()}"`));
      console.log(chalk.green(`- ${author.trim()}`));
    } catch (error) {
      console.error(chalk.red("Error reading the quotes file:"), error.message);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quotes file")
  .action(async (quote, author = "Anonymous") => {
    if (!quote) {
      console.error(chalk.red("Quote cannot be empty."));
      return;
    }

    try {
      const newQuote = `${quote}|${author}\n`;
      await fs.appendFile(QUOTE_FILE, newQuote);
      console.log(chalk.green("Quote added successfully!"));
    } catch (error) {
      console.error(chalk.red("Error adding the quote:"), error.message);
    }
  });

program.parse(process.argv);



