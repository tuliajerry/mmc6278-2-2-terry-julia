const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

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
      const quotes = data.trim().split("\n").filter(line => line);
      if (quotes.length === 0) {
        console.log(chalk.red("No quotes found."));
        return;
      }
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const [quote, author] = randomQuote.split("|");
      console.log(chalk.green(`"${quote.trim()}" - ${author.trim()}`));
    } catch (err) {
      console.error(chalk.red("Error reading quotes file."), err);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author = "Anonymous") => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const newQuote = `${quote.trim()}|${author.trim()}`;
      await fs.writeFile(QUOTE_FILE, data.trim() + "\n" + newQuote + "\n", "utf8");
      console.log(chalk.green("Quote added successfully."));
    } catch (err) {
      console.error(chalk.red("Error writing to quotes file."), err);
    }
  });

program.parse();



