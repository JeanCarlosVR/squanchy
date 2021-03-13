const Discord = require("discord.js");

module.exports = {
  name: "blush",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    let member = message.mentions.members.first() || message.author;

    let embed = new Discord.MessageEmbed()

      .setDescription(`<@${member.id}> is blush.`)
      .setImage("https://media.giphy.com/media/OpfkuToK5gSHK/giphy.gif")
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