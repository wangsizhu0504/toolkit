import { describe, expect, it } from 'vitest';
import { capitalize } from '../capitalize';

describe('capitalize', () => {
  it('should capitalize the first character and convert rest to lowercase', () => {
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('fRED')).toBe('Fred');
  });

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle strings with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc');
    expect(capitalize('abc123')).toBe('Abc123');
  });

  it('should handle strings with special characters', () => {
    expect(capitalize('hello-world')).toBe('Hello-world');
    expect(capitalize('_hello')).toBe('_hello');
    expect(capitalize('😀hello')).toBe('😀hello');
  });
});
