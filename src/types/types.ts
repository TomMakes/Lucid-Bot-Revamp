import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface BotCommand {
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export interface SearchLists {
    modifiers: string[];
    attributes: string[];
    items: string[];
    locations: string[];
}
