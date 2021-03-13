const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "fact",
  category: "fun",
  description: "Get news and interesting facts.",
  usage: "[]",
  run: async function run(client, message, args) {
    const { text } = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    ).then(response => response.json());

    const embedFact = new Discord.MessageEmbed()

      .setDescription(`${text}`)
      .setColor("#2f3136");

    message.channel
      .send({ embed: embedFact })
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  }
};
