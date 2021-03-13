const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");

module.exports = {
  name: "warn",
  category: "moderation",
  description: "Warn a user in this guild.",
  usage: "<prefix>warn <mentionChannel> [reason]",
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    let memberTo = message.mentions.members.first() || client.users.cache.get(args[0]);
    if (!memberTo) return message.channel.send({ embed: embedMention });
    
    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant warn this user. It is likely that my role is below it.")
      .setColor('#2f3136')
    
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "None reason";

    if (!warnDB.tiene(`${message.guild.id}.${memberTo.id}`)) {
      warnDB.establecer(`${message.guild.id}.${memberTo.id}`, 1);
    } else {
      warnDB.sumar(`${message.guild.id}.${memberTo.id}`, 1);
    }

    let memberWarnCount = await warnDB.obtener(
      `${message.guild.id}.${memberTo.id}`
    );

    var embedWarn = new Discord.MessageEmbed()
      .setTitle("Warning")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${memberTo.id}>`, true)
      .addField("Reason", `${reason}`, true)
      .addField("Warnings", `${memberWarnCount}`, true)
      .setTimestamp()
      .setColor('#2f3136')

    return message.channel.send({embed: embedWarn});
}
}