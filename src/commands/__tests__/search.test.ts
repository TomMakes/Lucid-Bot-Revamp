// Mock the fileUtils module before importing
jest.mock('../../utils/fileUtils', () => ({
  randomFrom: jest.fn(),
  searchLists: {
    modifiers: ['very', 'slightly', 'extremely'],
    attributes: ['shiny', 'rusty', ''],
    items: ['sword', 'shield', 'potion'],
    locations: ['in a cave', 'under a rock', 'behind a tree']
  }
}));

import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import command from '../search';
import * as fileUtils from '../../utils/fileUtils';

const mockedFileUtils = fileUtils as jest.Mocked<typeof fileUtils>;

describe('search command', () => {
  let mockInteraction: any;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a mock interaction
    mockInteraction = {
      reply: jest.fn().mockResolvedValue(undefined),
    } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('command data', () => {
    it('should have correct command name', () => {
      expect(command.data.name).toBe('search');
    });

    it('should have correct command description', () => {
      expect(command.data.description).toBe('Search for something mysterious!');
    });

    it('should be an instance of SlashCommandBuilder', () => {
      expect(command.data).toBeInstanceOf(SlashCommandBuilder);
    });
  });

  describe('execute function', () => {
    it('should reply with a formatted search message', async () => {
      // Mock randomFrom to return predictable values
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('very')     // modifier
        .mockReturnValueOnce('shiny')    // attribute
        .mockReturnValueOnce('sword')    // item
        .mockReturnValueOnce('in a cave'); // location

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith(
        'You search around and find a very shiny sword in a cave.'
      );
    });

    it('should handle empty attribute by removing modifier', async () => {
      // Mock randomFrom to return empty string for attribute
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('extremely') // modifier
        .mockReturnValueOnce('')          // empty attribute
        .mockReturnValueOnce('potion')    // item
        .mockReturnValueOnce('under a rock'); // location

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith(
        'You search around and find a   potion under a rock.'
      );
    });

    it('should call randomFrom for each search list', async () => {
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('slightly')
        .mockReturnValueOnce('rusty')
        .mockReturnValueOnce('shield')
        .mockReturnValueOnce('behind a tree');

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(fileUtils.randomFrom).toHaveBeenCalledTimes(4);
      expect(fileUtils.randomFrom).toHaveBeenNthCalledWith(1, fileUtils.searchLists.modifiers);
      expect(fileUtils.randomFrom).toHaveBeenNthCalledWith(2, fileUtils.searchLists.attributes);
      expect(fileUtils.randomFrom).toHaveBeenNthCalledWith(3, fileUtils.searchLists.items);
      expect(fileUtils.randomFrom).toHaveBeenNthCalledWith(4, fileUtils.searchLists.locations);
    });

    it('should handle interaction reply errors gracefully', async () => {
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('very')
        .mockReturnValueOnce('shiny')
        .mockReturnValueOnce('sword')
        .mockReturnValueOnce('in a cave');

      // Mock reply to throw an error
      mockInteraction.reply.mockRejectedValue(new Error('Discord API error'));

      await expect(command.execute(mockInteraction as ChatInputCommandInteraction))
        .rejects.toThrow('Discord API error');
    });

    it('should generate different messages on multiple calls', async () => {
      const replies: string[] = [];
      
      // Mock reply to capture the messages
      mockInteraction.reply.mockImplementation((message: string) => {
        replies.push(message);
        return Promise.resolve();
      });

      // First call
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('very')
        .mockReturnValueOnce('shiny')
        .mockReturnValueOnce('sword')
        .mockReturnValueOnce('in a cave');

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      // Second call with different values
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('slightly')
        .mockReturnValueOnce('rusty')
        .mockReturnValueOnce('potion')
        .mockReturnValueOnce('under a rock');

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(replies).toHaveLength(2);
      expect(replies[0]).toBe('You search around and find a very shiny sword in a cave.');
      expect(replies[1]).toBe('You search around and find a slightly rusty potion under a rock.');
      expect(replies[0]).not.toBe(replies[1]);
    });

    it('should handle null/undefined values from randomFrom', async () => {
      mockedFileUtils.randomFrom
        .mockReturnValueOnce(undefined as any)
        .mockReturnValueOnce('shiny')
        .mockReturnValueOnce('sword')
        .mockReturnValueOnce('in a cave');

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith(
        'You search around and find a undefined shiny sword in a cave.'
      );
    });

    it('should preserve the message format structure', async () => {
      mockedFileUtils.randomFrom
        .mockReturnValueOnce('test-modifier')
        .mockReturnValueOnce('test-attribute')
        .mockReturnValueOnce('test-item')
        .mockReturnValueOnce('test-location');

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      const calledMessage = mockInteraction.reply.mock.calls[0][0];
      expect(calledMessage).toMatch(/^You search around and find a .* .* .* .*\.$/);
      expect(calledMessage).toContain('test-modifier');
      expect(calledMessage).toContain('test-attribute');
      expect(calledMessage).toContain('test-item');
      expect(calledMessage).toContain('test-location');
    });
  });

  describe('command structure', () => {
    it('should export an object with data and execute properties', () => {
      expect(command).toHaveProperty('data');
      expect(command).toHaveProperty('execute');
      expect(typeof command.execute).toBe('function');
    });

    it('should have execute function that accepts ChatInputCommandInteraction', () => {
      expect(command.execute).toBeDefined();
      expect(command.execute.length).toBe(1); // Should accept one parameter
    });

    it('should have execute function that returns a Promise', () => {
      const result = command.execute(mockInteraction as ChatInputCommandInteraction);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
