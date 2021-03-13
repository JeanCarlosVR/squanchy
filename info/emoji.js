const Discord = require("discord.js");

module.exports = {
  name: "emojiinfo",
  category: "info",
  description: "See emoji info.",
  usage: "<prefix>emojilinfo [emojiName]",
  aliases: ["emoji"],
  run: async function run(client, message, args) {
    
    let bolean = {
      true: "Yes",
      false: "Not"
    }
    
    const embedType = new Discord.MessageEmbed()
    
      .setDescription('Please type a emoji name.')
      .setColor('#2f3136')
    
    if(!args[0]) return message.channel.send({embed: embedType})
    
    const embedUnk = new Discord.MessageEmbed()
    
      .setDescription('This emoji does not exist.')
      .setColor('#2f3136')
    
    var emoji = message.guild.emojis.cache.find(emoji => emoji.name == args[0])
    if(!emoji) return message.channel.send({embed: embedUnk})
    
    if(emoji.animated === true){
      let embedChannelInfo = new Discord.MessageEmbed()
    
      .setAuthor("Emoji", message.guild.iconURL())
      .addField(`ID`, emoji.id, true)
      .addField(`Name`, emoji.name, true)
      .addField(`Animated`, bolean[emoji.animated], true)
      .addField(`Available`, bolean[emoji.available], true)
      .addField(`Emoji Link`, `[Emoji](https://cdn.discordapp.com/emojis/${emoji.id}.gif)`, true)
      .setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.gif`)
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedChannelInfo})
    } else {
    
    let embedChannelInfo = new Discord.MessageEmbed()
    
      .setAuthor("Emoji", message.guild.iconURL())
      .addField(`ID`, emoji.id, true)
      .addField(`Name`, emoji.name, true)
      .addField(`Animated`, bolean[emoji.animated], true)
      .addField(`Available`, bolean[emoji.available], true)
      .addField(`Emoji Link`, `[Emoji](https://cdn.discordapp.com/emojis/${emoji.id})`, true)
      .setImage(`https://cdn.discordapp.com/emojis/${emoji.id}`)
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedChannelInfo})
    }
}
}