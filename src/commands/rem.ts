import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js';
import path from 'path';
import { BotCommand } from '../types/types';

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('rem')
        .setDescription('Sends a Rem image to the channel'),
    
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            // Create the path to the rem.png image
            const imagePath = path.join(__dirname, '../../assets/images/meme-images/rem.png');
            
            // Create an attachment from the image file
            const attachment = new AttachmentBuilder(imagePath, { name: 'rem.png' });
            
            // Reply with the image attachment
            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error('Error sending rem image:', error);
            await interaction.reply({ content: 'Sorry, I couldn\'t send the Rem image!', ephemeral: true });
        }
    }
};

export = command;
