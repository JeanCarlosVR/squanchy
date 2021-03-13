const Discord = require("discord.js");

module.exports = {
  name: "channels",
  category: "info",
  description: "See a list of all channels.",
  usage: "<prefix>channels",
  aliases: ["channelslist"],
  run: async function run(client, message, args) {
    
    let channelList = message.guild.channels.cache.map(channel => channel.name).join(" \n")
    
    const embedChannels = new Discord.MessageEmbed()
    
      .setTitle('List Channels')
      .setDescription(channelList)
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedChannels})
}
}