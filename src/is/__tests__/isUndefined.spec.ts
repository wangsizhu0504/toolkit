import { describe, expect, it } from 'vitest';
import { isUndefined } from '../isUndefined';

describe('isUndefined', () => {
  it('should return true for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(void 0)).toBe(true);
    let undef;
    expect(isUndefined(undef)).toBe(true);
  });

  it('should return false for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(Number.NaN)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Map())).toBe(false);
    expect(isUndefined(new Set())).toBe(false);
  });
});
