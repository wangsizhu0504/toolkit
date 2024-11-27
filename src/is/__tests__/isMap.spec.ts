import { describe, expect, it } from 'vitest';
import { isMap } from '../isMap';

describe('isMap', () => {
  it('should return true for Map instances', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['a', 1], ['b', 2]]))).toBe(true);
  });

  it('should return false for non-Map values', () => {
    expect(isMap(new Set())).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(42)).toBe(false);
    expect(isMap('map')).toBe(false);
    expect(isMap(true)).toBe(false);
    expect(isMap(() => {})).toBe(false);
  });
});
