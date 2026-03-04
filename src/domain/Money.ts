export class Money {
  constructor(private readonly amount: number) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
  }

  add(other: Money): Money {
    return new Money(this.amount + other.amount);
  }

  subtract(other: Money): Money {
    if (this.amount < other.amount) {
      throw new Error("Insufficient funds");
    }
    return new Money(this.amount - other.amount);
  }

  getValue(): number {
    return this.amount;
  }
}
