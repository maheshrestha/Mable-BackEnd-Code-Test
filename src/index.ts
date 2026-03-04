import csvParser from "csv-parser";
import * as fs from "fs";
import { finished } from "stream/promises";
import { Account } from "./domain/Account";
import { Money } from "./domain/Money";
import { AccountRepository } from "./repository/AccountRepository";
import TransferController from "./controller/transfer.controller";
import { TransferService } from "./service/TransferService";
import { isValidNumberString } from "./utils/validators/isValidNumberString";

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

    const accountRepo = new AccountRepository();
    const accountRepoReport: {
      accountNumber: string;
      balance: string;
      status: string;
      error?: string;
    }[] = [];

    // Load Accounts into memory
    const stream = fs
      .createReadStream(balancesFile)
      .pipe(csvParser(["accountNumber", "balance"]))
      .on("data", (data) => {
        try {
          if (!isValidNumberString(data.balance)) {
            throw new Error("Invalid amount: " + data.balance);
          }
          accountRepo.save(
            new Account(data.accountNumber, new Money(Number(data.balance))),
          );
          accountRepoReport.push({
            accountNumber: data.accountNumber,
            balance: data.balance,
            status: "SUCCESS",
          });
        } catch (e: any) {
          // skip invalid rows and continue processing
          accountRepoReport.push({
            accountNumber: data.accountNumber,
            balance: data.balance,
            status: "FAILED",
            error: e.message,
          });
        }
      });
    await finished(stream);

    console.log("Load Accounts Report:");
    console.table(accountRepoReport);

    const transferController = new TransferController(
      new TransferService(accountRepo),
    );

    // Process Transfers and collect results
    const transfersResults =
      await transferController.processTransfers(transfersFile);
    console.log("Transfers Report:");
    console.table(transfersResults);

    console.log("Accounts After Transfers:");
    console.table(
      accountRepo.getAll().map((a) => ({
        account: a.getAccountNumber(),
        balance: a.getBalance().getValue(),
      })),
    );
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
