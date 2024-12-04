import { describe, expect, it } from 'vitest';
import { lowerCase } from '../lowerCase';

describe('lowerCase', () => {
  it('should convert camelCase to lower case with spaces', () => {
    expect(lowerCase('camelCase')).toBe('camel case');
    expect(lowerCase('someCamelCase')).toBe('some camel case');
  });

  it('should convert strings with whitespace to lower case', () => {
    expect(lowerCase('Some Whitespace')).toBe('some whitespace');
    expect(lowerCase('  Leading and trailing  ')).toBe('leading and trailing');
  });

  it('should convert hyphenated strings to lower case with spaces', () => {
    expect(lowerCase('hyphen-text')).toBe('hyphen text');
    expect(lowerCase('dash-separated')).toBe('dash separated');
  });

  it('should convert PascalCase to lower case with spaces', () => {
    expect(lowerCase('HTTPRequest')).toBe('http request');
    expect(lowerCase('PascalCase')).toBe('pascal case');
  });

  it('should handle empty strings', () => {
    expect(lowerCase('')).toBe('');
  });

  it('should handle strings with special characters', () => {
    expect(lowerCase('Special@Characters!')).toBe('special characters');
    expect(lowerCase('123Numbers')).toBe('123 numbers');
  });

  it('should handle strings with unicode characters', () => {
    expect(lowerCase('ÜberCool')).toBe('über cool');
    expect(lowerCase('Ñandú')).toBe('ñandú');
  });
});
