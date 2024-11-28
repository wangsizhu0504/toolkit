import { describe, expect, it } from 'vitest';
import { pick } from '../pick';

describe('pick', () => {
  it('should pick specified properties from an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, [])).toEqual({});
  });

  it('should handle picking all properties', () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  });

  it('should handle non-existent properties', () => {
    const obj = { a: 1, b: 2 };
    // @ts-expect-error Testing runtime behavior with invalid key
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1 });
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
    expect(pick(obj, ['str', 'num', 'arr'])).toEqual({
      str: 'string',
      num: 42,
      arr: [1, 2, 3],
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
    expect(pick(obj, ['parentProp', 'childProp'])).toEqual({
      parentProp: 'parent',
      childProp: 'child',
    });
  });

  it('should handle symbol properties', () => {
    const sym = Symbol('test');
    const obj = {
      [sym]: 'symbol value',
      regular: 'regular value',
    };
    expect(pick(obj, [sym as any])).toEqual({
      [sym]: 'symbol value',
    });
  });

  it('should handle properties with undefined values', () => {
    const obj = { a: undefined, b: 2 };
    expect(pick(obj, ['a', 'b'])).toEqual({ a: undefined, b: 2 });
  });

  it('should maintain property order', () => {
    const obj = { d: 4, b: 2, a: 1, c: 3 };
    expect(Object.keys(pick(obj, ['a', 'b', 'c']))).toEqual(['a', 'b', 'c']);
  });

  it('should handle duplicate keys in the keys array', () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ['a', 'a', 'b'])).toEqual({ a: 1, b: 2 });
  });
});
