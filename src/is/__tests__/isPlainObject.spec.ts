import { describe, expect, it } from 'vitest';
import { isPlainObject } from '../isPlainObject';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ key: 'value' })).toBe(true);
    expect(isPlainObject({ key: new Date() })).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject({ nested: { key: true } })).toBe(true);
    expect(isPlainObject(new Proxy({}, {}))).toBe(true);
    expect(isPlainObject({ [Symbol('tag')]: 'A' })).toBe(true);
  });

  it('should return false for non-plain objects', () => {
    class Test {}
    expect(isPlainObject(new Test())).toBe(false);
    expect(isPlainObject(10)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject('hello')).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Uint8Array([1]))).toBe(false);
    expect(isPlainObject(Promise.resolve({}))).toBe(false);
    expect(isPlainObject(Object.create({}))).toBe(false);
    expect(isPlainObject(new (class Cls {})())).toBe(false);
    expect(isPlainObject(globalThis)).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new WeakMap())).toBe(false);
    expect(isPlainObject(new WeakSet())).toBe(false);
  });
});
