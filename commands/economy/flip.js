const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "flip",
  category: "economy",
  description: "Bet money win or loss it.",
  usage: "<prefix>flip <moneyQuantity> <tailOrHead>",
  run: async function run(client, message, args) {
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });

      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to flip again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {
      
      let embedType = new Discord.MessageEmbed()
    
        .setDescription(`You need to put a number to bet.`)
        .setColor("#2f3136");
      
      let moneyTo = args[0]
      if(!moneyTo) return message.channel.send({embed: embedType})
      
        let embedJustNumbers= new Discord.MessageEmbed()

        .setDescription(`Write only numbers.`)
        .setColor("#2f3136");
      
      let countBalancePay = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(moneyTo === "all") moneyTo = countBalancePay;
      
      if(isNaN(moneyTo)) return message.channel.send({embed: embedJustNumbers})
    

      var winOrLoss = Math.floor(Math.random() * 100) + 1;
      
      let embedNotEnought = new Discord.MessageEmbed()
    
      .setDescription("Do you dont have enought money.")
      .setColor("#2f3136");
    
      let countBalance = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(moneyTo > countBalance) return message.channel.send({embed: embedNotEnought})
      if(moneyTo < 0) return message.channel.send({embed: embedNotEnought})
      
      let embedLadoA = new Discord.MessageEmbed()

        .setDescription("You need to choose `tail` or `head`.")
        .setColor("#2f3136");
      
      let ladoA = args[1]
      if(!ladoA) return message.channel.send({embed: embedLadoA});
        
      if(!ladoA === ("tail" || "head")) return message.channel.send({embed: embedLadoA});
      
      if(winOrLoss > 50){        
        /*
        let moneyMultiply = Math.floor(Math.random() * 6) + 1
        let moneyToGain = moneyTo * moneyMultiply;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGain, "-")
        
        let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
        let embedWin = new Discord.MessageEmbed()
    
          .setDescription(`You Win **${moneyToGain}**, Your new balance is: ${countBalanceNew}`)
          .setColor("#2f3136");
        
        return message.channel.send({embed: embedWin})*/
        if(ladoA === "tail" || ladoA === "tails"){
            let moneyMultiply = Math.floor(Math.random() * 6) + 1
            let moneyToGain = moneyTo * 2;
        
            await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGain, "-")
        
            let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
            let embedWin = new Discord.MessageEmbed()
    
              .setDescription(`\`tail\` You Win **${moneyToGain}**, Your new balance is: ${countBalanceNew}`)
              .setColor("#2f3136");
        
            await message.channel.send({embed: embedWin})
        } else if(ladoA === "head"){
          await economyDB.restar(`${message.guild.id}-${message.author.id}-balance`, moneyTo, "-")
          let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
        
          let embedLoss = new Discord.MessageEmbed()

            .setDescription(`\`tail\` You loss **${moneyTo}**, Your new balance is: ${countBalanceNew}.`)
            .setColor("#2f3136");
        
        
          await message.channel.send({embed: embedLoss})
        }
      } else if(winOrLoss < 50){
        if(ladoA === "head"){
            let moneyMultiply = Math.floor(Math.random() * 6) + 1
            let moneyToGain = moneyTo * 2;
        
            await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGain, "-")
        
            let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
            let embedWin = new Discord.MessageEmbed()
    
              .setDescription(`\`head\` You Win **${moneyToGain}**, Your new balance is: ${countBalanceNew}`)
              .setColor("#2f3136");
        
            await message.channel.send({embed: embedWin})
        } else if(ladoA === "tail"){
          await economyDB.restar(`${message.guild.id}-${message.author.id}-balance`, moneyTo, "-")
          let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
        
          let embedLoss = new Discord.MessageEmbed()

            .setDescription(`\`head\` You loss **${moneyTo}**, Your new balance is: ${countBalanceNew}.`)
            .setColor("#2f3136");
        
        
          await  message.channel.send({embed: embedLoss})
        }
      }
      
      
      
      cooldownRecently.set(message.author.id, Date.now() + 10000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 10000);
    }
  }
};
