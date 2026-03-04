export function isValidAccountNumber(accountNumber: string): boolean {
  return /^\d{16}$/.test(accountNumber);
}
