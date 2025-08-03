import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { randomFrom, searchLists } from '../utils/fileUtils';
import { BotCommand } from '../types/types';

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for something mysterious!'),
    
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        let modifier: string = randomFrom(searchLists.modifiers);
        const attribute: string = randomFrom(searchLists.attributes);
        const item: string = randomFrom(searchLists.items);
        const location: string = randomFrom(searchLists.locations);

        if (attribute === "") {
            modifier = "";
        }
        const message: string = `You search around and find a ${modifier} ${attribute} ${item} ${location}.`;
        await interaction.reply(message);
    }
};

export = command;
