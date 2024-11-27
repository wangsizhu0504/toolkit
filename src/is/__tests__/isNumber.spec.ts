import { describe, expect, it } from 'vitest';
import { isNumber } from '../isNumber';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1.23)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(true);
    // eslint-disable-next-line no-new-wrappers
    expect(isNumber(new Number(123))).toBe(true);
  });

  it('should return false for non-number values', () => {
    expect(isNumber()).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber('123')).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(new Date())).toBe(false);
  });
});
