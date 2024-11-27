import { describe, expect, it } from 'vitest';
import { isString } from '../isString';

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('abc')).toBe(true);
    expect(isString(`template literal`)).toBe(true);
    expect(isString(String('abc'))).toBe(true);
    // Note: new String() creates a String object, not a primitive string
    // eslint-disable-next-line no-new-wrappers
    expect(isString(new String('abc'))).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(123)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(Number.NaN)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(/abc/)).toBe(false);
    expect(isString(Symbol('abc'))).toBe(false);
  });
});
