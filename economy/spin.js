const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "spin",
  category: "economy",
  description: "Bet money win or loss it.",
  usage: "<prefix>spin <moneyQuantity>",
  run: async function run(client, message, args) {
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });

      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to spin again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {
      
      let embedType = new Discord.MessageEmbed()
    
        .setDescription(`You need to put a number to bet.`)
        .setColor("#2f3136");
      
      let moneyTo = args[0]
      if(!moneyTo) return message.channel.send({embed: embedType})
      
      let countBalancePay = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(moneyTo === "all") moneyTo = countBalancePay;
      
      let embedJustNumbers= new Discord.MessageEmbed()

        .setDescription(`Write only numbers.`)
        .setColor("#2f3136");

      let countToPay = args[1]
      if(isNaN(moneyTo)) return message.channel.send({embed: embedJustNumbers})

      var winOrLoss = Math.floor(Math.random() * 100) + 1;
      
      let embedNotEnought= new Discord.MessageEmbed()
    
      .setDescription("Do you dont have enought money.")
      .setColor("#2f3136");
    
      let countBalance = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(moneyTo > countBalance) return message.channel.send({embed: embedNotEnought})
      if(moneyTo < 0) return message.channel.send({embed: embedNotEnought})
      
      if(winOrLoss > 70){        
        
        let moneyMultiply = Math.floor(Math.random() * 6) + 1
        let moneyToGain = moneyTo * moneyMultiply;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGain, "-")
        
        let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
        let embedWin = new Discord.MessageEmbed()
    
          .setDescription(`You Win **${moneyToGain}**, Your new balance is: ${countBalanceNew}`)
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin})
      } else if(winOrLoss < 70){
        
        await economyDB.restar(`${message.guild.id}-${message.author.id}-balance`, moneyTo, "-")
        let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
        
        let embedLoss = new Discord.MessageEmbed()
    
          .setDescription(`You loss **${moneyTo}**, Your new balance is: ${countBalanceNew}.`)
          .setColor("#2f3136");
        
        
        await message.channel.send({embed: embedLoss})
      }
      
      
      
      cooldownRecently.set(message.author.id, Date.now() + 60000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 60000);
    }
  }
};
