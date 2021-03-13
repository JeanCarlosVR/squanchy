const Discord = require("discord.js");

module.exports = {
  name: "softban",
  category: "moderation",
  description: "Ban and remove that ban from the user instantly..",
  usage: "<prefix>softban <mentionUser> [reason]",
  run: async function run(client, message, args) {

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN_MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "> I need `BAN MEMBERS` permissions to be able to softban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    if(!member) return message.channel.send({embed: embedMention})
    
    let embedIsOwner = new Discord.MessageEmbed()

      .setDescription("This user is the owner guild.")
      .setColor('#2f3136')

    if (member === message.guild.owner)
      return message.channel.send({embed: embedIsOwner});

    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant softban this user. It is likely that my role is below it.")
      .setColor('#2f3136')

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "None reason.";

    var embedSoftban = new Discord.MessageEmbed()
      .setTitle("Soft-Ban")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .addField("Reason", reason)
      .setTimestamp()
      .setColor('#2f3136')

    await member
      .ban(reason)
      .then(async ban => {
        await message.guild.members.unban(member);
      })
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  
    message.guild
      .send({embed: embedSoftban})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );  
}
}