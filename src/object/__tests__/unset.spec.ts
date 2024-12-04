import { describe, expect, it } from 'vitest';
import { unset } from '../unset';

describe('unset', () => {
  describe('basic property removal', () => {
    it('should remove top-level properties', () => {
      const obj = { a: 1, b: 2 };
      expect(unset(obj, 'a')).toBe(true);
      expect(obj).toEqual({ b: 2 });
    });

    it('should return true when property does not exist', () => {
      const obj = { a: 1 };
      expect(unset(obj, 'b')).toBe(true);
      expect(obj).toEqual({ a: 1 });
    });

    it('should handle null/undefined objects', () => {
      expect(unset(null, 'a')).toBe(true);
      expect(unset(undefined, 'a')).toBe(true);
    });
  });

  describe('nested property removal', () => {
    it('should remove nested properties using dot notation', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(unset(obj, 'a.b.c')).toBe(true);
      expect(obj).toEqual({ a: { b: {} } });
    });

    it('should remove nested properties using array path', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(unset(obj, ['a', 'b', 'c'])).toBe(true);
      expect(obj).toEqual({ a: { b: {} } });
    });

    it('should handle non-existent nested paths', () => {
      const obj = { a: { b: {} } };
      expect(unset(obj, 'a.b.c.d')).toBe(true);
      expect(obj).toEqual({ a: { b: {} } });
    });
  });

  describe('array handling', () => {
    it('should remove array elements using numeric indices', () => {
      const arr = [1, 2, 3];
      expect(unset(arr, 1)).toBe(true);
      expect(arr[1]).toBe(undefined);
      expect(arr.length).toBe(3);
    });

    it('should handle array-like paths', () => {
      const obj = { a: [1, 2, 3] };
      expect(unset(obj, 'a[1]')).toBe(true);
      expect(obj.a[1]).toBe(undefined);
    });

    it('should handle zero index', () => {
      const arr = [1, 2, 3];
      expect(unset(arr, 0)).toBe(true);
      expect(arr[0]).toBe(undefined);
    });
  });

  describe('special cases', () => {
    it('should handle symbol keys', () => {
      const sym = Symbol('test');
      const obj = { [sym]: 1 };
      expect(unset(obj, sym)).toBe(true);
      expect(obj[sym]).toBe(undefined);
    });

    it('should handle number keys', () => {
      const obj = { 1: 'a' };
      expect(unset(obj, 1)).toBe(true);
      expect(obj['1']).toBe(undefined);
    });

    it('should return false when property is non-configurable', () => {
      const obj: Record<string, any> = {};
      Object.defineProperty(obj, 'a', {
        value: 1,
        configurable: false,
      });
      expect(unset(obj, 'a')).toBe(false);
      expect(obj.a).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should handle empty paths', () => {
      const obj = { a: 1 };
      expect(unset(obj, [])).toBe(true);
      expect(obj).toEqual({ a: 1 });
    });

    it('should handle undefined values in path', () => {
      const obj = { a: { b: 1 } };
      expect(unset(obj, ['a', undefined as any, 'b'])).toBe(true);
      expect(obj).toEqual({ a: { b: 1 } });
    });

    it('should handle deep path strings', () => {
      const obj = { a: { b: { c: 2 } } };
      expect(unset(obj, 'a.b.c')).toBe(true);
      expect(obj).toEqual({ a: { b: {} } });
    });
  });
});
