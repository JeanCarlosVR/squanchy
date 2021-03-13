const Discord = require("discord.js");
const ms = require("ms");
const humanizeDuration = require('humanize-duration');
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "tempban",
  category: "moderation",
  description: "Temporaly Ban a user from the current guild.",
  usage: "<prefix>tempban <mentionUser> <time> [reason]",
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
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
    
    let embedUsageTime = new Discord.MessageEmbed()

      .setDescription(`You need to specify the time (10m, 10minutes, 10h, 10hours, etc). Usage: \`${prefix}tempban <mentionUser> <time> [reason]\``)
      .setColor('#2f3136')
    
    let time = args[1]
    if(!time) return message.channel.send({embed: embedUsageTime})
    let timer = ms(time);

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "None reason.";

    let embedBan = new Discord.MessageEmbed()
      .setTitle(`Temporal Ban (#${member.user.id})`)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .addField("Time", humanizeDuration(timer), true)
      .addField("Reason", reason)
      .setTimestamp()
      .setColor('#2f3136')

    await message.channel
      .send({embed: embedBan})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
    
    await member
      .ban({reason: reason})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
    
    await setTimeout(async function() {
      await message.guild.members.unban(member.id).catch(console.log('Nothing unban'))
      
      let embedUnBan = new Discord.MessageEmbed()
      .setTitle(`Endly Temporal Ban (#${member.user.id})`)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .setTimestamp()
      .setColor('#2f3136')
    
      await message.channel
        .send({embed: embedUnBan})
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    }, timer);
}
}