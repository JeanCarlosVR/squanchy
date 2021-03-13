const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "nsfw",
  category: "nsfw",
  description: "Explicit content.",
  usage: "[]",
  run: async function run(client, message, args) {
    const nsfwemoji = client.emojis.cache.get("585783907660857354");
    
    if (!message.channel.nsfw)
      return message.channel.send(
        `${nsfwemoji} This command only work in NSFW channels`
      );

    const { src } = await fetch("http://titsnarse.co.uk/random_json.php").then(
      response => response.json()
    );

    var embedNsfw = new Discord.MessageEmbed()

      .setImage("http://titsnarse.co.uk/" + src)
      .setColor('#2f3136');

    return message.channel
      .send({embed: embedNsfw})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}