// Mock fs module before any imports
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue('mocked content\nline 2\nline 3'),
}));

// Mock path module  
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));
