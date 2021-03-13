const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hug",
  category: "interaction",
  description: "Interact with other people showing reactions and actions.",
  usage: "<prefix>hug",
  run: async function run(client, message, args) {
    let member = message.mentions.members.first();
    
    const { link } = await fetch("https://some-random-api.ml/animu/hug").then(
      response => response.json()
    );
    
    let embedNoMention = new Discord.MessageEmbed()

      .setDescription(`**${message.author.username}** You didn't mention anyone, don't worry, I give you a hug`)
      .setImage(link)
      .setColor("#ff0061");


    if (!member) return message.channel.send({embed: embedNoMention});

    let embedMention = new Discord.MessageEmbed()

      .setDescription(`**${message.author.username}** give a hug to **${member.user.tag}**`)
      .setImage(link)
      .setColor("#ff0061");

    message.channel
      .send({embed: embedMention})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}