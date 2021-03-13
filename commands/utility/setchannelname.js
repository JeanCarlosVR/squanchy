const Discord = require("discord.js");

module.exports = {
  name: "setchannelname",
  category: "utility",
  description: "Set the channel name.",
  usage: "[]",
  aliases: ["chname"],
  run: async function run(client, message, args) {
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE CHANNELS` permission to use this command.")
      .setColor("#ff0061");

    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        "> I need `MANAGE CHANNELS` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedType = new Discord.MessageEmbed()
      
      .setDescription('You need type a name for change it, this need a minimum number of characters of 2, and maximum 100.')
      .setColor('#2f3136')
    
    let embedType2 = new Discord.MessageEmbed()
      
      .setDescription('You need mention a channel.')
      .setColor('#2f3136')
    
    let channelToChange = message.mentions.channels.first() || client.channels.cache.get(args[0])
    if(!channelToChange) return message.channel.send({embed: embedType2})

    var name = args.join(" ").slice(22);
    if (!name || (name && (name.length < 2 || name.length > 100)))
      return message.channel.send({embed: embedType});
    
    let embedNew = new Discord.MessageEmbed()
      
      .setDescription(`The name channel is now "${name}".`)
      .setColor('#2f3136')

    return channelToChange
      .setName(name)
      .then(m => message.channel.send({embed: embedNew}))
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}