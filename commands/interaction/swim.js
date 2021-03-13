const Discord = require("discord.js");

module.exports = {
  name: "swim",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    var embed = new Discord.MessageEmbed()

      .setTitle(`${message.author.username} Swim in a rare place.`)
      .setImage(
        "https://i.giphy.com/media/jAaZrqnaxchHy/giphy.webp"
      )
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