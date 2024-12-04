import { describe, expect, it } from 'vitest';
import { upperCase } from '../upperCase';

describe('upperCase', () => {
  it('should convert camelCase to upper case with spaces', () => {
    expect(upperCase('camelCase')).toBe('CAMEL CASE');
    expect(upperCase('someCamelCase')).toBe('SOME CAMEL CASE');
  });

  it('should convert strings with whitespace to upper case', () => {
    expect(upperCase('Some Whitespace')).toBe('SOME WHITESPACE');
    expect(upperCase('  Leading and trailing  ')).toBe('LEADING AND TRAILING');
  });

  it('should convert hyphenated strings to upper case with spaces', () => {
    expect(upperCase('hyphen-text')).toBe('HYPHEN TEXT');
    expect(upperCase('dash-separated')).toBe('DASH SEPARATED');
  });

  it('should convert PascalCase to upper case with spaces', () => {
    expect(upperCase('HTTPRequest')).toBe('HTTP REQUEST');
    expect(upperCase('PascalCase')).toBe('PASCAL CASE');
  });

  it('should handle empty strings', () => {
    expect(upperCase('')).toBe('');
  });

  it('should handle strings with special characters', () => {
    expect(upperCase('Special@Characters!')).toBe('SPECIAL CHARACTERS');
    expect(upperCase('123Numbers')).toBe('123 NUMBERS');
  });

  it('should handle strings with unicode characters', () => {
    expect(upperCase('ÜberCool')).toBe('ÜBER COOL');
    expect(upperCase('Ñandú')).toBe('ÑANDÚ');
  });

  it('should handle strings with multiple word separators', () => {
    expect(upperCase('hello_world-test')).toBe('HELLO WORLD TEST');
    expect(upperCase('snake_case-kebab_case')).toBe('SNAKE CASE KEBAB CASE');
  });

  it('should handle strings with consecutive uppercase letters', () => {
    expect(upperCase('XMLHttpRequest')).toBe('XML HTTP REQUEST');
    expect(upperCase('iOS')).toBe('I OS');
  });
});
