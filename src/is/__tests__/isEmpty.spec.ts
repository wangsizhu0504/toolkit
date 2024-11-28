import { describe, expect, it } from 'vitest';
import { isEmpty } from '../isEmpty';

describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(Number.NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty()).toBe(true);

    expect(isEmpty(Buffer.alloc(0))).toBe(true);
    expect(isEmpty(Buffer.alloc(1))).toBe(false);
  });

  it('should return `false` for non-empty values', () => {
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 0 })).toBe(false);
    expect(isEmpty('a')).toBe(false);
  });

  it('should work with an object that has a `length` property', () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });

  it('should work with `arguments` objects', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('should work with prototype objects', () => {
    function Foo() {}
    Foo.prototype = { constructor: Foo };

    expect(isEmpty(Foo.prototype)).toBe(true);

    Foo.prototype.a = 1;
    expect(isEmpty(Foo.prototype)).toBe(false);
  });

  it('should work with jQuery/MooTools DOM query collections', () => {
    function Foo(this: any, elements: any) {
      Array.prototype.push.apply(this, elements);
    }
    Foo.prototype = { length: 0, splice: Array.prototype.splice };

    // @ts-expect-error
    expect(isEmpty(new Foo([]))).toBe(true);
  });

  it('should work with maps', () => {
    [new Map()].forEach((map) => {
      expect(isEmpty(map)).toBe(true);
      map.set('a', 1);
      expect(isEmpty(map)).toBe(false);
      map.clear();
    });
  });

  it('should work with sets', () => {
    [new Set()].forEach((set) => {
      expect(isEmpty(set)).toBe(true);
      set.add(1);
      expect(isEmpty(set)).toBe(false);
      set.clear();
    });
  });

  it('should not treat objects with negative lengths as array-like', () => {
    function Foo() {}
    Foo.prototype.length = -1;

    // @ts-expect-error
    expect(isEmpty(new Foo())).toBe(true);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    function Foo() {}
    Foo.prototype.length = Number.MAX_SAFE_INTEGER + 1;

    // @ts-expect-error
    expect(isEmpty(new Foo())).toBe(true);
  });

  it('should not treat objects with non-number lengths as array-like', () => {
    expect(isEmpty({ length: '0' })).toBe(false);
  });

  it('should return `true` for objects with only enumerable symbol properties', () => {
    const value = { [Symbol('a')]: 1 };
    expect(isEmpty(value)).toBe(true);

    function Foo() {}
    Foo.prototype = { constructor: Foo, [Symbol('a')]: 1 };
    expect(isEmpty(Foo.prototype)).toBe(true);
  });
});
