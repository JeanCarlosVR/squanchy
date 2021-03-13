const Discord = require("discord.js");

module.exports = {
  name: "botsupport",
  category: "bot",
  description: "Get help links.",
  usage: "[]",
  run: async function run(client, message, args) {
    var support = new Discord.MessageEmbed()

      .setTitle("Squanchy Support Server")
      .setDescription(
        "Here you can get support on the bot, you can also report to the owner the errors, bugs or other issues related to them."
      )
      .addField("Documentation", "https://waifuu.glitch.me/", true)
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    message.channel
      .send({embed: support})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}