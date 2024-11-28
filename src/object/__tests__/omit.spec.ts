import { describe, expect, it } from 'vitest';
import { omit } from '../omit';

describe('omit', () => {
  it('should omit specified properties from an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b', 'c'])).toEqual({ a: 1 });
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, [])).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle omitting all properties', () => {
    const obj = { a: 1, b: 2 };
    expect(omit(obj, ['a', 'b'])).toEqual({});
  });

  it('should handle non-existent properties', () => {
    const obj = { a: 1, b: 2 };
    // @ts-expect-error Testing runtime behavior with invalid key
    expect(omit(obj, ['a', 'c'])).toEqual({ b: 2 });
  });

  it('should handle objects with various value types', () => {
    const obj = {
      str: 'string',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { key: 'value' },
      nil: null,
      undef: undefined,
    };
    expect(omit(obj, ['bool', 'nil', 'undef'])).toEqual({
      str: 'string',
      num: 42,
      arr: [1, 2, 3],
      obj: { key: 'value' },
    });
  });

  it('should handle inherited properties', () => {
    class Parent {
      parentProp = 'parent';
    }
    class Child extends Parent {
      childProp = 'child';
    }
    const obj = new Child();
    expect(omit(obj, ['parentProp'])).toEqual({
      childProp: 'child',
    });
  });

  it('should handle symbol properties', () => {
    const sym = Symbol('test');
    const obj = {
      [sym]: 'symbol value',
      regular: 'regular value',
    };
    expect(omit(obj, [sym as any])).toEqual({
      regular: 'regular value',
    });
  });

  it('should handle properties with undefined values', () => {
    const obj = { a: undefined, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: undefined, c: 3 });
  });

  it('should maintain remaining property order', () => {
    const obj = { d: 4, b: 2, a: 1, c: 3 };
    const result = omit(obj, ['b']);
    expect(Object.keys(result)).toEqual(['d', 'a', 'c']);
  });

  it('should handle duplicate keys in the keys array', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['a', 'a', 'b'])).toEqual({ c: 3 });
  });

  it('should not modify the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const original = { ...obj };
    omit(obj, ['b']);
    expect(obj).toEqual(original);
  });

  it('should handle nested objects', () => {
    const obj = {
      a: { x: 1, y: 2 },
      b: { z: 3 },
      c: 4,
    };
    expect(omit(obj, ['b'])).toEqual({
      a: { x: 1, y: 2 },
      c: 4,
    });
  });
});
