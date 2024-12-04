import { describe, expect, it } from 'vitest';
import { has } from '../has';

describe('has', () => {
  describe('basic object properties', () => {
    const obj = { a: 1, b: { c: 2 } };

    it('should return true for existing top-level properties', () => {
      expect(has(obj, 'a')).toBe(true);
    });

    it('should return false for non-existing top-level properties', () => {
      expect(has(obj, 'd')).toBe(false);
    });

    it('should return true for existing nested properties', () => {
      expect(has(obj, ['b', 'c'])).toBe(true);
    });

    it('should return false for non-existing nested properties', () => {
      expect(has(obj, ['b', 'd'])).toBe(false);
    });
  });

  describe('deep path strings', () => {
    const obj = { a: { b: { c: 3 } } };

    it('should handle dot notation paths', () => {
      expect(has(obj, 'a.b.c')).toBe(true);
      expect(has(obj, 'a.b.d')).toBe(false);
    });

    it('should handle array notation in path strings', () => {
      expect(has(obj, 'a["b"].c')).toBe(true);
      expect(has(obj, 'a["b"]["c"]')).toBe(true);
    });
  });

  describe('array handling', () => {
    const arr = [1, undefined, 3]; // sparse array

    it('should handle valid array indices', () => {
      expect(has(arr, 0)).toBe(true);
      expect(has(arr, 2)).toBe(true);
    });

    it('should handle sparse array indices', () => {
      expect(has(arr, 1)).toBe(true); // index exists but value is undefined
    });

    it('should return false for out of bounds indices', () => {
      expect(has(arr, 3)).toBe(false);
      expect(has(arr, -1)).toBe(false);
    });
  });

  describe('arguments object', () => {
    function testFunc() {
      expect(has(arguments, 0)).toBe(true);
      expect(has(arguments, 1)).toBe(true);
      expect(has(arguments, 2)).toBe(false);
    }

    it('should work with arguments object', () => {
      // @ts-expect-error
      testFunc(1, 2);
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined objects', () => {
      expect(has(null, 'a')).toBe(false);
      expect(has(undefined, 'a')).toBe(false);
    });

    it('should handle empty paths', () => {
      expect(has({}, [])).toBe(false);
      expect(has({ a: 1 }, [])).toBe(false);
    });

    it('should handle symbol properties', () => {
      const sym = Symbol('test');
      const obj = { [sym]: 1 };
      expect(has(obj, sym)).toBe(true);
    });

    it('should handle various property key types', () => {
      const obj = { 1: 'a' };
      expect(has(obj, 1)).toBe(true);
      expect(has(obj, '1')).toBe(true);
    });
  });
});
