const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  category: "fun",
  description: "Get a random meme.",
  usage: "[]",
  run: async function run(client, message, args) {
    const { image } = await fetch("https://some-random-api.ml/meme").then(response =>
      response.json()
    );

    let embedPicture = new Discord.MessageEmbed().setImage(image).setColor('#2f3136');

    return message.channel
      .send({embed: embedPicture})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );  
}
}