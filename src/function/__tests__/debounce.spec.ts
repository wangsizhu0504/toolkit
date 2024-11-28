import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should debounce function calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should respect leading edge option', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000, { edges: ['leading'] });

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should respect trailing edge option', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000, { edges: ['trailing'] });

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle both leading and trailing edges', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000, { edges: ['leading', 'trailing'] });

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    debounced();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should pass correct arguments to the debounced function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced('a', 1);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });

  it('should be cancellable', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(1000);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should be flushable', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle AbortSignal', () => {
    const fn = vi.fn();
    const controller = new AbortController();
    const debounced = debounce(fn, 1000, { signal: controller.signal });

    debounced();
    controller.abort();
    vi.advanceTimersByTime(1000);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should maintain the last call context', () => {
    const obj = { value: 42 };
    const fn = vi.fn(function (this: typeof obj) {
      expect(this.value).toBe(42);
    });

    const debounced = debounce(fn, 1000);
    debounced.call(obj);
    vi.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
