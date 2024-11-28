import { describe, expect, it } from 'vitest';
import { sum } from '../sum';

describe('sum', () => {
  it('should calculate sum of positive numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
    expect(sum([10, 20, 30])).toBe(60);
    expect(sum([1])).toBe(1);
  });

  it('should calculate sum of negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6);
    expect(sum([-10, -20])).toBe(-30);
  });

  it('should calculate sum of mixed positive and negative numbers', () => {
    expect(sum([-1, 1, -2, 2])).toBe(0);
    expect(sum([-5, 10, -15, 20])).toBe(10);
  });

  it('should handle empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should handle array with zero', () => {
    expect(sum([0])).toBe(0);
    expect(sum([0, 0, 0])).toBe(0);
    expect(sum([-1, 0, 1])).toBe(0);
  });

  it('should handle decimal numbers', () => {
    expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
    expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
  });

  it('should handle large numbers', () => {
    expect(sum([1e6, 2e6, 3e6])).toBe(6e6);
    expect(sum([Number.MAX_SAFE_INTEGER, 1])).toBe(Number.MAX_SAFE_INTEGER + 1);
  });

  it('should handle arrays with one element', () => {
    expect(sum([5])).toBe(5);
    expect(sum([-3])).toBe(-3);
    expect(sum([0])).toBe(0);
  });

  it('should maintain precision for decimal calculations', () => {
    expect(sum([0.1, 0.2])).toBeCloseTo(0.3);
    expect(sum([0.1, 0.1, 0.1])).toBeCloseTo(0.3);
  });

  it('should handle readonly arrays', () => {
    const readonlyArray: readonly number[] = [1, 2, 3] as const;
    expect(sum(readonlyArray)).toBe(6);
  });
});
