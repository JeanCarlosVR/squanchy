const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "prefix",
  category: "bot",
  description: "Get the actual prefix in actual guild.",
  usage: "[]",
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let embedPrefix = new Discord.MessageEmbed()

      .setTitle("Prefix")
      .setDescription(prefix)

      .setTimestamp(message.createdAt)
      .setColor('#2f3136')

    return message.channel
      .send({embed: embedPrefix})

      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}