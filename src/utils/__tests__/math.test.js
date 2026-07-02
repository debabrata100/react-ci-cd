import { describe, it, expect } from "vitest";
import { add, divide, subtract } from "../math";

describe("add test goes here", () => {
  it("should add two numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});

describe("Subtracts tests goes here", () => {
  it("should substract and return the result", () => {
    const result = subtract(10, 5);
    expect(result).toBe(5);
  });
});

describe("divide tests goes here", () => {
  it("should divide two numbers and return the result", () => {
    const result = divide(10, 2);
    expect(result).toBe(5);
  });
  it("should throw error when diving by zero", () => {
    const divideByZero = () => divide(10, 0);
    expect(divideByZero).toThrowError("Cannot divide by zero");
  });
});
