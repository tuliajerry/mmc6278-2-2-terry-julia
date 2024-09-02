const { program } = require("commander");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const QUOTE_FILE = path.join(__dirname, "quotes.txt");

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      console.log("Executing getQuote command...");
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const lines = data.trim().split("\n").filter(Boolean);
      console.log(`Read ${lines.length} quotes from file.`);
      if (lines.length === 0) {
        console.log(chalk.red("No quotes available."));
        return;
      }
      const randomIndex = Math.floor(Math.random() * lines.length);
      const [quote, author] = lines[randomIndex].split("|");
      console.log(chalk.green(quote.trim()));
      if (author) {
        console.log(chalk.blue(`- ${author.trim()}`));
      } else {
        console.log(chalk.blue(`- Anonymous`));
      }
    } catch (error) {
      console.error(chalk.red("Error reading quotes file:", error.message));
      process.exit(1);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      console.log("Executing addQuote command...");
      if (!quote) {
        console.error(chalk.red("Error: No quote provided."));
        process.exit(1);
      }
      const formattedAuthor = author ? author.trim() : "Anonymous";
      const line = `${quote.trim()}|${formattedAuthor}\n`;
      await fs.appendFile(QUOTE_FILE, line);
      console.log(chalk.green("Quote added successfully."));
    } catch (error) {
      console.error(chalk.red("Error writing to quotes file:", error.message));
      process.exit(1);
    }
  });

program.parse();
