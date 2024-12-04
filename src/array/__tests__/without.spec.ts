import { describe, expect, it } from 'vitest';
import { without } from '../without';

describe('without', () => {
  it('should remove specified values from an array', () => {
    expect(without([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 3, 5]);
    expect(without(['a', 'b', 'c', 'a'], 'a')).toEqual(['b', 'c']);
  });

  it('should handle multiple values to remove', () => {
    expect(without([1, 2, 3, 4, 5], 2, 3, 5)).toEqual([1, 4]);
    expect(without(['a', 'b', 'c', 'd'], 'a', 'c')).toEqual(['b', 'd']);
  });

  it('should handle arrays with no matching values', () => {
    expect(without([1, 2, 3], 4, 5)).toEqual([1, 2, 3]);
    expect(without(['a', 'b', 'c'], 'd', 'e')).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty arrays', () => {
    expect(without([], 1, 2)).toEqual([]);
  });

  it('should handle NaN values', () => {
    expect(without([1, Number.NaN, 2, Number.NaN, 3], Number.NaN)).toEqual([1, 2, 3]);
  });

  it('should handle mixed type arrays', () => {
    expect(without([1, 'a', true, null, undefined], 1, null)).toEqual(['a', true, undefined]);
  });

  it('should preserve original array', () => {
    const original = [1, 2, 3, 4, 5];
    without(original, 2, 4);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle object comparisons', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr = [obj1, obj2, { b: 2 }];
    expect(without(arr, obj1)).toEqual([obj2, { b: 2 }]);
  });
});
