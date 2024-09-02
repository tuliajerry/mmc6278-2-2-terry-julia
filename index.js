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
      const data = await fs.readFile(QUOTE_FILE, "utf-8");
      const quotes = data.split("\n").filter(line => line.trim() !== "");
      if (quotes.length === 0) {
        console.log("No quotes available.");
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const [quote, author] = quotes[randomIndex].split("|");
      console.log(`${chalk.green(quote.trim())}`);
      console.log(`- ${author ? author.trim() : "Anonymous"}`);
    } catch (error) {
      console.error("Error reading quotes file:", error);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author = "Anonymous") => {
    try {
      const formattedQuote = `${quote} | ${author}`;
      await fs.appendFile(QUOTE_FILE, `${formattedQuote}\n`);
      console.log("Quote added successfully.");
    } catch (error) {
      console.error("Error adding quote to file:", error);
    }
  });

program.parse();
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
      const data = await fs.readFile(QUOTE_FILE, "utf-8");
      const quotes = data.split("\n").filter(line => line.trim() !== "");
      if (quotes.length === 0) {
        console.log("No quotes available.");
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const [quote, author] = quotes[randomIndex].split("|");
      console.log(`${chalk.green(quote.trim())}`);
      console.log(`- ${author ? author.trim() : "Anonymous"}`);
    } catch (error) {
      console.error("Error reading quotes file:", error);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author = "Anonymous") => {
    try {
      const formattedQuote = `${quote} | ${author}`;
      await fs.appendFile(QUOTE_FILE, `${formattedQuote}\n`);
      console.log("Quote added successfully.");
    } catch (error) {
      console.error("Error adding quote to file:", error);
    }
  });

program.parse();


program.parse();

