const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: "The bot has been online."
  })
});

const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const client = new Discord.Client({disableMentions:'everyone'});

app.get('/', (req, res) => {
  res.json({
    id: client.user.id,
    username: client.user.username,
    avatar: client.user.avatarURL,
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  })
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();
client.events = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('ready',()=>{
    require('./events/ready')(client)
});
client.on('message',async message=>{
    message.member //-- GuildMember based
    message.author //-- User based
    require('./events/message')(client,message)
    require('./events/detectLinks')(client,message)
    require('./events/detectInvites')(client,message)
    require('./events/antiBad')(client,message)
});

app.listen(port, () => console.log(`Running this shit.`));
client.login(`${process.env.TOKEN}`).catch(e => console.log(e));