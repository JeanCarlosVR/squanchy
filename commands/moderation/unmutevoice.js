const Discord = require("discord.js");

module.exports = {
  name: "unmutevoice",
  category: "moderation",
  description: "Remove silence from a user to prevent them from speak in channel voice.",
  usage: "<prefix>unmutevoice <mentionUser>",
  run: async function run(client, message, args) {
  
  const unmuteemoji = client.emojis.cache.get("585788304210001920");
  
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE MESSAGES` permission to use this command."
      )
      .setColor('#2f3136')

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({ embed: embedNoPermissions });

    if (
      !message.member.guild.me.permissions.has("MANAGE_ROLES", "MANAGE_CHANNELS")
    )
      return message.channel.send(
        "> I need `MANAGE ROLES` and `MANAGE CHANNELS` permissions to be able to delete messages. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
  
    let embedOwner = new Discord.MessageEmbed()
      .setDescription(`This user is the owner guild.`)
      .setColor('#2f3136')

    if (member === message.guild.owner)
      return message.channel.send({embed: embedOwner});

    if (!member) return message.channel.send({ embed: embedMention });

    let muterole = message.guild.roles.cache.find(element => element.name === "MutedVoice");
    
    let embedNoMuteAny = new Discord.MessageEmbed()
      .setDescription('Apparently they havent muted anyones voice yet.')
      .setColor('#2f3136')
    
    if(!muterole) return message.channel.send({embed: embedNoMuteAny});
  
    let embedNoMuted = new Discord.MessageEmbed()
      .setDescription(`This user not have muted.`)
      .setColor('#2f3136')

    if (!member.roles.cache.some(role => role.id === muterole.id))
      return message.channel.send({embed: embedNoMuted});
  
    var embedNoTell = new Discord.MessageEmbed()
      
      .setDescription(`I already unmute <@${member.id}>, I couldnt tell him he was unmuted.`)
      .setColor('#2f3136')

    var embedUnmute = new Discord.MessageEmbed()
      .setTitle("UnMuted Voice")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .setTimestamp()
      .setColor('#2f3136')

    await member.roles.remove(muterole.id);

    member
      .send(
        `${unmuteemoji} You has been unmuted from **${message.guild.name}**.`
      )
      .catch(m =>
        message.channel.send({embed: embedNoTell})
      );

    return message.channel
      .send({embed: embedUnmute})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}