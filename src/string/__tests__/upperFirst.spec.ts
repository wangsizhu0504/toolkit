import { describe, expect, it } from 'vitest';
import { upperFirst } from '../upperFirst';

describe('upperFirst', () => {
  it('should convert the first character of a lowercase string to uppercase', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('hello')).toBe('Hello');
    expect(upperFirst('world')).toBe('World');
  });

  it('should not modify an already capitalized string', () => {
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('Hello')).toBe('Hello');
    expect(upperFirst('World')).toBe('World');
  });

  it('should not modify an all-uppercase string', () => {
    expect(upperFirst('FRED')).toBe('FRED');
    expect(upperFirst('HELLO')).toBe('HELLO');
    expect(upperFirst('WORLD')).toBe('WORLD');
  });

  it('should handle single-character strings', () => {
    expect(upperFirst('a')).toBe('A');
    expect(upperFirst('z')).toBe('Z');
  });

  it('should handle empty strings', () => {
    expect(upperFirst('')).toBe('');
  });

  it('should handle strings with leading whitespace', () => {
    expect(upperFirst(' hello')).toBe(' hello');
    expect(upperFirst('  world')).toBe('  world');
  });

  it('should handle strings with special characters', () => {
    expect(upperFirst('hello!')).toBe('Hello!');
    expect(upperFirst('@world')).toBe('@world');
    expect(upperFirst('123abc')).toBe('123abc');
  });

  it('should handle unicode characters', () => {
    expect(upperFirst('über')).toBe('Über');
    expect(upperFirst('ñandú')).toBe('Ñandú');
    expect(upperFirst('こんにちは')).toBe('こんにちは');
  });
});
