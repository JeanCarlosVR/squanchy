const Discord = require('discord.js');
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = async function(client, message) {
  
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    let prefix;
    if (customprefix.tiene(`${message.guild.id}`)) {
      prefix = await customprefix.obtener(`${message.guild.id}`);
    } else {
      prefix = "w/";
    }
    
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!cmd) return;
    
    return cmd.run(client, message, args);
}