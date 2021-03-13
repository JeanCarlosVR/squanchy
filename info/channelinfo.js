const Discord = require("discord.js");

module.exports = {
  name: "channelinfo",
  category: "info",
  description: "See the channel info.",
  usage: "<prefix>channelinfo [mentionChannel]",
  aliases: ["channel"],
  run: async function run(client, message, args) {
    
    let nsfwIf = {
      true: ":underage: NSFW",
      false: "No NSFW"
    }
    
    let typeChannel = {
      text: "Text",
      voice: "Voice",
      store: "Store",
      news: "News",
      category: "Category",
      dm: "DM"
    }
    
    const channelEmoji = client.emojis.cache.get("585783907841212418");
    
    let channelName = message.mentions.channels.first() || message.channel
    
    let embedChannelInfo = new Discord.MessageEmbed()
    
    .setAuthor(channelName.name, message.guild.iconURL())
    .addField(`${channelEmoji} Channel Name`, `<#${channelName.id}>`, true)
    .addField(`${channelEmoji} Channel ID`, channelName.id, true)
    .addField(`${channelEmoji} Channel Type`, typeChannel[channelName.type] || "Unknown", true)
    .addField(`${channelEmoji} Channel Topic`, channelName.topic || 'Nothing', true)
    .addField(`${channelEmoji} Channel Creation`, channelName.createdAt.toDateString(), true)
    .addField(`${channelEmoji} Channel Nsfw`, nsfwIf[channelName.nsfw] || "No NSFW", true)
    .addField(`${channelEmoji} Category Position`, channelName.position + 1, true)
    .setColor('#2f3136')
    
    return message.channel.send({embed: embedChannelInfo})
}
}