import { describe, expect, it } from 'vitest';
import { isWeakMap } from '../isWeakMap';

describe('isWeakMap', () => {
  it('should return true for WeakMap instances', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
    const weakMap = new WeakMap();
    const key = {};
    weakMap.set(key, 'value');
    expect(isWeakMap(weakMap)).toBe(true);
  });

  it('should return false for non-WeakMap values', () => {
    expect(isWeakMap(new Map())).toBe(false);
    expect(isWeakMap(new Set())).toBe(false);
    expect(isWeakMap(new WeakSet())).toBe(false);
    expect(isWeakMap({})).toBe(false);
    expect(isWeakMap([])).toBe(false);
    expect(isWeakMap(null)).toBe(false);
    expect(isWeakMap(undefined)).toBe(false);
    expect(isWeakMap(42)).toBe(false);
    expect(isWeakMap('weakmap')).toBe(false);
    expect(isWeakMap(true)).toBe(false);
    expect(isWeakMap(() => {})).toBe(false);
    expect(isWeakMap(new Date())).toBe(false);
  });
});
