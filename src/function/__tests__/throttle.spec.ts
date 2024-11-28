import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throttle function calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should respect leading edge option', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000, { edges: ['leading'] });

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should respect trailing edge option', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000, { edges: ['trailing'] });

    throttled();
    expect(fn).toHaveBeenCalledTimes(0);

    throttled();
    expect(fn).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle both leading and trailing edges', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000, { edges: ['leading', 'trailing'] });

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should pass correct arguments to the throttled function', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled('a', 1);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });

  it('should be cancellable', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be flushable', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled.flush();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle AbortSignal', () => {
    const fn = vi.fn();
    const controller = new AbortController();
    const throttled = throttle(fn, 1000, { signal: controller.signal });

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    controller.abort();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
