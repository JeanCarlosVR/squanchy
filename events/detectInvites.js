const Discord = require('discord.js');
const db = require("megadb");
let statusInviteDB = new db.crearDB("statusInviteDB");

module.exports = async function(client, message) {
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.author.id === client.user.id) return;
  
  if(!statusInviteDB.tiene(`${message.guild.id}`)) await statusInviteDB.establecer(`${message.guild.id}`, {status: "off", rolesAllowed: []})
  
  let statusAntiInvite = await statusInviteDB.obtener(`${message.guild.id}.status`)
  if(statusAntiInvite === 'off') return;
  
  let roleAllowedPeople = await statusInviteDB.obtener(`${message.guild.id}.rolesAllowed`)
  if(message.member.roles.cache.some(role => roleAllowedPeople.includes(role.id)) || message.member.permissions.has("ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES") || message.author === message.guild.owner) return;
  
  let forbiddenWords = [
    "discord.gg/",
    "discordapp.com/invite/",
    "discord.com/invite/",
    "invite.gg/"
  ]
  
  let embedNoLinks = new Discord.MessageEmbed()
  
    .setDescription('No Invites here.')
    .setColor('#2f3136')

  if(forbiddenWords.some(word => message.content.includes(word))) {
  await message.delete({timeout: 100, reason: "No Invites Allowed"})
  message.channel.send({embed: embedNoLinks}).then(i => i.delete({timeout: 3000, reason: "No Invites Allowed"}))
  return;                  
  }
}