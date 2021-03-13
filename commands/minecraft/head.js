const Discord = require("discord.js");

module.exports = {
  name: "mchead",
  category: "minecraft",
  description: "",
  usage: "<prefix>mchead <usernameMinecraft>",
  run: async function run(client, message, args) {
    const head = args.join(" ");

    let embedType = new Discord.MessageEmbed()

      .setDescription(`Type a username to search.`)
      .setColor('#2f3136')
    
    if(!head)
      return message.channel.send({embed: embedType})

    let headembed = new Discord.MessageEmbed()

      .setTitle(`Head of ${head}`)
      .setImage("http://cravatar.eu/head/" + `${head}` + "/600.png")
      .setColor('#2f3136')

    return message.channel
      .send(headembed)
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}