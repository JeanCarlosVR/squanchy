const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "pay",
  category: "economy",
  description: "Pay another user money from your account.",
  usage: "<prefix>pay <mention> <quantity>",
  run: async function run(client, message, args) {

    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})

    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')
    
    let memberToPay = message.mentions.users.first();
    if(!memberToPay) return message.channel.send({embed: embedMention});
    
    let haveAccountOther = await economyDB.tiene(`${message.guild.id}.${memberToPay.id}`)
    if(!haveAccountOther) await economyDB.establecer(`${message.guild.id}.${memberToPay.id}`, {iduser: `${memberToPay.id}`, nameuser: `${memberToPay.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    let embedTypeCount= new Discord.MessageEmbed()
    
      .setDescription(`Please write a count to pay. \`${prefix}pay <mention> <count>\``)
      .setColor("#2f3136");
    
    let embedJustNumbers= new Discord.MessageEmbed()
    
      .setDescription(`Write only numbers. \`${prefix}pay <mention> <count>\``)
      .setColor("#2f3136");
    
    let countBalancePay = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
    
    let countToPay = args[1];
    if(countToPay === "all") countToPay = countBalancePay;
    if(isNaN(countToPay)) return message.channel.send({embed: embedJustNumbers})
    
    let embedNotEnought= new Discord.MessageEmbed()
    
      .setDescription("Do you dont have enought money.")
      .setColor("#2f3136");
    
    let countBalance = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
    if(countToPay > countBalance) return message.channel.send({embed: embedNotEnought})
    
    let embedLimit = new Discord.MessageEmbed()
    
      .setDescription("For the welfare of the Waifu system the quantity is limited.")
      .setColor("#2f3136");
    
    if(countBalance + countToPay >= 999999999999999999999999999999999) return message.channel.send({embed: embedLimit})
    if(countToPay < 0) return message.channel.send({embed: embedNotEnought})

    let profileEmbed = new Discord.MessageEmbed()
    
      .setAuthor(`${message.author.username} Pay To ${memberToPay.username}`)
      .setDescription(`Total Payed: **${countToPay}**`)
      .setColor("#2f3136");
    
    await economyDB.restar(`${message.guild.id}-${message.author.id}-balance`, countToPay, "-")
      .then(await economyDB.sumar(`${message.guild.id}-${memberToPay.id}-balance`, countToPay, "-"))
      .then(m => message.channel.send({embed: profileEmbed}));
  }
};
