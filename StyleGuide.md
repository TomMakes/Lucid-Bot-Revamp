# Overview
This file describes how to add certain functionality to the bot.
Right now I only cover creating commands, but in the future I want to describe:
- Creating Commands
- Writing Unit Tests
- Adding a database table
- Database CRUD
- Creating Discord dialogues
- Managing user information

## Creating Commands
Each command will exist in it's own file, which is named the same as the command name.
Ex: search.ts contains the /search command.

Each command will have a unit testing file. Ping CalmTides on discord if you need help with creating this.

Once a command file is created, index.ts will automatically detect it and load it onto the bot.
Once the bot is running, you should be able to use the command successfully.

Using AI is fine to create the new command but please test it by running the bot and using the command.