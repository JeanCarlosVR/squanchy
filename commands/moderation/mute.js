const Discord = require("discord.js");

module.exports = {
  name: "mute",
  category: "moderation",
  description: "Mute a user to prevent them from sending messages.",
  usage: "<prefix>mute <mentionUser> [reason]",
  run: async function run(client, message, args) {
  
  const muteemoji = client.emojis.cache.get("585767366722584576");

    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE ROLES` permission to use this command."
      )
      .setColor('#2f3136')

    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.channel.send({ embed: embedNoPermissions });

    if (
      !message.member.guild.me.permissions.has("MANAGE_ROLES", "MANAGE_CHANNELS")
    )
      return message.channel.send(
        "> I need `MANAGE ROLES` and `MANAGE CHANNELS` permissions to be able to mute. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let tomute = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    
    let embedIsOwner = new Discord.MessageEmbed()

      .setDescription("This user is the owner guild.")
      .setColor('#2f3136')

    if (tomute === message.guild.owner)
      return message.channel.send({embed: embedIsOwner});
    
    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant mute this user. It is likely that my role is below it.")
      .setColor('#2f3136')
    
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "None reason";

    if (!tomute) return message.channel.send({ embed: embedMention });

    let muterole = message.guild.roles.cache.find(role => role.name === "Muted");

    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          data:{
          name: "Muted",
          color: "#929292",
          },
          reason: "Mute members"
        });

        await message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.overwritePermissions([
            {
              id: muterole.id,
              deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
            }
          ], 'Mute changes.')
       })
      } catch (error) {
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        );
      }
    }
  
    let embedNoMuted = new Discord.MessageEmbed()
      .setDescription(`This user already have muted.`)
      .setColor('#2f3136')

    if (tomute.roles.cache.some(rol => rol.id === muterole.id))
      return message.channel.send({embed: embedNoMuted});
    
    let embedNoTell = new Discord.MessageEmbed()
      
      .setDescription(`I already mute <@${tomute.id}>, I couldnt tell him he was muted.`)
      .setColor('#2f3136')

    let embedMute = new Discord.MessageEmbed()

      .setAuthor('Mute')
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${tomute.id}>`, true)
      .addField("Reason", reason, true)
      .setTimestamp(message.createdAt)
       .setColor('#2f3136')

    await tomute.roles.add(muterole.id);

    tomute
      .send(
        `${muteemoji} You has been muted from **${message.guild.name}** for "${reason}".`
      )
      .catch(m =>
        message.channel.send({embed: embedNoTell})
      );

    return message.channel
      .send({embed: embedMute})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      ); 
}
}