const Discord = require("discord.js");
const db = require("megadb");
let notesDB = new db.crearDB("notesDB");

module.exports = {
  name: "notes",
  category: "moderation",
  description: "Check the notes of a user.",
  usage: "<prefix>addnote <mentionUser> <note>",
  run: async function run(client, message, args) {
    
    let member = message.guild.member(
      message.mentions.users.first() || client.users.cache.get(args[0])
    );
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    if (!message.member.guild.me.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "> I need `MANAGE GUILD` permissions to be able to ban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    if (!member) return message.channel.send({ embed: embedMention });
    
    let embedNoNote = new Discord.MessageEmbed()
      .setDescription('This user dont have notes.', true)
      .setColor('#2f3136')
    
    if(!notesDB.tiene(`${message.guild.id}.${member.id}`)) return message.channel.send({embed: embedNoNote})
    
    let notesList = await notesDB.obtener(`${message.guild.id}.${member.id}.notes.note.noteDescriptions`)
    
    let embedNote = new Discord.MessageEmbed()
      .setDescription(`**Notes for <@${member.id}>** \n` + notesList.join(" \n"), true)
      .setColor('#2f3136')
    
    
    
    
    return message.channel.send(({embed: embedNote}))
}
}