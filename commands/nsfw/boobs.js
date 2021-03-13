const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "boobs",
  category: "nsfw",
  description: "Explicit content.",
  usage: "[]",
  run: async function run(client, message, args) {
    const nsfwemoji = client.emojis.cache.get("585783907660857354");
    
    if (!message.channel.nsfw)
      return message.channel.send(
        `${nsfwemoji} This command only work in NSFW channels`
      );

    const { preview } = await fetch("http://api.oboobs.ru/boobs/0/1/random").then(
      response => response.json()
    );

    let embed = new Discord.MessageEmbed().setImage(`https://media.oboobs.ru/${preview}`).setColor('#2f3136');

    return message.channel
      .send({embed: embed})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}