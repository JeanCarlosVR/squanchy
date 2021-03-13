const Discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban a user from the current guild.",
  usage: "<prefix>ban <mentionUser> [reason]",
  run: async function run(client, message, args) {
    
    let member = message.guild.member(
      message.mentions.users.first() || client.users.cache.get(args[0])
    );
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "> I need `BAN MEMBERS` permissions to be able to ban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedOwner = new Discord.MessageEmbed()

      .setDescription("This user is the owner of the guild.")
      .setColor('#2f3136')
    
    if (member === message.guild.owner)
      return message.channel.send({embed: embedOwner});
    
    if (!member) return message.channel.send({ embed: embedMention });
    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant ban this user. It is likely that my role is below it.")
      .setColor('#2f3136')

    if (!member.bannable)
      return message.channel.send({embed: embedMember});

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "None reason.";

    let embedBan = new Discord.MessageEmbed()
      .setTitle(`Ban (#${member.user.id})`)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .addField("Reason", reason)
      .setTimestamp()
      .setColor('#2f3136')

    await member
      .ban({reason: reason})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );


    message.channel
      .send({embed: embedBan})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}