import { describe, expect, it } from 'vitest';
import { isBoolean } from '../isBoolean';

describe('isBoolean', () => {
  it('returns true if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });
  it('should return `false` for non-booleans', () => {
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Error())).toBe(false);
    expect(isBoolean({ a: 1 })).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(/x/)).toBe(false);
    expect(isBoolean('a')).toBe(false);
  });
});
