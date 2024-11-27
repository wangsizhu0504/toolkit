import { describe, expect, it } from 'vitest';
import { isSymbol } from '../isSymbol';

describe('isSymbol', () => {
  it('should return true for symbols', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('test'))).toBe(true);
    expect(isSymbol(Symbol.for('test'))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol(Symbol.hasInstance)).toBe(true);
    expect(isSymbol(Symbol.asyncIterator)).toBe(true);
    expect(isSymbol(Symbol.toPrimitive)).toBe(true);
  });

  it('should return false for non-symbol values', () => {
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol('123')).toBe(false);
    expect(isSymbol('Symbol()')).toBe(false);
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol(0)).toBe(false);
    expect(isSymbol(Number.NaN)).toBe(false);
    expect(isSymbol(Infinity)).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(false)).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(() => {})).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    // eslint-disable-next-line prefer-regex-literals
    expect(isSymbol(new RegExp(''))).toBe(false);
    expect(isSymbol(new Error())).toBe(false);
    expect(isSymbol(new Map())).toBe(false);
    expect(isSymbol(new Set())).toBe(false);
    expect(isSymbol(new WeakMap())).toBe(false);
    expect(isSymbol(new WeakSet())).toBe(false);
    expect(isSymbol(BigInt(123))).toBe(false);
  });
});
