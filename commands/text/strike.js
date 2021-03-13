const Discord = require("discord.js");

module.exports = {
  name: "strike",
  category: "text",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    let embedType = new Discord.MessageEmbed()
      
      .setDescription('Please type text to show.')
      .setColor('#2f3136')
  
    var text = args.join(" ");
    if (!text) return message.channel.send({embed: embedType});
    
    
    let embedSay = new Discord.MessageEmbed()

      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription("~~" + text + "~~")
      .setColor('#2f3136')
    
    return message.channel
      .send({embed: embedSay})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}