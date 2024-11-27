import { describe, expect, it } from 'vitest';
import { isArguments } from '../isArguments';

describe('isArguments', () => {
  it('should return true for arguments objects', () => {
    // eslint-disable-next-line style/max-statements-per-line
    const args = (function () { return arguments; })();
    // eslint-disable-next-line style/max-statements-per-line
    const strictArgs = (function () { 'use strict'; return arguments; })();

    expect(isArguments(args)).toBe(true);
    expect(isArguments(strictArgs)).toBe(true);
  });

  it('should return false for non-arguments values', () => {
    expect(isArguments([])).toBe(false);
    expect(isArguments([1, 2, 3])).toBe(false);
    expect(isArguments({})).toBe(false);
    expect(isArguments({ length: 3 })).toBe(false);
    expect(isArguments(null)).toBe(false);
    expect(isArguments(undefined)).toBe(false);
    expect(isArguments(42)).toBe(false);
    expect(isArguments('arguments')).toBe(false);
    expect(isArguments(true)).toBe(false);
    expect(isArguments(() => {})).toBe(false);
    expect(isArguments(new Date())).toBe(false);
    expect(isArguments(new Map())).toBe(false);
    expect(isArguments(new Set())).toBe(false);
  });
});
