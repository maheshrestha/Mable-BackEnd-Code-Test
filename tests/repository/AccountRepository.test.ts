import { AccountRepository } from "../../src/repository/AccountRepository";
import { Account } from "../../src/domain/Account";
import { Money } from "../../src/domain/Money";

describe("AccountRepository", () => {
  let repo: AccountRepository;

  beforeEach(() => {
    repo = new AccountRepository();
  });

  it("returns saved account by number", () => {
    const acc = new Account("1111222233334444", new Money(500));
    repo.save(acc);
    const found = repo.findByAccountNumber("1111222233334444");
    expect(found).toBe(acc);
  });

  it("throws when account not found", () => {
    expect(() => repo.findByAccountNumber("0000")).toThrow(/Account not found/);
  });

  it("getAll returns all stored accounts", () => {
    const a = new Account("1111222233334444", new Money(100));
    const b = new Account("5555666677778888", new Money(200));
    repo.save(a);
    repo.save(b);
    const all = repo.getAll();
    expect(all).toHaveLength(2);
    expect(all).toEqual(expect.arrayContaining([a, b]));
  });

  it("overwrites account when saving same number twice", () => {
    const a1 = new Account("1111222233334444", new Money(100));
    const a2 = new Account("1111222233334444", new Money(500));
    repo.save(a1);
    repo.save(a2);
    const retrieved = repo.findByAccountNumber("1111222233334444");
    expect(retrieved.getBalance().getValue()).toBe(500);
  });
});
