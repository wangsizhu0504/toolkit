import { describe, expect, it } from 'vitest';
import { clone } from '../clone';

describe('clone', () => {
  describe('primitive values', () => {
    it('should return same primitive values', () => {
      expect(clone(1)).toBe(1);
      expect(clone('string')).toBe('string');
      expect(clone(true)).toBe(true);
      expect(clone(null)).toBe(null);
      expect(clone(undefined)).toBe(undefined);
      const sym = Symbol('test');
      expect(clone(sym)).toBe(sym);
    });
  });

  describe('arrays', () => {
    it('should clone arrays', () => {
      const arr = [1, 2, 3];
      const cloned = clone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    it('should clone typed arrays', () => {
      const arr = new Int32Array([1, 2, 3]);
      const cloned = clone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });

    it('should clone ArrayBuffer', () => {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setInt32(0, 1);
      const cloned = clone(buffer);
      expect(cloned).toEqual(buffer);
      expect(cloned).not.toBe(buffer);
    });
  });

  describe('objects', () => {
    it('should clone plain objects', () => {
      const obj = { a: 1, b: 'string', c: true };
      const cloned = clone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects (shallow)', () => {
      const nested = { a: { b: 2 } };
      const cloned = clone(nested);
      expect(cloned).toEqual(nested);
      expect(cloned.a).toBe(nested.a); // shallow clone, inner object is same reference
    });

    it('should preserve object prototype', () => {
      class TestClass {
        value: number;
        constructor(value: number) {
          this.value = value;
        }
      }
      const instance = new TestClass(42);
      const cloned = clone(instance);
      expect(cloned).toEqual(instance);
      expect(cloned instanceof TestClass).toBe(true);
    });
  });

  describe('built-in objects', () => {
    it('should clone Date objects', () => {
      const date = new Date();
      const cloned = clone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should clone RegExp objects', () => {
      const regex = /test/gi;
      regex.lastIndex = 5;
      const cloned = clone(regex);
      expect(cloned).toEqual(regex);
      expect(cloned).not.toBe(regex);
      expect(cloned.lastIndex).toBe(5);
    });

    it('should clone Map objects', () => {
      const map = new Map([['key', 'value']]);
      const cloned = clone(map);
      expect(cloned).toEqual(map);
      expect(cloned).not.toBe(map);
    });

    it('should clone Set objects', () => {
      const set = new Set([1, 2, 3]);
      const cloned = clone(set);
      expect(cloned).toEqual(set);
      expect(cloned).not.toBe(set);
    });

    it('should clone Error objects', () => {
      const error = new Error('test error');
      const cloned = clone(error);
      expect(cloned.message).toBe(error.message);
      expect(cloned.stack).toBe(error.stack);
      expect(cloned.name).toBe(error.name);
      expect(cloned).not.toBe(error);
    });

    it('should clone DataView objects', () => {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setInt32(0, 42);
      const cloned = clone(view);
      expect(cloned.getInt32(0)).toBe(42);
      expect(cloned).not.toBe(view);
    });
  });
});
