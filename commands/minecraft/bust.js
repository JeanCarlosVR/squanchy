const Discord = require("discord.js");

module.exports = {
  name: "mcbust",
  category: "minecraft",
  description: "",
  usage: "<prefix>mcbust <usernameMinecraft>",
  run: async function run(client, message, args) {
    const skin = args.join(" ");

    let embedType = new Discord.MessageEmbed()

      .setDescription(`Type a username to search.`)
     .setColor('#2f3136')
    
    if(!skin)
      return message.channel.send({embed: embedType})

    let skinembed = new Discord.MessageEmbed()

      .setTitle(`Bust of ${skin}`)
      .setImage(`https://minotar.net/bust/${skin}/200.png`)
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