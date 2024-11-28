import { describe, expect, it } from 'vitest';
import { camelCase } from '../camelCase';

describe('camelCase', () => {
  it('should convert space-separated words to camelCase', () => {
    expect(camelCase('some whitespace')).toBe('someWhitespace');
    expect(camelCase('multiple   spaces   here')).toBe('multipleSpacesHere');
  });

  it('should convert hyphen-separated words to camelCase', () => {
    expect(camelCase('hyphen-text')).toBe('hyphenText');
    expect(camelCase('multiple-hyphens-here')).toBe('multipleHyphensHere');
  });

  it('should convert underscore-separated words to camelCase', () => {
    expect(camelCase('underscore_text')).toBe('underscoreText');
    expect(camelCase('multiple_underscores_here')).toBe('multipleUnderscoresHere');
  });

  it('should handle mixed separators', () => {
    expect(camelCase('mixed-space and_separators')).toBe('mixedSpaceAndSeparators');
    expect(camelCase('mixed_UPPER-lower')).toBe('mixedUpperLower');
  });

  it('should handle uppercase acronyms', () => {
    expect(camelCase('HTTPRequest')).toBe('httpRequest');
    expect(camelCase('XML_HTTP_REQUEST')).toBe('xmlHttpRequest');
  });

  it('should preserve emojis and unicode characters', () => {
    expect(camelCase('Keep unicode 😅')).toBe('keepUnicode😅');
    expect(camelCase('emoji 🚀 test')).toBe('emoji🚀Test');
  });

  it('should handle empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should handle single word', () => {
    expect(camelCase('word')).toBe('word');
    expect(camelCase('WORD')).toBe('word');
    expect(camelCase('Word')).toBe('word');
  });

  it('should handle strings with numbers', () => {
    expect(camelCase('version 1.2.3')).toBe('version123');
    expect(camelCase('test-123-text')).toBe('test123Text');
  });
});
