const Discord = require("discord.js");

module.exports = {
  name: "stats",
  category: "bot",
  description: "Watch stats bot.",
  usage: "[]",
  run: async function run(client, message, args) {
    let embed = new Discord.MessageEmbed()

      .setDescription(
        `${client.guilds.cache.size} Guilds with ${client.channels.cache.size} channels in those who speak ${client.users.cache.size} users.`
      )
      .setColor('#2f3136')

    return message.channel
      .send(embed)
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );  
}
}