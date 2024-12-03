import { describe, expect, it } from 'vitest';
import { uniq } from '../uniq';

describe('uniq', () => {
  it('should remove duplicates from array of numbers', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    expect(uniq(input)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should remove duplicates from array of strings', () => {
    const input = ['a', 'b', 'b', 'c', 'a'];
    expect(uniq(input)).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty array', () => {
    expect(uniq([])).toEqual([]);
  });

  it('should handle array with no duplicates', () => {
    const input = [1, 2, 3, 4, 5];
    expect(uniq(input)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle array with all duplicate values', () => {
    const input = [1, 1, 1, 1];
    expect(uniq(input)).toEqual([1]);
  });

  it('should preserve the order of first occurrence', () => {
    const input = ['b', 'a', 'c', 'b', 'a'];
    expect(uniq(input)).toEqual(['b', 'a', 'c']);
  });
});
