import { AccountRepository } from "../repository/AccountRepository";
import { Money } from "../domain/Money";
import { Transfer } from "../domain/Transfer";

export type TransferRow = {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: string;
};

export type TransferResult = {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  status: "SUCCESS" | "FAILED";
  error?: string;
};

export class TransferService {
  constructor(private readonly accountRepository: AccountRepository) {}
  process(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
  ): TransferResult {
    try {
      const fromAccount =
        this.accountRepository.findByAccountNumber(fromAccountNumber);
      const toAccount =
        this.accountRepository.findByAccountNumber(toAccountNumber);

      const money = new Money(amount);

      const transfer = new Transfer(fromAccount, toAccount, money);

      transfer.execute();

      this.accountRepository.save(fromAccount);
      this.accountRepository.save(toAccount);
      return {
        fromAccountNumber,
        toAccountNumber,
        amount,
        status: "SUCCESS",
      };
    } catch (error: any) {
      // silently ignore errors and return failed status for the row
      return {
        fromAccountNumber,
        toAccountNumber,
        amount,
        status: "FAILED",
        error: error.message,
      };
    }
  }
}
