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
      const quotes = await fs.readFile(QUOTE_FILE, "utf8");
      const quotesArray = quotes.trim().split('\n').filter(line => line.trim() !== '');
      if (quotesArray.length === 0) {
        console.log(chalk.yellow("No quotes available."));
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      const [quote, author] = quotesArray[randomIndex].split('|');
      console.log(chalk.cyan(quote));
      console.log(chalk.green(`- ${author || "Anonymous"}`));
    } catch (error) {
      console.error(chalk.red("Error reading quotes file"), error);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      const authorName = author || "Anonymous";
      await fs.appendFile(QUOTE_FILE, `${quote}|${authorName}\n`);
      console.log(chalk.green("Quote added successfully."));
    } catch (error) {
      console.error(chalk.red("Error adding quote"), error);
    }
  });

program.parse();


program.parse();

