import { describe, expect, it } from 'vitest';
import { isRegExp } from '../isRegExp';

describe('isRegExp', () => {
  it('should return true for RegExp instances', () => {
    expect(isRegExp(/abc/)).toBe(true);
    // eslint-disable-next-line prefer-regex-literals
    expect(isRegExp(new RegExp('abc'))).toBe(true);
    // eslint-disable-next-line prefer-regex-literals
    expect(isRegExp(new RegExp('abc', 'g'))).toBe(true);
    expect(isRegExp(/abc/gi)).toBe(true);
  });

  it('should return false for non-RegExp values', () => {
    expect(isRegExp('/abc/')).toBe(false);
    expect(isRegExp('abc')).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(42)).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(() => {})).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(new Error())).toBe(false);
  });
});
