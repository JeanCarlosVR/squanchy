const Discord = require("discord.js");

module.exports = {
  name: "yesornot",
  category: "polls",
  description: "Normal poll of yes or not.",
  usage: "[]",
  aliases: ["yn"],
  run: async function run(client, message, args) {
    var text = args.join(" ");
    var textstring = text.split("|");
    var [title, description, timer] = textstring;
    
    let embedType = new Discord.MessageEmbed()
      .setDescription('You need type minimun a title. Usage: `<prefix>yorn Question|Description`')
      .setColor('#2f3136')

    if (!title)
      return message.channel
        .send({embed: embedType})
        .then(function(message) {
          message.delete({timeout: 5000, reason: 'None'});
        });

    if (!description) description = '** **'

    var embed = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    message.channel
      .send({ embed: embed })
      .then(async embedMessage => {
        await embedMessage.react("✅"), await embedMessage.react("❌");
      })
      .catch(error =>
        message.channel.send(
          `> A error has been ocurred, please contact Jean#3897, error: ${error}`
        )
      );
}
}