import { describe, expect, it } from 'vitest';
import { isBlob } from '../isBlob';

describe('isBlob', () => {
  it('should return true for Blob instances', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    expect(isBlob(blob)).toBe(true);
  });

  it('should return false for non-Blob values', () => {
    expect(isBlob({})).toBe(false);
    expect(isBlob([])).toBe(false);
    expect(isBlob(null)).toBe(false);
    expect(isBlob(undefined)).toBe(false);
    expect(isBlob('blob')).toBe(false);
    expect(isBlob(42)).toBe(false);
    expect(isBlob(true)).toBe(false);
    expect(isBlob(() => {})).toBe(false);
    expect(isBlob(new Date())).toBe(false);
    expect(isBlob(new Map())).toBe(false);
    expect(isBlob(new Set())).toBe(false);
    expect(isBlob(new ArrayBuffer(10))).toBe(false);
    expect(isBlob(new Uint8Array(10))).toBe(false);
  });

  // Test for environments where Blob is not supported
  it('should handle environments where Blob is not supported', () => {
    const originalBlob = global.Blob;
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    global.Blob = undefined;

    expect(isBlob({})).toBe(false);

    global.Blob = originalBlob;
  });
});
