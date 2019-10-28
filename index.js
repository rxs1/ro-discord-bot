const Discord = require('discord.js');
const client = new Discord.Client();
const token_bot = 'NjM4MzY2MDQ3Mjg3NzcxMTU2.Xbbssw.5LDtOGTqg8MUiYxj2PebQeBfJmo';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
    if (msg.content === '!ping') {
        msg.reply('Pong!')
    }
});


client.login(token_bot);
