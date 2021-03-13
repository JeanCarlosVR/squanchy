const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "setprefix",
  category: "bot",
  description: "Set a new prefix to actual guild.",
  usage: "<prefix>setprefix <newPrefix>",
  run: async function run(client, message, args) {
    if (
      !message.member.permissions.has("MANAGE_GUILD") &&
      message.author.id !== process.env.OWNER
    )
      return message.channel.send(
        ":gear: You need `MANAGE GUILD` permission to use this command."
      );
    
    let embedType = new Discord.MessageEmbed()
    
      .setDescription('You need type a prefix to change it.')
      .setColor('#2f3136')

    if (!args[0])
      return message.channel.send({embed: embedType});
    customprefix.establecer(`${message.guild.id}`, args[0]);

    var embed = new Discord.MessageEmbed()
    
      .addField("New prefix", args[0])
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')

    return message.channel
      .send(embed)

      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}