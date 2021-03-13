const Discord = require("discord.js");

module.exports = {
  name: "setnickname",
  category: "utility",
  description: "Change a nickname.",
  usage: "[]",
  aliases: ["nickname"],
  run: async function run(client, message, args) {
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')
    
    let embedNickname = new Discord.MessageEmbed()

      .setDescription(`You need put a new nickname.`)
      .setColor('#2f3136')
    
    let embedPerms = new Discord.MessageEmbed()

      .setDescription(`I am below your highest role please assign me a higher role than yours.`)
      .setColor('#2f3136')
    
    
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE NICKNAMES` permission to use this command.")
      .setColor("#ff0061");

    if (!message.member.permissions.has("MANAGE_NICKNAMES"))
      return message.channel.send({ embed: embedNoPermissions });
    
    if (!message.member.guild.me.permissions.has("MANAGE_NICKNAMES"))
      return message.channel.send(
        "> I need `MANAGE NICKNAMES` permissions to be able to kick. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
    );
    
    if (!member) return message.channel.send({ embed: embedMention });
    
    let newNickname = args.slice(1).join(" ")
    if(!newNickname) return message.channel.send({embed: embedNickname});
    
    let embedReady = new Discord.MessageEmbed()
    
      .setDescription(`${member} has been assigned the new nickname of **${newNickname}**`)
      .setColor('#2f3136')
    
    member.setNickname(newNickname).then(m => message.channel.send({embed: embedReady})).catch(m => message.channel.send({embed: embedPerms}))
}
}