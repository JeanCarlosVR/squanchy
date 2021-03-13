const Discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "bot",
  description: "Get links to invite bot.",
  usage: "[]",
  run: async function run(client, message, args) {
    let embed = new Discord.MessageEmbed()

      .setAuthor("Squanchy", client.user.avatarURL())
      .setTitle("Invite Links")
      .addField(
        "Recommended",
        "[Invite](https://discord.com/oauth2/authorize?client_id=637108716151504926&scope=bot&permissions=8&redirect_uri=https%3A%2F%2Fwaifuu.glitch.me%2F&response_type=code)",
        true
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    return message.channel
      .send(embed)
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}