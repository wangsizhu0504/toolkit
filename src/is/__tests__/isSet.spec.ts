import { describe, expect, it } from 'vitest';
import { isSet } from '../isSet';

describe('isSet', () => {
  it('should return true for Set instances', () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
    expect(isSet(new Set(['a', 'b', 'c']))).toBe(true);
  });

  it('should return false for non-Set values', () => {
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet(new Map())).toBe(false);
    expect(isSet(new WeakMap())).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);
    expect(isSet(42)).toBe(false);
    expect(isSet('set')).toBe(false);
    expect(isSet(true)).toBe(false);
    expect(isSet(() => {})).toBe(false);
    expect(isSet(new Date())).toBe(false);
  });
});
