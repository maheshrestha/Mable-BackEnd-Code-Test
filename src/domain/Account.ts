import { isValidAccountNumber } from "../utils/validators/isValidAccountNumber";
import { Money } from "./Money";

export class Account {
  constructor(
    private readonly accountNumber: string,
    private balance: Money,
  ) {
    if (!isValidAccountNumber(accountNumber)) {
      throw new Error("Invalid account number");
    }
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getBalance(): Money {
    return this.balance;
  }

  debit(amount: Money): void {
    this.balance = this.balance.subtract(amount);
  }

  credit(amount: Money): void {
    this.balance = this.balance.add(amount);
  }
}
