import { capitalize, truncate, normalizeWhitespace, isEmpty } from '../stringUtils';

describe('stringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a lowercase string', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle uppercase strings', () => {
      expect(capitalize('HELLO WORLD')).toBe('Hello world');
    });

    it('should handle mixed case strings', () => {
      expect(capitalize('hELLo WoRLD')).toBe('Hello world');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle strings that start with numbers', () => {
      expect(capitalize('123hello')).toBe('123hello');
    });

    it('should handle strings that start with special characters', () => {
      expect(capitalize('!hello')).toBe('!hello');
    });
  });

  describe('truncate', () => {
    it('should truncate strings longer than max length', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should not truncate strings shorter than max length', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should not truncate strings equal to max length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('should handle very short max lengths', () => {
      expect(truncate('Hello World', 3)).toBe('...');
      expect(truncate('Hello World', 4)).toBe('H...');
    });

    it('should handle empty strings', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle max length of 0', () => {
      expect(truncate('Hello', 0)).toBe('He...');
    });
  });

  describe('normalizeWhitespace', () => {
    it('should remove leading and trailing whitespace', () => {
      expect(normalizeWhitespace('  hello world  ')).toBe('hello world');
    });

    it('should replace multiple spaces with single spaces', () => {
      expect(normalizeWhitespace('hello    world')).toBe('hello world');
    });

    it('should handle tabs and newlines', () => {
      expect(normalizeWhitespace('hello\t\n  world')).toBe('hello world');
    });

    it('should handle strings with only whitespace', () => {
      expect(normalizeWhitespace('   \t\n  ')).toBe('');
    });

    it('should handle empty strings', () => {
      expect(normalizeWhitespace('')).toBe('');
    });

    it('should handle strings without extra whitespace', () => {
      expect(normalizeWhitespace('hello world')).toBe('hello world');
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('should return true for strings with only whitespace', () => {
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t')).toBe(true);
      expect(isEmpty('\n')).toBe(true);
      expect(isEmpty('  \t\n  ')).toBe(true);
    });

    it('should return false for strings with content', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' hello ')).toBe(false);
      expect(isEmpty('a')).toBe(false);
    });

    it('should return false for strings with only special characters', () => {
      expect(isEmpty('!')).toBe(false);
      expect(isEmpty('123')).toBe(false);
    });
  });
});
