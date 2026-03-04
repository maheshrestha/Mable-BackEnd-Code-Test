import { AccountRepository } from "../../src/repository/AccountRepository";
import { Account } from "../../src/domain/Account";
import { Money } from "../../src/domain/Money";
import { TransferService } from "../../src/service/TransferService";

describe("TranserService", () => {
  let accountRepo: AccountRepository = new AccountRepository();
  let service: TransferService;

  beforeEach(() => {
    service = new TransferService(accountRepo);
  });

  it("processes a successful transfer", () => {
    const from = new Account("1111222233334444", new Money(1000));
    const to = new Account("9999888877776666", new Money(200));
    accountRepo.save(from);
    accountRepo.save(to);
    const transferProcess = service.process(
      "1111222233334444",
      "9999888877776666",
      100,
    );

    expect(transferProcess).toEqual({
      fromAccountNumber: "1111222233334444",
      toAccountNumber: "9999888877776666",
      amount: 100,
      status: "SUCCESS",
      error: undefined,
    });
    expect(from.getBalance().getValue()).toBe(900);
    expect(to.getBalance().getValue()).toBe(300);
  });

  it("processes a successful transfer", () => {
    const from = new Account("1111222233334444", new Money(1000));
    const to = new Account("9999888877776666", new Money(200));
    accountRepo.save(from);
    accountRepo.save(to);
    const transferProcess = service.process(
      "1111222233334444",
      "9999888877776666",
      1001,
    );

    expect(transferProcess).toMatchObject({
      error: "Insufficient funds",
      status: "FAILED",
    });
    expect(from.getBalance().getValue()).toBe(1000);
    expect(to.getBalance().getValue()).toBe(200);
  });
});
