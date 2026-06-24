import 'dotenv/config';

// Used to make requests to Discord API
export async function DiscordRequest(endpoint, options) {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;

    // Stringify payload
    if (options.body) {
        options.body = JSON.stringify(options.body);
    }

    // Use node-fetch to make requests
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/unidirectrix/discord-hello-bot, 1.0.0)',
        },
        ...options
    });

    // throw API errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    // return original response
    return res;
}

// install commands Globally
export async function InstallGlobalCommands(appId, commands) {
    // API endpoint to *overwrite* global commands
    const endpoint = `applications/${appId}/commands`;

    // bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    try {
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
}