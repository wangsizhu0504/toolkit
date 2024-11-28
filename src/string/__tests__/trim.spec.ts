import { describe, expect, it } from 'vitest';
import { trim } from '../trim';

describe('trim', () => {
  it('should trim whitespace from both ends of string', () => {
    expect(trim('  hello  ')).toBe('hello');
    expect(trim('\t\nhello\t\n')).toBe('hello');
    expect(trim('   ')).toBe('');
  });

  it('should trim specified character from both ends', () => {
    expect(trim('--hello--', '-')).toBe('hello');
    expect(trim('___hello___', '_')).toBe('hello');
    expect(trim('###hello###', '#')).toBe('hello');
  });

  it('should trim multiple specified characters from both ends', () => {
    expect(trim('##hello##', ['#', 'o'])).toBe('hell');
    expect(trim('-_-hello-_-', ['-', '_'])).toBe('hello');
    expect(trim('123hello321', ['1', '2', '3'])).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(trim('')).toBe('');
    expect(trim('', '-')).toBe('');
    expect(trim('', ['#', '-'])).toBe('');
  });
});
