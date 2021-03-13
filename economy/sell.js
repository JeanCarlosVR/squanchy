const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "sell",
  category: "economy",
  description: "Sell your items collected.",
  usage: "<prefix>sell <itemName> <quantity>",
  aliases: ["s"],
  run: async function run(client, message, args) {

    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})

    let haveItemsInv = await economyDB.tiene(`${message.guild.id}.${message.author.id}.inv.itemsCollected`)
    if(!haveItemsInv) await economyDB.establecer(`${message.guild.id}.${message.author.id}.inv`, {itemsCollected: {emerald: 0, diamond: 0, gold: 0, iron: 0, coal: 0, shopping_cart: 0, fidget_spinner: 0, airpods: 0, fish: 0, squanchy: 0}})
    
    let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write the item name to sell.`)
      .setColor("#2f3136");
    
    let itemToSell = args[0]
    if(!args[0]) return message.channel.send({embed: embedTypeItem});
    
    let coal = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.coal`)
    let iron = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.iron`)
    let gold = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.gold`)
    let diamond = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.diamond`)
    let emerald = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.emerald`)
    let cart = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.shopping_cart`)
    let airpods = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.airpods`)
    let spinner = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.fidget_spinner`)
    let fish = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.fish`)
    let squan = await economyDB.obtener(`${message.guild.id}.${message.author.id}.inv.itemsCollected.squanchy`)
    
    if(itemToSell === "coal"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > coal) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 100;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-coal`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Coal selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
      
    } else if(itemToSell === "iron"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > iron) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 150;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-iron`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Iron selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "gold"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > gold) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 230;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-gold`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Gold selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "diamond"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > diamond) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 350;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-diamond`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Diamond selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "emerald"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > emerald) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 500;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-emerald`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Emerald selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "cart"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > cart) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 110;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-shopping_cart`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Shopping Cart selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "airpods"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > airpods) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 200;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-airpods`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} AirPod selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "spinner"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > spinner) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 80;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-fidget_spinner`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Spinner selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "fish"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > fish) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 90;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-fish`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Fish selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else if(itemToSell === "squanchy"){
      
      let embedTypeItem = new Discord.MessageEmbed()
    
      .setDescription(`Please write a quantity of name to sell.`)
      .setColor("#2f3136");
      
      let embedNotCount = new Discord.MessageEmbed()
    
      .setDescription(`You dont have this quantity of this item.`)
      .setColor("#2f3136");
      
      let countToSell = args[1]
      if(!countToSell) return message.channel.send({embed: embedTypeItem})
      if(isNaN(countToSell)) return message.channel.send({embed: embedTypeItem})
      if(countToSell > squan) return message.channel.send({embed: embedNotCount})
      if(countToSell < 0) return message.channel.send({embed: embedNotCount})
      
      let moneyToGet = countToSell * 5000;
      
      await economyDB.restar(`${message.guild.id}-${message.author.id}-inv-itemsCollected-squanchy`, countToSell, "-")
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToGet, "-");
      
      let embedSelled = new Discord.MessageEmbed()
    
      .setDescription(`x${countToSell} Squanchy selled for ${moneyToGet}.`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedSelled})
    } else {
      
      let embedHelp = new Discord.MessageEmbed()
      .setDescription(`Coal \nIron \n<Gold \nDiamond \nEmerald \nCart \nAirpods \nSpinner \nFish \nSquanchy`)
      .setColor("#2f3136");
      
      return message.channel.send({embed: embedHelp})
      
    }
    
  }
};
