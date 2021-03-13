const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "balance",
  category: "economy",
  description: "Look at your current balance.",
  usage: "<prefix>balance",
  aliases: ["bal"],
  run: async function run(client, message, args) {
    
    let memberProfile = message.mentions.users.first() || message.author;
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${memberProfile.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    let countBalance = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.balance`)
    let userAccount = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.nameuser`)

    let profileEmbed = new Discord.MessageEmbed()
    
      .setAuthor(`${memberProfile.username} Balance`, memberProfile.avatarURL())
      .setDescription(`**User: ${memberProfile}** \n**Account Balance:** ${countBalance}`)
      .setColor("#2f3136");
    
    return message.channel.send({embed: profileEmbed})
  }
};
