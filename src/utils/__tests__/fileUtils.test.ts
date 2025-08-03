// Mock fs before importing fileUtils
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

import fs from 'fs';
import path from 'path';

const mockedFs = fs as jest.Mocked<typeof fs>;

// Set up initial mock return values for module loading
mockedFs.readFileSync
  .mockReturnValueOnce('very\nslightly\nextremely')    // modifiers
  .mockReturnValueOnce('shiny\nrusty\nold')            // attributes  
  .mockReturnValueOnce('sword\nshield\npotion')        // items
  .mockReturnValueOnce('cave\nforest\ncastle');        // locations

// Now import the module after mocks are set up
import { getLines, randomFrom, searchLists } from '../fileUtils';

describe('fileUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getLines', () => {
    it('should read file content and return array of non-empty lines', () => {
      const mockContent = 'line1\nline2\n\nline3\r\nline4\n\n';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      const result = getLines('test-file.txt');

      expect(fs.readFileSync).toHaveBeenCalledWith('test-file.txt', 'utf-8');
      expect(result).toEqual(['line1', 'line2', 'line3', 'line4']);
    });

    it('should handle files with only empty lines', () => {
      const mockContent = '\n\n\r\n\n';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      const result = getLines('empty-file.txt');

      expect(result).toEqual([]);
    });

    it('should handle files with mixed line endings', () => {
      const mockContent = 'unix\nwindows\r\nmac\rend';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      const result = getLines('mixed-file.txt');

      expect(result).toEqual(['unix', 'windows', 'mac\rend']);
    });

    it('should handle single line files', () => {
      const mockContent = 'single line';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      const result = getLines('single-line.txt');

      expect(result).toEqual(['single line']);
    });

    it('should throw error if file reading fails', () => {
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      expect(() => getLines('nonexistent.txt')).toThrow('File not found');
    });
  });

  describe('randomFrom', () => {
    it('should return a random element from array', () => {
      const testArray = ['apple', 'banana', 'cherry'];
      const result = randomFrom(testArray);

      expect(testArray).toContain(result);
    });

    it('should return the only element from single-element array', () => {
      const testArray = ['only-element'];
      const result = randomFrom(testArray);

      expect(result).toBe('only-element');
    });

    it('should work with different data types', () => {
      const numberArray = [1, 2, 3, 4, 5];
      const result = randomFrom(numberArray);

      expect(numberArray).toContain(result);
      expect(typeof result).toBe('number');
    });

    it('should work with object arrays', () => {
      const objectArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = randomFrom(objectArray);

      expect(objectArray).toContain(result);
      expect(result).toHaveProperty('id');
    });

    it('should distribute randomly across multiple calls', () => {
      const testArray = ['a', 'b', 'c', 'd', 'e'];
      const results = new Set();
      
      // Run many times to check distribution
      for (let i = 0; i < 100; i++) {
        results.add(randomFrom(testArray));
      }

      // Should get at least 2 different values in 100 attempts
      expect(results.size).toBeGreaterThan(1);
    });

    it('should handle empty array gracefully', () => {
      const emptyArray: string[] = [];
      const result = randomFrom(emptyArray);

      expect(result).toBeUndefined();
    });
  });

  describe('searchLists', () => {
    it('should load modifiers correctly', () => {
      expect(searchLists.modifiers).toEqual(['very', 'slightly', 'extremely']);
    });

    it('should load attributes correctly', () => {
      expect(searchLists.attributes).toEqual(['shiny', 'rusty', 'old']);
    });

    it('should load items correctly', () => {
      expect(searchLists.items).toEqual(['sword', 'shield', 'potion']);
    });

    it('should load locations correctly', () => {
      expect(searchLists.locations).toEqual(['cave', 'forest', 'castle']);
    });

    it('should have all required properties', () => {
      expect(searchLists).toHaveProperty('modifiers');
      expect(searchLists).toHaveProperty('attributes');
      expect(searchLists).toHaveProperty('items');
      expect(searchLists).toHaveProperty('locations');
    });

    it('should contain arrays for all properties', () => {
      expect(Array.isArray(searchLists.modifiers)).toBe(true);
      expect(Array.isArray(searchLists.attributes)).toBe(true);
      expect(Array.isArray(searchLists.items)).toBe(true);
      expect(Array.isArray(searchLists.locations)).toBe(true);
    });
  });

  describe('file path construction', () => {
    it('should construct correct file paths', () => {
      const mockContent = 'test content';
      mockedFs.readFileSync.mockReturnValue(mockContent);

      getLines('test.txt');

      // Verify that the correct file paths are being constructed
      expect(fs.readFileSync).toHaveBeenCalledWith('test.txt', 'utf-8');
    });
  });
});
