import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Write down the structure of your slash commands here
const HELLO_COMMAND = {
    name: 'hello',
    description: 'Greets hello to you',
};

let command_arr = [HELLO_COMMAND]

InstallGlobalCommands(process.env.APP_ID, command_arr);