const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");

module.exports = {
  name: "clear",
  category: "moderation",
  description: "Clear a certain amount of messages from the current channel.",
  usage: "<prefix>clear <lines>",
  run: async function run(client, message, args) {
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE MESSAGES` permission to use this command."
      )
      .setColor("#2f3136");

    let embedProvideValidNumber = new Discord.MessageEmbed()

      .setDescription(
        "Please provide a number from 2 to 100 to delete the desired messages."
      )
      .setColor("#2f3136");

    let embedJustNumbers = new Discord.MessageEmbed()

      .setDescription("You just write numbers.")
      .setColor("#2f3136");

    let embedOldMessages = new Discord.MessageEmbed()

      .setDescription("I cannot delete messages older than 2 weeks.")
      .setColor("#2f3136");

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "> I need `MANAGE MESSAGES` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    const deleteCount = parseInt(args[0], 10);

    if (isNaN(deleteCount))
      return message.channel.send({ embed: embedJustNumbers });

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send({ embed: embedProvideValidNumber });

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount
    });

    let embedDeletedMessages = new Discord.MessageEmbed()

      .setDescription("Messages deleted successfully.")
      .setColor("#2f3136");

    message.channel
      .bulkDelete(fetched, true)
      .then(m => message.channel.send({ embed: embedDeletedMessages }))
      .then(message => message.delete({ timeout: 5000, reason: "Cleaning" }))
  }
};
