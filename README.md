# Discord Bot Tutorial - TypeScript

A Discord bot built with TypeScript using discord.js v14.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example` and add your Discord bot token:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Start the bot:
   ```bash
   npm start
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
