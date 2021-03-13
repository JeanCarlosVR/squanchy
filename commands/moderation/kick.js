const Discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick a user from the current guild.",
  usage: "<prefix>ban <mentionUser> [reason]",
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `KICK_MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        "> I need `KICK MEMBERS` permissions to be able to kick. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let member = message.guild.member(
      message.mentions.users.first()  || message.guild.members.cache.get(args[0])
    );
    
    if (!member) return message.channel.send({ embed: embedMention });
    
    let embedIsOwner = new Discord.MessageEmbed()

      .setDescription("This user is the owner guild.")
      .setColor('#2f3136')

    if (member === message.guild.owner)
      return message.channel.send({embed: embedIsOwner});
    
    let embedKickeable = new Discord.MessageEmbed()

      .setDescription("I cant kick this user. It is likely that my role is below it.")
      .setColor('#2f3136')

    if (!member.kickable)
      return message.channel.send({embed: embedKickeable});

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "None reason";

    let embedKick = new Discord.MessageEmbed()
      .setTitle("Kick")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .addField("Reason", reason)
      .setTimestamp()
      .setColor('#2f3136')

    let guildname = message.guild.name;

    await member
      .kick({reason: reason})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );

    message.channel.send({embed: embedKick})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}