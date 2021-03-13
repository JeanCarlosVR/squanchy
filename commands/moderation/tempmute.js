const Discord = require("discord.js");
const ms = require("ms");
const humanizeDuration = require('humanize-duration');
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");


module.exports = {
  name: "tempmute",
  category: "moderation",
  description: "Temporaly Mute a user to prevent them from sending messages.",
  usage: "<prefix>tempmute <mentionUser> <time> [reason]",
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
  
    const muteemoji = client.emojis.cache.get("585767366722584576");
    
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
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    if(!tomute) return message.channel.send({embed: embedMention})
    
    let embedIsOwner = new Discord.MessageEmbed()

      .setDescription("This user is the owner guild.")
      .setColor('#2f3136')

    if (tomute === message.guild.owner)
      return message.channel.send({embed: embedIsOwner});
    
    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant mute this user. It is likely that my role is below it.")
      .setColor('#2f3136')
    
    let embedUsageTime = new Discord.MessageEmbed()

      .setDescription(`You need to specify the time (10m, 10minutes, 10h, 10hours, etc). Usage: \`${prefix}tempmute <mentionUser> <time> [reason]\``)
      .setColor('#2f3136')
    
    let time = args[1]
    if(!time) return message.channel.send({embed: embedUsageTime})
    let timer = ms(time);
    
    let reason = args.slice(2).join(" ");
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

    if (tomute.roles.cache.some(role => role.id === muterole.id))
      return message.channel.send({embed: embedNoMuted});
  
    let embedNoTell = new Discord.MessageEmbed()
      
      .setDescription(`I already mute <@${tomute.id}>, I couldnt tell him he was muted.`)
      .setColor('#2f3136')

    let embedMute = new Discord.MessageEmbed()

      .setAuthor('Temporal Mute')
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${tomute.id}>`, true)
      .addField("Time", humanizeDuration(timer), true)
      .addField("Reason", reason, false)
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')

    await tomute.roles.add(muterole.id);

    await tomute
      .send(
        `${muteemoji} You has been temporal muted from **${message.guild.name}** for "${reason}" for ${humanizeDuration(timer)}.`
      )
      .catch(m =>
        message.channel.send({embed: embedNoTell})
      );

    await message.channel
      .send({embed: embedMute})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      ); 
    
      await setTimeout(async function() {
      
      await tomute.roles.remove(muterole.id);
      
      await tomute
      .send(
        `${muteemoji} You has been unmuted from **${message.guild.name}**.`
      )
      .catch(m =>
        message.channel.send({embed: embedNoTell})
      );
      
      let embedUnmute = new Discord.MessageEmbed()
      .setAuthor('Endly Temporal Mute')
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${tomute.id}>`, true)
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')
      
      await message.channel
        .send({embed: embedUnmute})
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    }, timer);
}
}