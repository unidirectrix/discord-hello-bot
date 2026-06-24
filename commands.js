import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Write down the structure of your slash commands here
const HELLO_COMMAND = {
    name: 'hello',
    description: 'Greets hello to you',
};


InstallGlobalCommands(process.env.APP_ID, HELLO_COMMAND);