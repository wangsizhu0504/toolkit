import { describe, expect, it } from 'vitest';
import { uniqBy } from '../uniqBy';

describe('uniqBy', () => {
  it('should remove duplicates based on mapper function for numbers', () => {
    const input = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
    expect(uniqBy(input, Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });

  it('should remove duplicates based on object property', () => {
    const input = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ];
    const result = uniqBy(input, item => item.category);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { category: 'fruit', name: 'apple' },
      { category: 'vegetable', name: 'carrot' },
    ]);
  });

  it('should handle empty array', () => {
    expect(uniqBy([], x => x)).toEqual([]);
  });

  it('should handle array with no duplicates after mapping', () => {
    const input = ['a1', 'b2', 'c3'];
    expect(uniqBy(input, x => x[0])).toEqual(['a1', 'b2', 'c3']);
  });

  it('should keep first occurrence when duplicates exist', () => {
    const input = ['one', 'two', 'three', 'four'];
    expect(uniqBy(input, str => str.length)).toEqual(['one', 'three', 'four']);
  });

  it('should handle complex mapper function', () => {
    const input = [
      { id: 1, data: { type: 'A' } },
      { id: 2, data: { type: 'A' } },
      { id: 3, data: { type: 'B' } },
    ];
    const result = uniqBy(input, item => item.data.type);
    expect(result).toEqual([
      { id: 1, data: { type: 'A' } },
      { id: 3, data: { type: 'B' } },
    ]);
  });
});
