const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "fish",
  category: "economy",
  description: "Get various items fishing.",
  usage: "<prefix>fish",
  run: async function run(client, message, args) {
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    let haveItemsInv = await economyDB.tiene(`${message.guild.id}.${message.author.id}.inv.itemsCollected`)
    if(!haveItemsInv) await economyDB.establecer(`${message.guild.id}.${message.author.id}.inv`, {itemsCollected: {emerald: 0, diamond: 0, gold: 0, iron: 0, coal: 0, shopping_cart: 0, fidget_spinner: 0, airpods: 0, fish: 0, squanchy: 0}})
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });

      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to fish again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {

      var changeTo = Math.floor(Math.random() * 100) + 1;
      
      if(changeTo < 30){
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-shopping_cart`, 1, "-")
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You win a Shopping Cart.')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin});
        
      } else if(changeTo < 50 && changeTo > 30){
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-fish`, 1, "-")
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You win a Fish.')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin});
        
      } else if(changeTo < 70 && changeTo > 50){
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-fidget_spinner`, 1, "-")
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You win a Fidget Spinner.')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin});
        
      } else if(changeTo < 90 && changeTo > 70){
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-airpods`, 1, "-")
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You win a Air Pods.')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin})
        
      } else if(changeTo < 99 && changeTo > 90){
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You not win :(')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin});
        
      }else if(changeTo > 99){
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-squanchy`, 1, "-")
        
        let embedWin = new Discord.MessageEmbed()
        
          .setDescription('You win a Squanchy.')
          .setColor("#2f3136");
        
        await message.channel.send({embed: embedWin});
        
      }
      
      cooldownRecently.set(message.author.id, Date.now() + 10000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 10000);
    }
  }
};
