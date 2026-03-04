import * as fs from "fs";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npm start <balances.csv> <transfers.csv>");
    process.exit(1);
  }
  const [balancesFile, transfersFile] = args;

  try {
    console.log(`Loading accounts from ${balancesFile}...`);

    if (!fs.existsSync(balancesFile)) {
      throw new Error(`File not found: ${balancesFile}`);
    }
    if (!fs.existsSync(transfersFile)) {
      throw new Error(`File not found: ${balancesFile}`);
    }
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
