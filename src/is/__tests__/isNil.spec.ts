import { describe, expect, it } from 'vitest';
import { isNil } from '../isNil';

describe('isNil', () => {
  it('should return true for null and undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(void 0)).toBe(true);
  });

  it('should return false for non-null/undefined values', () => {
    expect(isNil(false)).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(Number.NaN)).toBe(false);
    expect(isNil([])).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(() => {})).toBe(false);
    expect(isNil(new Date())).toBe(false);
    expect(isNil(new Map())).toBe(false);
    expect(isNil(new Set())).toBe(false);
  });
});
