import { describe, expect, it } from 'vitest';
import { isNull } from '../isNull';

describe('isNull', () => {
  it('should return true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(void 0)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(Number.NaN)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull(() => {})).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(new Map())).toBe(false);
    expect(isNull(new Set())).toBe(false);
  });
});
