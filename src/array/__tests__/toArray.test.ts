import { describe, expect, it } from 'vitest';
import { toArray } from '../toArray';

describe('toArray', () => {
  it('should return the same array if input is already an array', () => {
    const input = [1, 2, 3];
    expect(toArray(input)).toBe(input);
  });

  it('should convert a single value to an array', () => {
    expect(toArray(5)).toEqual([5]);
    expect(toArray('test')).toEqual(['test']);
    expect(toArray(null)).toEqual([null]);
    expect(toArray(undefined)).toEqual([undefined]);
  });

  it('should handle empty array', () => {
    const emptyArray: any[] = [];
    expect(toArray(emptyArray)).toBe(emptyArray);
  });

  it('should handle array of different types', () => {
    const mixedArray = [1, 'string', true, null];
    expect(toArray(mixedArray)).toBe(mixedArray);
  });
});
