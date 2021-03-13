const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");

module.exports = {
  name: "clear-warns",
  category: "moderation",
  description: "Clear current user warnings in this guild.",
  usage: "<prefix>clear-warns <mentionUser>",
  aliases: ["cw"],
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    let memberTo = message.mentions.members.first();
    if (!memberTo) return message.channel.send({ embed: embedMention });


    await warnDB.establecer(`${message.guild.id}.${memberTo.id}`, 0);
    
    var embedWarn = new Discord.MessageEmbed()
      .setTitle("Warnings Cleared")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${memberTo.id}>`, true)
      .setTimestamp()
      .setColor('#2f3136')

    return message.channel.send({embed: embedWarn});
}
}