import { describe, expect, it } from 'vitest';
import { drop } from '../drop';

describe('drop', () => {
  it('should drop the specified number of elements from the beginning', () => {
    const input = [1, 2, 3, 4, 5];
    expect(drop(input, 2)).toEqual([3, 4, 5]);
  });

  it('should return empty array when dropping all elements', () => {
    const input = [1, 2, 3];
    expect(drop(input, 3)).toEqual([]);
  });

  it('should return empty array when dropping more than array length', () => {
    const input = [1, 2, 3];
    expect(drop(input, 5)).toEqual([]);
  });

  it('should handle empty array', () => {
    expect(drop([], 2)).toEqual([]);
  });

  it('should return same array when dropping 0 elements', () => {
    const input = [1, 2, 3];
    expect(drop(input, 0)).toEqual([1, 2, 3]);
  });

  it('should handle negative drop count as 0', () => {
    const input = [1, 2, 3];
    expect(drop(input, -2)).toEqual([1, 2, 3]);
  });

  it('should work with array of different types', () => {
    const input = ['a', 'b', 'c', 'd'];
    expect(drop(input, 2)).toEqual(['c', 'd']);
  });

  it('should work with array of objects', () => {
    const input = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
    ];
    expect(drop(input, 1)).toEqual([
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
    ]);
  });
});
