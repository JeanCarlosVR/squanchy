const Discord = require("discord.js");

module.exports = {
  name: "memory",
  category: "bot",
  description: "Get information  about memory bot.",
  usage: "[]",
  aliases: ["mem"],
  run: async function run(client, message, args) {
    if(message.author.id !== "525842461655040011") return;
    
    let embed = new Discord.MessageEmbed()
    
    .addField(`Memory`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / 5 ZB`, true)
    .setColor('#2f3136')
    
    return message.channel.send({embed: embed})
}
}