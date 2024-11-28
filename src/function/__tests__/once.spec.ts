import { describe, expect, it, vi } from 'vitest';
import { once } from '../once';

describe('once', () => {
  it('should only execute the function once', () => {
    const fn = vi.fn(() => 42);
    const onceFn = once(fn);

    expect(onceFn()).toBe(42);
    expect(onceFn()).toBe(42);
    expect(onceFn()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should maintain the return value from the first call', () => {
    let counter = 0;
    const fn = () => ++counter;
    const onceFn = once(fn);

    expect(onceFn()).toBe(1);
    expect(onceFn()).toBe(1);
    expect(counter).toBe(1);
  });

  it('should pass arguments correctly', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const onceFn = once(fn);

    expect(onceFn(1, 2)).toBe(3);
    expect(onceFn(3, 4)).toBe(3); // Should still return first result
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it('should maintain the this context', () => {
    const obj = {
      value: 42,
      fn: once(function (this: { value: number }) {
        return this.value;
      }),
    };

    expect(obj.fn()).toBe(42);
    expect(obj.fn()).toBe(42);
  });

  it('should handle functions with no return value', () => {
    const fn = vi.fn();
    const onceFn = once(fn);

    onceFn();
    onceFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle async functions', async () => {
    const fn = vi.fn(async () => 'async result');
    const onceFn = once(fn);

    const result1 = await onceFn();
    const result2 = await onceFn();

    expect(result1).toBe('async result');
    expect(result2).toBe('async result');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle edge cases', () => {
    const fn = vi.fn(() => undefined);
    const onceFn = once(fn);

    expect(onceFn()).toBeUndefined();
    expect(onceFn()).toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
