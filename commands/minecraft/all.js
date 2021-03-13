const Discord = require("discord.js");

module.exports = {
  name: "mcallskin",
  category: "minecraft",
  description: "",
  usage: "<prefix>mcallskin <usernameMinecraft>",
  run: async function run(client, message, args) {
    const skin = args.join(" ");

    let embedType = new Discord.MessageEmbed()

      .setDescription(`Type a username to search.`)
     .setColor('#2f3136')
    
    if(!skin)
      return message.channel.send({embed: embedType})

    let skinembed = new Discord.MessageEmbed()

      .setTitle(`All skin of ${skin}`)
      .setDescription(`[Download](https://minotar.net/download/${skin})`)
      .setImage(`https://minotar.net/skin/${skin}`)
      .setColor('#2f3136')

    return message.channel
      .send(skinembed)
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}