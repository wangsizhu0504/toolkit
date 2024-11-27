import { describe, expect, it } from 'vitest';
import { isFile } from '../isFile';

describe('isFile', () => {
  it('should return true for File objects', () => {
    // Create a File object
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    expect(isFile(file)).toBe(true);
  });

  it('should return false for non-File values', () => {
    expect(isFile(new Blob(['content']))).toBe(false);
    expect(isFile({})).toBe(false);
    expect(isFile([])).toBe(false);
    expect(isFile(null)).toBe(false);
    expect(isFile(undefined)).toBe(false);
    expect(isFile('file')).toBe(false);
    expect(isFile(42)).toBe(false);
    expect(isFile(true)).toBe(false);
    expect(isFile(() => {})).toBe(false);
    expect(isFile(new Date())).toBe(false);
    expect(isFile(new Map())).toBe(false);
    expect(isFile(new Set())).toBe(false);
  });
});
