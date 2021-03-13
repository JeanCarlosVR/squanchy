const Discord = require("discord.js");

module.exports = {
  name: "mchystats",
  category: "minecraft",
  description: "",
  usage: "<prefix>mchystats <usernameMinecraft>",
  run: async function run(client, message, args) {
    const name = args.join(" ");

    let embedType = new Discord.MessageEmbed()

      .setDescription(`Type a username to search.`)
      .setColor('#2f3136')
    
    if(!name)
      return message.channel.send({embed: embedType})

    let stats = new Discord.MessageEmbed()

      .setTitle(`Stats of ${name}`)
      .setImage(`https://gen.plancke.io/exp/` + `${name}.png`)
      .setFooter("Stats from Hypixel")
      .setColor('#2f3136')

    return message.channel
      .send(stats)
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}