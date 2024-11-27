import { describe, expect, it } from 'vitest';
import { isObject } from '../isObject';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(function () {})).toBe(true);
    expect(isObject(Object)).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject('abc')).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(Number.NaN)).toBe(false);
    expect(isObject(Infinity)).toBe(false);
    expect(isObject(Symbol('test'))).toBe(false);
  });
});
