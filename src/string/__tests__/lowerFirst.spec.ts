import { describe, expect, it } from 'vitest';
import { lowerFirst } from '../lowerFirst';

describe('lowerFirst', () => {
  it('should convert the first character of an uppercase string to lowercase', () => {
    expect(lowerFirst('Fred')).toBe('fred');
    expect(lowerFirst('Hello')).toBe('hello');
    expect(lowerFirst('World')).toBe('world');
  });

  it('should not modify an already lowercase string', () => {
    expect(lowerFirst('fred')).toBe('fred');
    expect(lowerFirst('hello')).toBe('hello');
    expect(lowerFirst('world')).toBe('world');
  });

  it('should partially convert an all-uppercase string', () => {
    expect(lowerFirst('FRED')).toBe('fRED');
    expect(lowerFirst('HELLO')).toBe('hELLO');
    expect(lowerFirst('WORLD')).toBe('wORLD');
  });

  it('should handle single-character strings', () => {
    expect(lowerFirst('A')).toBe('a');
    expect(lowerFirst('Z')).toBe('z');
  });

  it('should handle empty strings', () => {
    expect(lowerFirst('')).toBe('');
  });

  it('should handle strings with leading whitespace', () => {
    expect(lowerFirst(' Hello')).toBe(' Hello');
    expect(lowerFirst('  World')).toBe('  World');
  });

  it('should handle strings with special characters', () => {
    expect(lowerFirst('Hello!')).toBe('hello!');
    expect(lowerFirst('@World')).toBe('@World');
    expect(lowerFirst('123Abc')).toBe('123Abc');
  });

  it('should handle unicode characters', () => {
    expect(lowerFirst('Über')).toBe('über');
    expect(lowerFirst('Ñandú')).toBe('ñandú');
    expect(lowerFirst('こんにちは')).toBe('こんにちは');
  });
});
