import { describe, expect, it } from 'vitest';
import { range } from '../range';

describe('range', () => {
  it('should create a range from 0 to end when only one argument is provided', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(1)).toEqual([0]);
    expect(range(0)).toEqual([]);
  });

  it('should create a range from start to end when two arguments are provided', () => {
    expect(range(1, 4)).toEqual([1, 2, 3]);
    expect(range(0, 3)).toEqual([0, 1, 2]);
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1]);
  });

  it('should create a range with custom step when three arguments are provided', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(range(0, 5, 3)).toEqual([0, 3]);
    expect(range(1, 10, 3)).toEqual([1, 4, 7]);
  });

  it('should handle negative steps', () => {
    expect(range(3, -3, -1)).toEqual([3, 2, 1, 0, -1, -2]);
    expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2]);
    expect(range(0, -10, -3)).toEqual([0, -3, -6, -9]);
  });

  it('should return empty array when no elements fit in range', () => {
    expect(range(0, 0)).toEqual([]);
    expect(range(5, 5)).toEqual([]);
    expect(range(3, 1)).toEqual([]);
    expect(range(0, 10, -1)).toEqual([]);
  });

  it('should throw error for non-integer or zero step values', () => {
    expect(() => range(0, 5, 0)).toThrow('The step value must be a non-zero integer.');
    expect(() => range(0, 5, 1.5)).toThrow('The step value must be a non-zero integer.');
    expect(() => range(0, 5, -1.5)).toThrow('The step value must be a non-zero integer.');
  });

  it('should handle large ranges', () => {
    const result = range(0, 1000, 100);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(900);
  });

  it('should handle floating point start and end values', () => {
    expect(range(1.5, 4.5)).toEqual([1.5, 2.5, 3.5]);
    expect(range(0.5, 3.5, 2)).toEqual([0.5, 2.5]);
  });

  it('should handle negative ranges with positive steps', () => {
    expect(range(-5, -2)).toEqual([-5, -4, -3]);
    expect(range(-6, -2, 2)).toEqual([-6, -4]);
  });

  it('should handle edge cases with steps', () => {
    expect(range(0, 5, 10)).toEqual([0]);
    expect(range(0, -5, -10)).toEqual([0]);
  });
});
