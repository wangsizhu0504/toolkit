import { describe, expect, it } from 'vitest';
import { trimEnd } from '../trimEnd';

describe('trimEnd', () => {
  it('should trim whitespace from end of string', () => {
    expect(trimEnd('hello  ')).toBe('hello');
    expect(trimEnd('hello\t\n')).toBe('hello');
    expect(trimEnd('  hello   ')).toBe('  hello');
  });

  it('should trim specified character from end', () => {
    expect(trimEnd('hello--', '-')).toBe('hello');
    expect(trimEnd('hello___', '_')).toBe('hello');
    expect(trimEnd('hello###', '#')).toBe('hello');
  });

  it('should trim multiple specified characters from end', () => {
    expect(trimEnd('hello##', ['#', 'o'])).toBe('hell');
    expect(trimEnd('hello-_-', ['-', '_'])).toBe('hello');
    expect(trimEnd('hello123', ['1', '2', '3'])).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(trimEnd('')).toBe('');
    expect(trimEnd('', '-')).toBe('');
    expect(trimEnd('', ['#', '-'])).toBe('');
  });
});
