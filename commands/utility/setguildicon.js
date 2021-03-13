const Discord = require("discord.js");

module.exports = {
  name: "setguildicon",
  category: "utility",
  description: "Set icon image of server.",
  usage: "[]",
  aliases: ["guildicon"],
  run: async function run(client, message, args) {
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE GUILD` permission to use this command.")
      .setColor("#ff0061");

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "> I need `MANAGE ROLES` and `MANAGE GUILD` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedType = new Discord.MessageEmbed()
    
      .setDescription('You need type a url for change it.')
      .setColor('#2f3136')

    var icon = args.join(" ");
    if (!icon)
      return message.channel.send({embed: embedType});

    var embedNewIcon = new Discord.MessageEmbed()
      .setTitle("The icon has been changed.")
      .setURL(icon)
      .setImage(icon)
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')
    
    let embedNo = new Discord.MessageEmbed()
    
      .setDescription('Please provided a valid link.')
      .setColor('#2f3136');

    return message.guild
      .setIcon(icon)
      .then(m => message.channel.send({embed: embedNewIcon}))
      .catch(error =>
        message.channel.send({embed: embedNo})
      );
  
}
}