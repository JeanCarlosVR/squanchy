const Discord = require("discord.js");

module.exports = {
  name: "cry",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    let member = message.mentions.members.first() || message.author;

    let embed = new Discord.MessageEmbed()

      .setDescription(`<@${member.id}> is cry.`)
      .setImage("https://media3.giphy.com/media/TW8Ma1a8ZsZ8I/giphy.gif")
      .setColor("#ff0061");

    message.channel
      .send(embed)
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}