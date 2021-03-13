const Discord = require("discord.js");
const db = require("megadb");
let notesDB = new db.crearDB("notesDB");

module.exports = {
  name: "clear-notes",
  category: "moderation",
  description: "Clear all notes of a user.",
  usage: "<prefix>clear-notes <mentionUser>",
  run: async function run(client, message, args) {
    
    let member = message.guild.member(
      message.mentions.users.first() || client.users.cache.get(args[0])
    );
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE GUILD` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "> I need `MANAGE GUILD` permissions to be able to ban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    if (!member) return message.channel.send({ embed: embedMention });
    
    let embedNote = new Discord.MessageEmbed()
      .setTitle(`Clear Notes`)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .setTimestamp()
      .setColor('#2f3136')
    
    let embedNotHave = new Discord.MessageEmbed()
      .setDescription("This user dont have notes.")
      .setColor('#2f3136')
    
    let embedCleared = new Discord.MessageEmbed()
      .setDescription("This user's notes have been removed successfully.")
      .setColor('#2f3136')
    
    if(!notesDB.tiene(`${message.guild.id}.${member.id}`)) return message.channel.send({embed: embedNotHave})
      
      
    await notesDB.eliminar(`${message.guild.id}.${member.id}`)
    message.channel.send({embed: embedCleared})
}
}