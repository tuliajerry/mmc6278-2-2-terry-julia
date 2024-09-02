const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

const getQuote = async () => {
  try {
    console.log('Reading quotes from file...');
    const fileContent = await fs.readFile(QUOTE_FILE, "utf-8");
    console.log('File content:', fileContent);
    
    const quotes = fileContent.trim().split('\n').filter(line => line.trim() !== '');
    if (quotes.length === 0) {
      console.log(chalk.red("No quotes found."));
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const [quote, author] = quotes[randomIndex].split('|');
    console.log(chalk.green(`"${quote.trim()}" - ${author.trim()}`));
  } catch (error) {
    console.error(chalk.red("Error reading quotes file:"), error.message);
  }
};

const addQuote = async (quote, author) => {
  if (!quote) {
    console.error(chalk.red("Error: No quote provided."));
    throw new Error("No quote provided.");
  }

  try {
    const formattedAuthor = author || "Anonymous";
    const formattedQuote = `${quote.trim()} | ${formattedAuthor.trim()}\n`;
    console.log('Adding quote:', formattedQuote);
    await fs.appendFile(QUOTE_FILE, formattedQuote);
    console.log(chalk.blue("Quote added successfully."));
  } catch (error) {
    console.error(chalk.red("Error adding quote:"), error.message);
  }
};

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(getQuote);

program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quote file")
  .action(addQuote);

program.parse();

