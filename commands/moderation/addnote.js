const Discord = require("discord.js");
const db = require("megadb");
let notesDB = new db.crearDB("notesDB");

module.exports = {
  name: "addnote",
  category: "moderation",
  description: "Add a note to a user to help others moderate better.",
  usage: "<prefix>addnote <mentionUser> <note>",
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
    
    let embedNoNote = new Discord.MessageEmbed()

      .setDescription("You need write a note.")
      .setColor('#2f3136')

    let Note = args.slice(1).join(" ");
    if (!Note) message.channel.send({embed: embedNoNote})
    
    let embedNote = new Discord.MessageEmbed()
      .setTitle(`New Note`)
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .addField("Note", Note, true)
      .setTimestamp()
      .setColor('#2f3136')
    
    if(!notesDB.tiene(`${message.guild.id}.${member.id}`)) return notesDB.establecer(`${message.guild.id}.${member.id}.notes`, {"note": {"noteDescriptions": [`Note: \`${Note}\` by <@${message.author.id}> this was ${message.createdAt.toDateString()}`]}}).then(m => message.channel.send({embed: embedNote}));  

    
    

    return notesDB.push(`${message.guild.id}.${member.id}.notes.note.noteDescriptions`, `Note: \`${Note}\` by <@${message.author.id}> this was ${message.createdAt.toDateString()}`).then(m => message.channel.send({embed: embedNote}));    
}
}