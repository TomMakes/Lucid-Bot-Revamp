// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, REST, Routes, ChatInputCommandInteraction } from 'discord.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { BotCommand } from './types/types';

dotenv.config();

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
const commands: any[] = [];
const commandFiles: string[] = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command: BotCommand = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

// When the client is ready, register slash commands
client.once(Events.ClientReady, async (readyClient: Client<true>) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    try {
        await rest.put(
            Routes.applicationCommands(readyClient.user.id),
            { body: commands }
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
});

// Command handling
client.on(Events.InteractionCreate, async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    const command: BotCommand = require(`./commands/${interaction.commandName}.js`);
    
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
