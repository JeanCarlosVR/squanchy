const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");

module.exports = {
  name: "check-warns",
  category: "moderation",
  description: "Check the current warnings of a user in this guild.",
  usage: "<prefix>check-warns <mentionUser>",
  aliases: ["cws"],
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let memberTo = message.mentions.members.first();
    if (!memberTo) return message.channel.send({ embed: embedMention });

    let embedOne = new Discord.MessageEmbed()

      .setDescription("This user not have warnings.")
      .setColor('#2f3136')

    if (!warnDB.tiene(`${message.guild.id}.${memberTo.id}`)) {
      message.channel.send(embedOne);
    } else {
      let memberWarnCount = await warnDB.obtener(
        `${message.guild.id}.${memberTo.id}`
      );

      let embedTwo = new Discord.MessageEmbed()

        .addField("User", `<@${memberTo.id}>`, true)
        .addField("Warnings", `${memberWarnCount}`, true)
        .setColor('#2f3136')

      message.channel.send({embed: embedTwo});
    }
}
}