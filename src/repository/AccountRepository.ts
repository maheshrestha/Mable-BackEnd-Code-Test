import { Account } from "../domain/Account";

export class AccountRepository {
  private accounts: Map<string, Account> = new Map();

  constructor() {}

  findByAccountNumber(accountNumber: string): Account {
    const account = this.accounts.get(accountNumber);
    if (!account) {
      throw new Error(`Account not found: ${accountNumber}`);
    }
    return account;
  }

  save(account: Account): void {
    // If account already exists, we can choose to either update it or throw an error.
    // For simplicity, we'll just overwrite it here.
    this.accounts.set(account.getAccountNumber(), account);
  }

  getAll(): Account[] {
    return Array.from(this.accounts.values());
  }
}
