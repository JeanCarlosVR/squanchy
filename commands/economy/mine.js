const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "mine",
  category: "economy",
  description: "Get precious metals.",
  usage: "<prefix>mine",
  run: async function run(client, message, args) {
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    let haveItemsInv= await economyDB.tiene(`${message.guild.id}.${message.author.id}.inv.itemsCollected`)
    if(!haveItemsInv) await economyDB.establecer(`${message.guild.id}.${message.author.id}.inv`, {itemsCollected: {emerald: 0, diamond: 0, gold: 0, iron: 0, coal: 0, shopping_cart: 0, fidget_spinner: 0, airpods: 0, fish: 0, squanchy: 0}})
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });

      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to mine again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {

      var changeTo = Math.floor(Math.random() * 100) + 1;
      
      if(changeTo < 20){
        let coalMined = Math.floor(Math.random() * 30) + 1;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, coalMined, "-")
        
        let embedMined = new Discord.MessageEmbed()
        
          .setDescription(`You mined x${coalMined} Coal `)
          .setColor("#191919")
        
        await message.channel.send({embed: embedMined})
        
      } else if(changeTo < 40 && changeTo > 20){
        let ironMined = Math.floor(Math.random() * 18) + 1;
        let coalMined = Math.floor(Math.random() * 30) + 1;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, coalMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-iron`, ironMined, "-")
        
        let embedMined = new Discord.MessageEmbed()
        
          .setDescription(`You mined x${coalMined} Coal \nYou mined x${ironMined} Iron`)
          .setColor("#e3e4e5")
        
        await message.channel.send({embed: embedMined})

      } else if(changeTo < 60 && changeTo > 40){
        let goldMined = Math.floor(Math.random() * 10) + 1;
        let ironMined = Math.floor(Math.random() * 18) + 1;
        let coalMined = Math.floor(Math.random() * 30) + 1;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, coalMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-iron`, ironMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-gold`, goldMined, "-")
        
        let embedMined = new Discord.MessageEmbed()
        
          .setDescription(`You mined x${coalMined} Coal \nYou mined x${ironMined} Iron \nYou mined x${goldMined} Gold`)
          .setColor("#FFD851")
        
        await message.channel.send({embed: embedMined})

      } else if(changeTo < 80 && changeTo > 60){
        let diamondMined = Math.floor(Math.random() * 6) + 1;
        let goldMined = Math.floor(Math.random() * 10) + 1;
        let ironMined = Math.floor(Math.random() * 18) + 1;
        let coalMined = Math.floor(Math.random() * 30) + 1;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, coalMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-iron`, ironMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-gold`, goldMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-diamond`, diamondMined, "-")
        
        let embedMined = new Discord.MessageEmbed()
        
          .setDescription(`You mined x${coalMined} Coal \nYou mined x${ironMined} Iron \nYou mined x${goldMined} Gold \nYou mined x${diamondMined} Diamond`)
          .setColor("#24E1DB")
        
        await message.channel.send({embed: embedMined})

      } else if(changeTo > 80){
        let emeraldMined = Math.floor(Math.random() * 3) + 1;
        let diamondMined = Math.floor(Math.random() * 6) + 1;
        let goldMined = Math.floor(Math.random() * 10) + 1;
        let ironMined = Math.floor(Math.random() * 18) + 1;
        let coalMined = Math.floor(Math.random() * 30) + 1;
        
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, coalMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-iron`, ironMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-gold`, goldMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-diamond`, diamondMined, "-")
        await economyDB.sumar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-emerald`, emeraldMined, "-")
        
        let embedMined = new Discord.MessageEmbed()
        
          .setDescription(`You mined x${coalMined} Coal \nYou mined x${ironMined} Iron \nYou mined x${goldMined} Gold \nYou mined x${diamondMined} Diamond \nYou mined x${emeraldMined} Emerald`)
          .setColor("#24E146")
        
        await message.channel.send({embed: embedMined})
      }
      
      cooldownRecently.set(message.author.id, Date.now() + 10000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 10000);
    }
  }
};
