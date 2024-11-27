import { describe, expect, it } from 'vitest';
import { isFunction } from '../isFunction';

describe('isFunction', () => {
  it('should return `true` for functions', () => {
    expect(isFunction(() => {})).toBe(true);

    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    // eslint-disable-next-line ts/no-empty-function
    expect(isFunction(function* () {})).toBe(true);
    expect(isFunction(Math.round)).toBe(true);
    expect(isFunction(class Any {})).toBe(true);
    expect(isFunction(Object)).toBe(true);
    expect(isFunction(Function)).toBe(true);
  });

  it('should return `false` for non-functions', () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction('abc')).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction({ name: 'test' })).toBe(false);
    expect(isFunction(/abc/)).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new Error())).toBe(false);
    expect(isFunction(Symbol('test'))).toBe(false);
    expect(isFunction(new Map())).toBe(false);
    expect(isFunction(new Set())).toBe(false);
  });
});
