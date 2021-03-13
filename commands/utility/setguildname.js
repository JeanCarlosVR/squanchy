const Discord = require("discord.js");

module.exports = {
  name: "setguildname",
  category: "utility",
  description: "Set the guild name.",
  usage: "[]",
  aliases: ["guildname"],
  run: async function run(client, message, args) {
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE GUILD` permission to use this command.")
      .setColor("#ff0061");

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "> I need `MANAGE GUILD` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedType = new Discord.MessageEmbed()
      
      .setDescription('You need type a name for change it, this need a minimum number of characters of 2, and maximum 100.')
      .setColor('#2f3136')

    var name = args.join(" ");
    if (!name || (name && (name.length < 2 || name.length > 100)))
      return message.channel.send({embed: embedType});
    
    let embedNew = new Discord.MessageEmbed()
      
      .setDescription(`The name server is now "${message.guild.name}".`)
      .setColor('#2f3136')

    return message.guild
      .setName(name)
      .then(m => message.channel.send({embed: embedNew}))
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}