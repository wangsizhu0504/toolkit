import { describe, expect, it } from 'vitest';
import { isWeakSet } from '../isWeakSet';

describe('isWeakSet', () => {
  it('should return true for WeakSet instances', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
    const weakSet = new WeakSet();
    const obj = {};
    weakSet.add(obj);
    expect(isWeakSet(weakSet)).toBe(true);
  });

  it('should return false for non-WeakSet values', () => {
    expect(isWeakSet(new Set())).toBe(false);
    expect(isWeakSet(new Map())).toBe(false);
    expect(isWeakSet(new WeakMap())).toBe(false);
    expect(isWeakSet({})).toBe(false);
    expect(isWeakSet([])).toBe(false);
    expect(isWeakSet(null)).toBe(false);
    expect(isWeakSet(undefined)).toBe(false);
    expect(isWeakSet(42)).toBe(false);
    expect(isWeakSet('weakset')).toBe(false);
    expect(isWeakSet(true)).toBe(false);
    expect(isWeakSet(() => {})).toBe(false);
    expect(isWeakSet(new Date())).toBe(false);
    expect(isWeakSet(Symbol())).toBe(false);
  });
});
