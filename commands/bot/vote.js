const Discord = require("discord.js");

module.exports = {
  name: "vote",
  category: "bot",
  description: "Watch stats bot.",
  usage: "[]",
  aliases: ["v", "bump"],
  run: async function run(client, message, args) {
    let embed = new Discord.MessageEmbed()

      .setDescription(`Vote for ${client.user.username} for me to have support and keep improving the bot **[HERE](https://botsfordiscord.com/bot/637108716151504926/vote)**`)
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