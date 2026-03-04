import { Money } from "../../src/domain/Money";

describe("Money", () => {
  it("constructs with positive amount and returns value", () => {
    const m = new Money(100);
    expect(m.getValue()).toBe(100);
  });

  it("throws for zero or negative amounts", () => {
    expect(() => new Money(0)).toThrow(/Amount must be positive/);
    expect(() => new Money(-10)).toThrow(/Amount must be positive/);
  });

  it("subtracts balance when enough funds", () => {
    const a = new Money(200);
    const b = new Money(75);
    const c = a.subtract(b);
    expect(c.getValue()).toBe(125);
  });

  it("should adds balance", () => {
    const a = new Money(200);
    const b = new Money(75);
    const c = a.add(b);
    expect(c.getValue()).toBe(275);
  });

  it("throws when subtracting more than available", () => {
    expect(() => new Money(50).subtract(new Money(60))).toThrow(
      /Insufficient funds/,
    );
  });
});
