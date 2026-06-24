import 'dotenv/config';
import express from 'express';
import {
    InteractionResponseFlags,
    InteractionResponseType,
    InteractionType,
    MessageComponentTypes,
    verifyKeyMiddleware
} from 'discord-interactions';
import { DiscordRequest } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction type and data
    const { type, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    // Handle slash command requests
    // See https://discord.com/developers/docs/interactions/application-commands#slash-commands

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        if (name === 'hello') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data : {
                    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
                    components: [
                        {
                            type: MessageComponentTypes.TEXT_DISPLAY,
                            content: 'Hello World!',
                        }
                    ]
                },
            });
        }

        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'uknown command' });
    }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type '});
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});