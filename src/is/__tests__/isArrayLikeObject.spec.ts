import { describe, expect, it } from 'vitest';
import { isArrayLikeObject } from '../isArrayLikeObject';

describe('isArrayLikeObject', () => {
  it('should return true for array-like objects', () => {
    expect(isArrayLikeObject([1, 2, 3])).toBe(true);
    expect(isArrayLikeObject({ 0: 'a', length: 1 })).toBe(true);
    const arrayLike = { 0: 'a', 1: 'b', length: 2 };
    expect(isArrayLikeObject(arrayLike)).toBe(true);
    expect(isArrayLikeObject(new Array(3))).toBe(true);

    // Arguments object (simulated since we can't create real one in module scope)
    const args = { 0: 'a', 1: 'b', length: 2, callee: () => {} };
    expect(isArrayLikeObject(args)).toBe(true);
  });

  it('should return false for non-array-like objects and primitives', () => {
    expect(isArrayLikeObject('abc')).toBe(false); // string is array-like but primitive
    expect(isArrayLikeObject(123)).toBe(false);
    expect(isArrayLikeObject(true)).toBe(false);
    expect(isArrayLikeObject(null)).toBe(false);
    expect(isArrayLikeObject(undefined)).toBe(false);
    expect(isArrayLikeObject(() => {})).toBe(false);
    expect(isArrayLikeObject({})).toBe(false);
    expect(isArrayLikeObject({ length: 'invalid' })).toBe(false);
    expect(isArrayLikeObject({ length: -1 })).toBe(false);
    expect(isArrayLikeObject(new Map())).toBe(false);
    expect(isArrayLikeObject(new Set())).toBe(false);
    expect(isArrayLikeObject(Symbol())).toBe(false);
  });

  it('should handle edge cases for length property', () => {
    expect(isArrayLikeObject({ length: 0 })).toBe(true);
    expect(isArrayLikeObject({ length: Number.MAX_SAFE_INTEGER })).toBe(true);
    expect(isArrayLikeObject({ length: '0' })).toBe(false);
    expect(isArrayLikeObject({ length: Number.NaN })).toBe(false);
    expect(isArrayLikeObject({ length: Infinity })).toBe(false);
    expect(isArrayLikeObject({ length: -Infinity })).toBe(false);
    expect(isArrayLikeObject({ length: 1.5 })).toBe(false);
  });
});
