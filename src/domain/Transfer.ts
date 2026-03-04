import { Account } from "./Account";
import { Money } from "./Money";

export class Transfer {
  constructor(
    private readonly from: Account,
    private readonly to: Account,
    private readonly amount: Money,
  ) {
    if (from.getAccountNumber() === to.getAccountNumber()) {
      throw new Error("Cannot transfer to the same account");
    }
  }

  execute(): void {
    this.from.debit(this.amount);
    this.to.credit(this.amount);
  }
}
