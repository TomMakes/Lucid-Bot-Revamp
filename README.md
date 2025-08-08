# Discord Bot Tutorial - TypeScript

A Discord bot that will be used to replace Lucid Bot.
Right now it is very much in development.

## Setup

1. **Set up Discord Bot:**
   - Go to Discord Developer Portal
   - Create application/bot
   - Navigate to Bot tab
   - Copy bot token (click "Reset Token" under Token header, you can reset unlimited times)
   - Navigate to OAuth2 tab
   - Select these scopes: bot, applications.commands
   - Copy the Generated URL towards bottom of page
   - Paste that into web broswer and invite bot to desired server

2. **Get the environment set up**
   - Open up a command prompt or other terminal inside this folder.
   - Install dependencies:
      ```bash
      npm install
      ```
   - Create a `.env` file based on `.env.example` and add your Discord bot token:
      ```
      DISCORD_TOKEN=your_discord_bot_token_here
      ```
   - Start the bot:
      ```bash
      npm run start
      ```

## Development

For development with TypeScript hot reloading:
```bash
npm run dev
```

## Project Structure

- `src/` - TypeScript source files
  - `index.ts` - Main bot entry point
  - `commands/` - Slash command implementations
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
- `assets/` - Static assets and data files
- `dist/` - Compiled JavaScript output (auto-generated)

## Commands

- `/search` - Search for something mysterious!

## TypeScript Features

- Full type safety with strict TypeScript configuration
- Proper typing for Discord.js interactions
- Modular architecture with typed interfaces
- Source maps for debugging
