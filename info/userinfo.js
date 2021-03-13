const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  category: "info",
  description: "Watch the user info.",
  usage: "<prefix>userinfo [mentionUser]",
  aliases: ["user"],
  run: async function run(client, message, args) {
    let userm = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!userm) {
      let user = message.author;


      
     let botIf = {
        true: "A Bot",
        false: "Not a bot"
      }
     
    const onlineEmoji = client.emojis.cache.get("313956277808005120");
    const idleEmoji = client.emojis.cache.get("313956277220802560");
    const dndEmoji = client.emojis.cache.get("313956276893646850");
    const offEmoji = client.emojis.cache.get("31395627723771086");
    const streamingEmoji = client.emojis.cache.get("313956277132853248");
    const invisibleEmoji = client.emojis.cache.get("313956277107556352");
     
     let states = {
        online: `${onlineEmoji} Online`,
        idle: `${idleEmoji} AFK`,
        dnd: `${dndEmoji} Do Not Disturb`,
        offline: `${offEmoji} Offline`,
        streaming: `${streamingEmoji} Streaming`,
        invisible: `${invisibleEmoji} Invisible`,
      }
     
      const embedOwn = new Discord.MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setAuthor(user.username + "#" + user.discriminator, user.avatarURL())
        .addField(
          "Playing",
          user.presence.game != null ? user.presence.game.name : "Nothing",
          true
        )
        .addField("ID", user.id, true)
        .addField("State", states[user.presence.status])
        .addField("Nickname", message.member.nickname || "None" ,false)
        .addField("Account created", user.createdAt.toDateString(), true)
        .addField("Date of join", message.member.joinedAt.toDateString(), true)
        .addField("Highest Role", message.member.roles.highest.name != undefined ? message.member.roles.highest.name : "None",)
        .addField("Roles", message.member.roles.cache.map(roles => `**${roles.name}**`).join(", "))
        .addField("Bot", botIf[user.bot])
        .addField("Avatar",`[Avatar Redirect](${user.avatarURL({ dynamic: true, format: 'png', size: 2048 })})`)
        .setColor('#2f3136')

      message.channel
        .send({embed: embedOwn })
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    } else {
      
      const onlineEmoji = client.emojis.cache.get("313956277808005120");
      const idleEmoji = client.emojis.cache.get("313956277220802560");
      const dndEmoji = client.emojis.cache.get("313956276893646850");
      const offEmoji = client.emojis.cache.get("31395627723771086");
      const streamingEmoji = client.emojis.cache.get("313956277132853248");
      const invisibleEmoji = client.emojis.cache.get("313956277107556352");
     
     let states = {
        online: `${onlineEmoji} Online`,
        idle: `${idleEmoji} AFK`,
        dnd: `${dndEmoji} Do Not Disturb`,
        offline: `${offEmoji} Offline`,
        streaming: `${streamingEmoji} Streaming`,
        invisible: `${invisibleEmoji} Invisible`,
      }
      
      let botIf = {
        true: "A Bot",
        false: "Not a bot"
      }
      
      const embedOther = new Discord.MessageEmbed()
        .setThumbnail(userm.avatarURL())
        .setAuthor(userm.username + "#" + userm.discriminator, userm.avatarURL())
        .addField("Playing",userm.presence.game != null ? userm.presence.game.name : "Nothing", true)
        .addField("ID", userm.id, true)
        .addField("State", states[userm.presence.status], true)
        .addField("Account created", userm.createdAt.toDateString(), true)
        .addField("Bot", botIf[userm.bot], true)
        .addField("Avatar",`[Avatar Redirect](${userm.avatarURL({ dynamic: true, format: 'png', size: 2048 })})`)
        .setColor('#2f3136')

      message.channel
        .send({embed: embedOther })
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    } 
}
}