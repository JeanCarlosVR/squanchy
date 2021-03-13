const Discord = require("discord.js");

module.exports = {
  name: "say",
  category: "fun",
  description: "Say anything in name of bot.",
  usage: "<prefix>say <Text>",
  run: async function run(client, message, args) {
    
    let embedType = new Discord.MessageEmbed()

      .setDescription("You need type a text to say in name of bot.")
      .setColor('#2f3136')
    
    const description = args.join(" ");
    if (!description)
      return message.channel.send({embed: embedType});
    
    let embedSayIt = new Discord.MessageEmbed()

      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(description)
      .setColor('#2f3136')

    
    message.delete({timeout: 100, reason: 'None'}).then(m =>
    message.channel
      .send({embed: embedSayIt}))
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}