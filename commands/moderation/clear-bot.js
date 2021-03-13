const Discord = require("discord.js");

module.exports = {
  name: "clear-squanchy",
  category: "moderation",
  description: "Clear the messages of bot.",
  usage: "<prefix>clear-bot",
  aliases: ["cs"],
  run: async function run(client, message, args) {

    if(message.author.id !== "525842461655040011") return;
    
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE MESSAGES` permission to use this command."
      )
      .setColor("#2f3136");

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "> I need `MANAGE MESSAGES` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    
    await message.react("👍")
    
    await message.channel.messages.fetch({
      limit: 100
    }).then((msgCollection) => {
      msgCollection.forEach((message) => {
        if(message.author.id == client.user.id) {
          message.delete();
        }
      })
    })
    
  }
};
