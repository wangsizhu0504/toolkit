import { describe, expect, it } from 'vitest';
import { isWindow } from '../isWindow';

describe('isWindow', () => {
  it('should return false for non-window values', () => {
    expect(isWindow(null)).toBe(false);
    expect(isWindow(undefined)).toBe(false);
    expect(isWindow({})).toBe(false);
    expect(isWindow({ window })).toBe(false);
    expect(isWindow([])).toBe(false);
    expect(isWindow(42)).toBe(false);
    expect(isWindow('window')).toBe(false);
    expect(isWindow(true)).toBe(false);
    expect(isWindow(new Date())).toBe(false);
    expect(isWindow(new Map())).toBe(false);
    expect(isWindow(new Set())).toBe(false);
    expect(isWindow(() => {})).toBe(false);
  });

  // Note: We can't reliably test window object in Node.js environment
  // In a browser environment, you would add:
  it('should return true for window object', () => {
    expect(isWindow(window)).toBe(true);
  });
});
