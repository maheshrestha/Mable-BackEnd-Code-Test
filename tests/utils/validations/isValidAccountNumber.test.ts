import { isValidAccountNumber } from "../../../src/utils/validators/isValidAccountNumber";

describe("isValidAccountNumber", () => {
  it("return true if valid Account number", () => {
    expect(isValidAccountNumber("1111222233334444")).toBe(true);
  });

  it("return false if invalid Account number", () => {
    expect(isValidAccountNumber("invalid-account")).toBe(false);
  });
});
