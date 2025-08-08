// Mock the path and fs modules before importing
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/'))
}));

// Create a mock SlashCommandBuilder class
class MockSlashCommandBuilder {
  name = 'rem';
  description = 'Sends a Rem image to the channel';
  
  setName(name: string) {
    this.name = name;
    return this;
  }
  
  setDescription(description: string) {
    this.description = description;
    return this;
  }
}

jest.mock('discord.js', () => ({
  SlashCommandBuilder: MockSlashCommandBuilder,
  AttachmentBuilder: jest.fn().mockImplementation((filePath, options) => ({
    filePath,
    name: options?.name || 'rem.png'
  }))
}));

import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js';
import command from '../rem';
import path from 'path';

const mockedPath = path as jest.Mocked<typeof path>;
const MockedAttachmentBuilder = AttachmentBuilder as jest.MockedClass<typeof AttachmentBuilder>;

describe('rem command', () => {
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
      expect(command.data.name).toBe('rem');
    });

    it('should have correct command description', () => {
      expect(command.data.description).toBe('Sends a Rem image to the channel');
    });

    it('should be an instance of SlashCommandBuilder', () => {
      expect(command.data).toBeInstanceOf(SlashCommandBuilder);
    });
  });

  describe('execute function', () => {
    it('should reply with the rem image attachment', async () => {
      const expectedPath = 'mocked/path/to/rem.png';
      mockedPath.join.mockReturnValue(expectedPath);

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(path.join).toHaveBeenCalledWith(expect.any(String), '../../assets/images/meme-images/rem.png');
      expect(MockedAttachmentBuilder).toHaveBeenCalledWith(expectedPath, { name: 'rem.png' });
      expect(mockInteraction.reply).toHaveBeenCalledWith({
        files: [expect.objectContaining({
          filePath: expectedPath,
          name: 'rem.png'
        })]
      });
    });

    it('should handle errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const testError = new Error('File not found');
      
      // Mock AttachmentBuilder to throw an error
      MockedAttachmentBuilder.mockImplementationOnce(() => {
        throw testError;
      });

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending rem image:', testError);
      expect(mockInteraction.reply).toHaveBeenCalledWith({
        content: 'Sorry, I couldn\'t send the Rem image!',
        ephemeral: true
      });

      consoleErrorSpy.mockRestore();
    });

    it('should handle interaction reply errors', async () => {
      mockInteraction.reply.mockRejectedValue(new Error('Discord API error'));
      const expectedPath = '__dirname/../../assets/images/meme-images/rem.png';
      mockedPath.join.mockReturnValue(expectedPath);

      await expect(command.execute(mockInteraction as ChatInputCommandInteraction))
        .rejects.toThrow('Discord API error');
    });

    it('should create attachment with correct file name', async () => {
      const expectedPath = '__dirname/../../assets/images/meme-images/rem.png';
      mockedPath.join.mockReturnValue(expectedPath);

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(MockedAttachmentBuilder).toHaveBeenCalledWith(
        expectedPath,
        { name: 'rem.png' }
      );
    });

    it('should construct the correct image path', async () => {
      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(path.join).toHaveBeenCalledWith(
        expect.any(String),
        '../../assets/images/meme-images/rem.png'
      );
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

  describe('error handling', () => {
    it('should log errors to console when attachment creation fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const testError = new Error('Attachment creation failed');
      
      MockedAttachmentBuilder.mockImplementationOnce(() => {
        throw testError;
      });

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending rem image:', testError);
      
      consoleErrorSpy.mockRestore();
    });

    it('should send ephemeral error message on failure', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      MockedAttachmentBuilder.mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      await command.execute(mockInteraction as ChatInputCommandInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith({
        content: 'Sorry, I couldn\'t send the Rem image!',
        ephemeral: true
      });
    });
  });
});
