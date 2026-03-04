import * as fs from "fs";
import csvParser from "csv-parser";
import { TransferResult, TransferService } from "../service/TransferService";
import { finished } from "stream/promises";
import { isValidNumberString } from "../utils/validators/isValidNumberString";

class TransferController {
  constructor(private transferService: TransferService) {}

  async processTransfers(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const transfersResults: TransferResult[] = [];

    const transfersToProcess = fs
      .createReadStream(filePath)
      .pipe(csvParser(["fromAccountNumber", "toAccountNumber", "amount"]))
      .on("data", (transferToProcess) => {
        try {
          if (!isValidNumberString(transferToProcess.amount)) {
            throw new Error("Invalid amount: " + transferToProcess.amount);
          }
          const transferResult = this.transferService.process(
            transferToProcess.fromAccountNumber,
            transferToProcess.toAccountNumber,
            Number(transferToProcess.amount),
          );
          transfersResults.push(transferResult);
        } catch (error: any) {
          // skip invalid rows and continue processing
          transfersResults.push({
            fromAccountNumber: transferToProcess.fromAccountNumber,
            toAccountNumber: transferToProcess.toAccountNumber,
            amount: Number(transferToProcess.amount),
            status: "FAILED",
            error: error.message,
          });
        }
      });

    await finished(transfersToProcess);

    return transfersResults;
  }
}

export default TransferController;
