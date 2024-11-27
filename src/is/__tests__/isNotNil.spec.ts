import { describe, expect, it } from 'vitest';
import { isNotNil } from '../isNotNil';

describe('isNotNil', () => {
  it('should return false for null and undefined', () => {
    expect(isNotNil(null)).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
    expect(isNotNil(void 0)).toBe(false);
  });

  it('should return true for non-null/undefined values', () => {
    expect(isNotNil(false)).toBe(true);
    expect(isNotNil(0)).toBe(true);
    expect(isNotNil('')).toBe(true);
    expect(isNotNil(Number.NaN)).toBe(true);
    expect(isNotNil([])).toBe(true);
    expect(isNotNil({})).toBe(true);
    expect(isNotNil(() => {})).toBe(true);
    expect(isNotNil(new Date())).toBe(true);
    expect(isNotNil(new Map())).toBe(true);
    expect(isNotNil(new Set())).toBe(true);
  });

  it('should work as type predicate in array filter', () => {
    const arr = [1, undefined, 3, null, 5];
    const result = arr.filter(isNotNil);
    expect(result).toEqual([1, 3, 5]);
  });
});
