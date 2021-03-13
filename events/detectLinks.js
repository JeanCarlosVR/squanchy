const Discord = require('discord.js');
const db = require("megadb");
let statusLinkDB = new db.crearDB("statusLinkDB");

module.exports = async function(client, message) {
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.author.id === client.user.id) return;
  
  if(!statusLinkDB.tiene(`${message.guild.id}`)) await statusLinkDB.establecer(`${message.guild.id}`, {status: "off", rolesAllowed: []})
  
  let statusAntiLink = await statusLinkDB.obtener(`${message.guild.id}.status`)
  if(statusAntiLink === 'off') return;
  
  let roleAllowedPeople = await statusLinkDB.obtener(`${message.guild.id}.rolesAllowed`)
  if(message.member.roles.cache.some(role => roleAllowedPeople.includes(role.id)) || message.member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES") || message.author === message.guild.owner) return;
  
  let forbiddenWords = [
    "http://",
    "https://",
    "www."
  ]
  
  let embedNoLinks = new Discord.MessageEmbed()
  
    .setDescription('No links here.')
    .setColor('#2f3136')

  if(forbiddenWords.some(word => message.content.includes(word))) {
  await message.delete({timeout: 100, reason: "No Links Allowed"})
  message.channel.send({embed: embedNoLinks}).then(i => i.delete({timeout: 3000, reason: "No Links Allowed"}))
  return;                  
  }
}