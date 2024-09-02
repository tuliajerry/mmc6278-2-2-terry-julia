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
        console.log(chalk.red("No quotes available."));
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const [quote, author] = quotes[randomIndex].split("|");
      console.log(chalk.green(`"${quote.trim()}" — ${author.trim()}`));
    } catch (err) {
      console.error(chalk.red("Error reading quotes file."));
      console.error(err);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      if (!quote) {
        console.log(chalk.red("Quote is required."));
        return;
      }
      const authorName = author || "Anonymous";
      const formattedQuote = `${quote.trim()}|${authorName.trim()}\n`;
      await fs.appendFile(QUOTE_FILE, formattedQuote);
      console.log(chalk.green(`Quote added: "${quote.trim()}" — ${authorName.trim()}`));
    } catch (err) {
      console.error(chalk.red("Error writing to quotes file."));
      console.error(err);
    }
  });

program.parse();



