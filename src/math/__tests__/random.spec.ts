import { describe, expect, it } from 'vitest';
import { random } from '../random';

describe('random', () => {
  it('should generate a random number between 0 and maximum when only one argument is provided', () => {
    const max = 10;
    const result = random(max);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
  });

  it('should generate a random number between minimum and maximum', () => {
    const min = 5;
    const max = 10;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  });

  it('should throw an error when maximum is less than or equal to minimum', () => {
    expect(() => random(5, 3)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
    expect(() => random(5, 5)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
  });

  it('should throw an error when maximum is less than or equal to 0 in single argument form', () => {
    expect(() => random(0)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
    expect(() => random(-5)).toThrow('Invalid input: The maximum value must be greater than the minimum value.');
  });

  it('should generate numbers with decimal places', () => {
    const result = random(0, 1);
    expect(result % 1).not.toBe(0); // Check if the number has decimal places
  });

  it('should generate different numbers on subsequent calls', () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(random(0, 1000));
    }
    // With range 0-1000 and 100 samples, we expect most numbers to be unique
    expect(results.size).toBeGreaterThan(90);
  });

  it('should handle floating point minimum and maximum values', () => {
    const min = 1.5;
    const max = 2.5;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  });

  it('should handle negative ranges', () => {
    const min = -10;
    const max = -5;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
  });
});
