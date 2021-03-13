const Discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "View your latency.",
  usage: "<prefix>ping",
  run: async function run(client, message) {
    let embedPingQuestion = new Discord.MessageEmbed()

      .setDescription("Ping?")
      .setColor('#2f3136')

    let m = await message.channel.send({ embed: embedPingQuestion });

    let embedConnectionPing = new Discord.MessageEmbed()

      .setDescription(
        `Pong!! \n \n:satellite: Discord API **${m.createdTimestamp -
          message.createdTimestamp}**ms \n:robot: Client **${Math.round(
          client.ws.ping
        )}**ms`
      )
      .setColor('#2f3136')

    setTimeout(function() {
      m.edit({ embed: embedConnectionPing });
    }, 2000);
}
}