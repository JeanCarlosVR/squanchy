const Discord = require('discord.js');
const db = require("megadb");
let statusBadDB = new db.crearDB("statusBadDB");
let customprefix = new db.crearDB("customprefix");

module.exports = async function(client, message) {
  
  let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";

  if(message.content.startsWith(`${prefix}anti-swearword`)) return;
  
  if(!statusBadDB.tiene(`${message.guild.id}`)) await statusBadDB.establecer(`${message.guild.id}`, {status: "off", rolesAllowed: [], word: []})
  
  let statusBad = await statusBadDB.obtener(`${message.guild.id}.status`)
  if(statusBad === 'off') return;
  
  let roleAllowedPeople = await statusBadDB.obtener(`${message.guild.id}.rolesAllowed`)
  if(message.member.roles.cache.some(role => roleAllowedPeople.includes(role.id)) || message.member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES") || message.author === message.guild.owner) return;
  
  let forbiddenWords = await statusBadDB.obtener(`${message.guild.id}.word`)
  
  let embedNoBad = new Discord.MessageEmbed()
  
    .setDescription('No swearwords here.')
    .setColor('#2f3136')

  if(forbiddenWords.some(wordi => message.content.includes(wordi))) {
  await message.delete({timeout: 100, reason: "No Swearwords Allowed"})
  message.channel.send({embed: embedNoBad}).then(i => i.delete({timeout: 3000, reason: "Swearwords Allowed"}))
  return;                  
  }
}