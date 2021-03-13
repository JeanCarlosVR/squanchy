const Discord = require("discord.js");

module.exports = {
  name: "kill",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    let member = message.mentions.members.first();
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription("You have to mention a member of the server.")
      .setColor("#ff0061");

    if (!member)
      message.channel.send({embed: embedMention})

    let embed = new Discord.MessageEmbed()

      .setTitle(`${message.author.username} kill ${member.user.tag}`)
      .setImage("https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/1497533116-not-dead.gif")
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