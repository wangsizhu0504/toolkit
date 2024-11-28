import { describe, expect, it } from 'vitest';
import { words } from '../words';

describe('words', () => {
  it('should split camelCase words', () => {
    expect(words('camelCase')).toEqual(['camel', 'Case']);
    expect(words('thisIsCamelCase')).toEqual(['this', 'Is', 'Camel', 'Case']);
  });

  it('should split words with spaces', () => {
    expect(words('some whitespace')).toEqual(['some', 'whitespace']);
    expect(words('multiple   spaces   here')).toEqual(['multiple', 'spaces', 'here']);
  });

  it('should split hyphenated words', () => {
    expect(words('hyphen-text')).toEqual(['hyphen', 'text']);
    expect(words('multiple-hyphens-here')).toEqual(['multiple', 'hyphens', 'here']);
  });

  it('should split underscore separated words', () => {
    expect(words('underscore_text')).toEqual(['underscore', 'text']);
    expect(words('multiple_underscores_here')).toEqual(['multiple', 'underscores', 'here']);
  });

  it('should handle uppercase acronyms', () => {
    expect(words('HTTPRequest')).toEqual(['HTTP', 'Request']);
    expect(words('XMLHTTPRequest')).toEqual(['XMLHTTP', 'Request']);
  });

  it('should handle mixed case and separators', () => {
    expect(words('mixed-space and_separators')).toEqual(['mixed', 'space', 'and', 'separators']);
    expect(words('camelCase-with-hyphens')).toEqual(['camel', 'Case', 'with', 'hyphens']);
  });

  it('should preserve emojis and unicode characters', () => {
    expect(words('Keep unicode 😅')).toEqual(['Keep', 'unicode', '😅']);
    expect(words('emoji🚀test')).toEqual(['emoji', '🚀', 'test']);
  });

  it('should handle strings with numbers', () => {
    expect(words('version123')).toEqual(['version', '123']);
    expect(words('test-123-text')).toEqual(['test', '123', 'text']);
  });

  it('should handle empty string', () => {
    expect(words('')).toEqual([]);
  });

  it('should handle single word', () => {
    expect(words('word')).toEqual(['word']);
    expect(words('WORD')).toEqual(['WORD']);
  });
});
