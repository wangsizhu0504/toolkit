import { describe, expect, it } from 'vitest';
import { randomInt } from '../randomInt';

describe('randomInt', () => {
  it('should generate an integer between 0 and maximum when only one argument is provided', () => {
    const max = 10;
    const result = randomInt(max);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should generate an integer between minimum and maximum', () => {
    const min = 5;
    const max = 10;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should throw an error when maximum is less than or equal to minimum', () => {
    expect(() => randomInt(5, 3)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
    expect(() => randomInt(5, 5)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
  });

  it('should throw an error when maximum is less than or equal to 0 in single argument form', () => {
    expect(() => randomInt(0)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
    expect(() => randomInt(-5)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
  });

  it('should generate different integers on subsequent calls', () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(randomInt(0, 10));
    }
    // With range 0-10 and 100 samples, we expect to see most possible values
    expect(results.size).toBeGreaterThan(8);
  });

  it('should handle small ranges', () => {
    const min = 1;
    const max = 3;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle negative ranges', () => {
    const min = -10;
    const max = -5;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should always return integers even with floating point input', () => {
    const min = 1.5;
    const max = 3.7;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(Math.floor(min));
    expect(result).toBeLessThan(Math.floor(max));
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle large ranges', () => {
    const min = 1000;
    const max = 2000;
    const result = randomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
    expect(Number.isInteger(result)).toBe(true);
  });
});
