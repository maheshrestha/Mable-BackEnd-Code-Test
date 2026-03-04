import { Account } from "../../src/domain/Account";
import { Money } from "../../src/domain/Money";

describe("Account", () => {
  const validAccount = "1234567890123456";

  it("constructs with a valid account number and returns account number", () => {
    const account = new Account(validAccount, new Money(10000));
    expect(account.getAccountNumber()).toBe(validAccount);
  });

  it("throws for invalid account number", () => {
    expect(() => new Account("123", new Money(100))).toThrow(
      /Invalid account number/,
    );
  });

  it("returns the correct balance", () => {
    const account = new Account(validAccount, new Money(500));
    expect(account.getBalance().getValue()).toBe(500);
  });

  it("debits amount from balance", () => {
    const account = new Account(validAccount, new Money(1000));
    account.debit(new Money(300));
    expect(account.getBalance().getValue()).toBe(700);
  });

  it("throws when debiting more than balance", () => {
    const account = new Account(validAccount, new Money(200));
    expect(() => account.debit(new Money(300))).toThrow(/Insufficient funds/);
  });

  it("credits amount to balance", () => {
    const account = new Account(validAccount, new Money(400));
    account.credit(new Money(150));
    expect(account.getBalance().getValue()).toBe(550);
  });
});
