import { isValidNumberString } from "../../../src/utils/validators/isValidNumberString";
describe("isValidNumberString", () => {
  it("return true if number string", () => {
    expect(isValidNumberString("100.00")).toBe(true);
  });

  it("return false if invalid Account number", () => {
    expect(isValidNumberString("invalid-number-string")).toBe(false);
  });
});
