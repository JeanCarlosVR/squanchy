const Discord = require("discord.js");

module.exports = {
  name: "trash",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    let embed = new Discord.MessageEmbed()

      .setTitle(`${message.author.username} Get in the trash...`)
      .setImage("https://media2.giphy.com/media/acttIrNAHaoco/giphy.gif")
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