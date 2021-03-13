const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  category: "bot",
  description: "See all information bot.",
  usage: "[]",
  run: async function run(client, message, args) {
    
    let embedInfo = new Discord.MessageEmbed()

      .setAuthor("Squanchy Information", client.user.avatarURL())
      .addField("Owner", `Jean#3897`, true)
      .addField("Name", `${client.user.username}`, true)
      .addField("Library", `Discord.js ${Discord.version}`, false)
      .addField("Status", `<:online:313956277808005120> Online ${Math.round(client.ws.ping)}ms`, false)
      .addField("Creation", client.user.createdAt.toDateString(), true)
      .addField("Joined", message.member.joinedAt.toDateString(), true)
      .addField("Prensence", `${client.user.presence.activities}` || 'Nothing', false)
      .addField("Guilds", `${client.guilds.cache.size}`, true)
      .addField("Channels", `${client.channels.cache.size}`, true)
      .addField("Users", `${client.users.cache.size}`, true)
      .addField("Emojis", `${client.emojis.cache.size}`, true)
      .addField("Commands", `${client.commands.size}`, true)
      .addField("Links", "[Web](https://waifuu.glitch.me/) | [Support](https://discord.gg/yYsj8p4) | [Invite](https://discord.com/api/oauth2/authorize?client_id=637108716151504926&permissions=2147352311&redirect_uri=https%3A%2F%2Fwaifuu.glitch.me%2F&scope=bot)", false)
      .setColor('#2f3136')
      .setThumbnail(client.user.avatarURL())

    return message.channel
      .send({embed: embedInfo})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}