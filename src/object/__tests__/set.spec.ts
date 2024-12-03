import { describe, expect, it } from 'vitest';
import { set } from '../set';

describe('set', () => {
  it('should set a value on an object', () => {
    interface Test {
      a: number;
    }
    const result = set<Test>({} as any, 'a', 1);
    expect(result).toEqual({ a: 1 });
  });

  it('should set a value on an object with nested path', () => {
    const result = set<{ a: { b: number } }>({} as any, 'a.b', 1);
    expect(result).toEqual({ a: { b: 1 } });
    const result2 = set<{ a: { b: { c: { d: number } } } }>({} as any, 'a.b.c.d', 1);
    expect(result2).toEqual({ a: { b: { c: { d: 1 } } } });
  });

  it('should set a value on an object with paths with arrays', () => {
    const result = set<{ a: { b: number } }>({} as any, ['a', 'b'], 1);
    expect(result).toEqual({ a: { b: 1 } });
  });

  // --------------------------------------------------------------------------------
  // array
  // --------------------------------------------------------------------------------
  it('should set a value on an array', () => {
    const result = set<number[]>([], 0, 1);
    expect(result).toEqual([1]);
    expect(result[0]).toEqual(1);
  });

  it('should set a value on an array with nested path', () => {
    const result = set<number[][][]>([], '0.0.0', 1);
    expect(result).toEqual([[[1]]]);
    expect(result[0][0][0]).toEqual(1);
    const arr = [1, 2, 3];
    set(arr, 1, 4);
    expect(arr).toEqual([1, 4, 3]);
    expect(arr[1]).toEqual(4);
  });

  // --------------------------------------------------------------------------------
  // object and array
  // --------------------------------------------------------------------------------
  it('should set a value on an object and array', () => {
    const result = set<Array<{ a: number }>>([], '0.a', 1);
    expect(result).toEqual([{ a: 1 }]);
    expect(result[0].a).toEqual(1);
  });
});
