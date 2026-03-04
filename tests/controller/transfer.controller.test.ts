import * as fs from "fs";
import * as path from "path";
import TransferController from "../../src/controller/transfer.controller";
import { TransferService } from "../../src/service/TransferService";
import { AccountRepository } from "../../src/repository/AccountRepository";
import { Account } from "../../src/domain/Account";
import { Money } from "../../src/domain/Money";

describe("TransferController", () => {
  let controller: TransferController;
  let transferService: TransferService;
  let accountRepository: AccountRepository;
  const testFixturesDir = path.join(__dirname, "../../tests/fixtures");

  beforeEach(() => {
    accountRepository = new AccountRepository();
    transferService = new TransferService(accountRepository);
    controller = new TransferController(transferService);

    // Set up test accounts
    const account1 = new Account("1111222233334444", new Money(10000));
    const account2 = new Account("9999888877776666", new Money(5000));
    const account3 = new Account("1111234522226789", new Money(8000));
    const account4 = new Account("1212343433335665", new Money(3000));

    accountRepository.save(account1);
    accountRepository.save(account2);
    accountRepository.save(account3);
    accountRepository.save(account4);
  });

  it("throws error when file does not exist", async () => {
    const nonExistentFile = "no-file";

    await expect(controller.processTransfers(nonExistentFile)).rejects.toThrow(
      `File not found: ${nonExistentFile}`,
    );
  });

  it("successfully processes a valid transfer from CSV file", async () => {
    const transfersResults = await controller.processTransfers(
      path.join(testFixturesDir, "mable_transactions.csv"),
    );

    expect(transfersResults).toBeDefined();
    expect(Array.isArray(transfersResults)).toBe(true);
    expect(transfersResults.length).toBe(4);

    // First transfer should succeed
    expect(transfersResults.map((r) => r.status === "SUCCESS").length).toBe(4);
  });

  it("handles account not found error from service", async () => {
    const testFile = path.join(testFixturesDir, "invalid_from.csv");
    const transfersResults = await controller.processTransfers(testFile);

    expect(transfersResults[0].error).toMatch(/Account not found/);
    expect(transfersResults[0].status).toBe("FAILED");
  });

  it("handles account not found error from service", async () => {
    const testFile = path.join(testFixturesDir, "invalid_to.csv");
    const transfersResults = await controller.processTransfers(testFile);

    expect(transfersResults[0].error).toMatch(/Account not found/);
    expect(transfersResults[0].status).toBe("FAILED");
  });

  it("handles invalid amount", async () => {
    const testFile = path.join(testFixturesDir, "invalid_amount.csv");
    const transfersResults = await controller.processTransfers(testFile);

    expect(transfersResults[0].error).toMatch(/Amount must be positive/);
    expect(transfersResults[0].status).toBe("FAILED");
    expect(transfersResults[1].error).toMatch(/Invalid amount/);
    expect(transfersResults[0].status).toBe("FAILED");
  });
});
