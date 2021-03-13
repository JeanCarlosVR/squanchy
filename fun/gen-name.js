const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "gen-name",
  category: "fun",
  description: "Generate new names.",
  usage: "<prefix>gen-name",
  run: async function run(client, message, args) {
    const { name } = await fetch("https://nekos.life/api/v2/name").then(response =>
      response.json()
    );

    let embedPicture = new Discord.MessageEmbed().setDescription(name).setColor('#2f3136');

    return message.channel
      .send({embed: embedPicture})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );  
}
}