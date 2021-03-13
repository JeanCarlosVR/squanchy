const Discord = require("discord.js");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "clear-bots",
  category: "moderation",
  description: "Clear the messages of all bots.",
  usage: "<prefix>clear-bot",
  aliases: ["cb"],
  run: async function run(client, message, args) {
    
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
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });
      
      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Relax bro wait ${remaining}.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {
    
    await message.react("👍")
    
    await message.channel.messages.fetch({
      limit: 100
    }).then((msgCollection) => {
      msgCollection.forEach((message) => {
        if(message.author.bot){
          message.delete();
        }
      })
    })
    cooldownRecently.set(message.author.id, Date.now() + 15000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 15000);
    }
    
  }
};
