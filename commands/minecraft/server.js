const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "mcserver",
  category: "minecraft",
  description: "Watch status about minecraft server.",
  usage: "<prefix>mcserver <serverIP>",
  run: async function run(client, message, args) {

    let embedType = new Discord.MessageEmbed()

      .setDescription(`Type a IP to search it.`)
      .setColor('#2f3136')
    
    const ip = args[0]

    if (!ip)
      return message.channel.send({embed: embedType});
    
    const { hostname, online, version } = await fetch(`https://api.mcsrvstat.us/2/${ip}`).then(response => response.json());
    
    let onlineStatus = {
      true: "Online",
      false: "Offline"
    }

    let embedMC = new Discord.MessageEmbed()
    
    
      .addField('Server IP', hostname, true)
      .addField('Status', onlineStatus[online], true)
      .addField('Version', version || "None", true)
      .setImage(
        `http://status.mclive.eu/${hostname}/${ip}/25565/banner.png`
      )
      .setColor('#2f3136')

    return message.channel
      .send({embed: embedMC})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}