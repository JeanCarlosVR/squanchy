const Discord = require("discord.js");

module.exports = {
  name: "lock",
  category: "moderation",
  description: "Lock this channel for users.",
  usage: "<prefix>lock <mentionChannel>",
  run: async function run(client, message) {
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE CHANNELS` permission to use this command."
      )
      .setColor("#2f3136");

    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        "> I need `MANAGE CHANNELS` permissions to be able to lock channels. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let embedMention = new Discord.MessageEmbed()

      .setDescription("You need mention a channel.")
      .setColor("#2f3136");

    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({ embed: embedMention });

    channel.updateOverwrite(message.channel.guild.roles.everyone, {
      SEND_MESSAGES: false
    });

    let embed = new Discord.MessageEmbed()
      .setTitle("Lock")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("Channel", `<#${channel.id}>`, true)
      .setTimestamp()
      .setColor("#2f3136");

    return message.channel
      .send(embed)
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  }
};
