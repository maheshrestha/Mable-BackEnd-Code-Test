import { Account } from "../../src/domain/Account";
import { Money } from "../../src/domain/Money";
import { Transfer } from "../../src/domain/Transfer";

describe("Transfer", () => {
  const acctA = "1111222233334444";
  const acctB = "9999888877776666";

  it("executes a transfer between two accounts", () => {
    const from = new Account(acctA, new Money(1000));
    const to = new Account(acctB, new Money(200));
    const t = new Transfer(from, to, new Money(300));
    t.execute();
    expect(from.getBalance().getValue()).toBe(700);
    expect(to.getBalance().getValue()).toBe(500);
  });

  it("throws when creating a transfer to the same account", () => {
    const a = new Account(acctA, new Money(100));
    expect(() => new Transfer(a, a, new Money(10))).toThrow(
      /Cannot transfer to the same account/,
    );
  });

  it("throws when executing transfer with insufficient funds", () => {
    const from = new Account(acctA, new Money(100));
    const to = new Account(acctB, new Money(50));
    const t = new Transfer(from, to, new Money(200));
    expect(() => t.execute()).toThrow(/Insufficient funds/);
  });
});
