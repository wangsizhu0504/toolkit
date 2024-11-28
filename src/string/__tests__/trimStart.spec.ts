import { describe, expect, it } from 'vitest';
import { trimStart } from '../trimStart';

describe('trimStart', () => {
  it('should trim whitespace from start of string', () => {
    expect(trimStart('  hello')).toBe('hello');
    expect(trimStart('\t\nhello')).toBe('hello');
    expect(trimStart('   hello  ')).toBe('hello  ');
  });

  it('should trim specified character from start', () => {
    expect(trimStart('--hello', '-')).toBe('hello');
    expect(trimStart('___hello', '_')).toBe('hello');
    expect(trimStart('###hello', '#')).toBe('hello');
  });

  it('should trim multiple specified characters from start', () => {
    expect(trimStart('##hello', ['#', 'o'])).toBe('hello');
    expect(trimStart('-_-hello', ['-', '_'])).toBe('hello');
    expect(trimStart('123hello', ['1', '2', '3'])).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(trimStart('')).toBe('');
    expect(trimStart('', '-')).toBe('');
    expect(trimStart('', ['#', '-'])).toBe('');
  });
});
