const Discord = require("discord.js");

module.exports = {
  name: "emojis",
  category: "utility",
  description: "See all emojis.",
  usage: "<prefix>emojis",
  aliases: ["emojilist"],
  run: async function run(client, message, args) {
    
    let emojiMap = message.guild.emojis.cache.map(e => e.toString()).join(" ") || "No emojis";
    
    let embedError = new Discord.MessageEmbed()
    
      .setDescription('Sorry, I cant show the emojis because exist many emojis.')
      .setColor('#2f3136')
    
    return message.channel.send(emojiMap.slice(0, 2000).split(" ")[0]).catch(m => message.channel.send({embed: embedError}))
}
}