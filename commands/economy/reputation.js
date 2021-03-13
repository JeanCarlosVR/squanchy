const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
let repDB = new db.crearDB("repDB");
let customprefix = new db.crearDB("customprefix");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "reputation",
  category: "economy",
  description: "Add another user 1+ reputation.",
  usage: "<prefix>rep <mention>",
  aliases: ["rep"],
  run: async function run(client, message, args) {

    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let haveAccount = await repDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await repDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, reputationPoints: 0})

    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')
    
    let memberToAdd = message.mentions.users.first();
    if(!memberToAdd) return message.channel.send({embed: embedMention});
    
    let embedOwn = new Discord.MessageEmbed()

      .setDescription(`You cannot give yourself a reputation..`)
      .setColor('#2f3136')
    
    let embedIsBot = new Discord.MessageEmbed()

      .setDescription(`You can't give a bot a reputation.`)
      .setColor('#2f3136')
    
    if(memberToAdd === message.author) return message.channel.send({embed: embedOwn})
    if(memberToAdd.bot) return message.channel.send({embed: embedIsBot})
    
    let haveAccountOther = await repDB.tiene(`${message.guild.id}.${memberToAdd.id}`)
    if(!haveAccountOther) await repDB.establecer(`${message.guild.id}.${memberToAdd.id}`, {iduser: `${memberToAdd.id}`, reputationPoints: 0})
    
    
      const cooldown = cooldownRecently.get(message.author.id);
      if (cooldown) {
          const remaining = humanizeDuration(cooldown - Date.now());

          let cooldownForWork = new Discord.MessageEmbed()

            .setDescription(`Do you wait ${remaining} to work again.`)
            .setColor("#2f3136");

          return message.channel.send({embed: cooldownForWork})
            .catch(console.error);
      } else {

        let profileEmbed = new Discord.MessageEmbed()

          .setDescription(`<@${message.author.id}> gave <@${memberToAdd.id}> a **1** point reputation.`)
          .setColor("#2f3136");

       await repDB.sumar(`${message.guild.id}-${memberToAdd.id}-reputationPoints`, 1, "-")
          .then(m => message.channel.send({embed: profileEmbed}));
      
      cooldownRecently.set(message.author.id, Date.now() + 86400000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 86400000);
    }
  }
};
