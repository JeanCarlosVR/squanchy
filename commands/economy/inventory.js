const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
let repDB = new db.crearDB("repDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "inventory",
  category: "economy",
  description: "Watch all your items collected.",
  usage: "<prefix>inventory",
  aliases: ["inv"],
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";
    
    let memberProfile = message.mentions.users.first() || message.author;
    
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${memberProfile.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${memberProfile.id}`, {iduser: `${memberProfile.id}`, nameuser: `${memberProfile.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    let haveItemsInv= await economyDB.tiene(`${message.guild.id}.${message.author.id}.inv.itemsCollected`)
    if(!haveItemsInv) await economyDB.establecer(`${message.guild.id}.${message.author.id}.inv`, {itemsCollected: {emerald: 0, diamond: 0, gold: 0, iron: 0, coal: 0, shopping_cart: 0, fidget_spinner: 0, airpods: 0, fish: 0, squanchy: 0}})
    
    let coal = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.coal`)
    let iron = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.iron`)
    let gold = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.gold`)
    let diamond = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.diamond`)
    let emerald = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.emerald`)
    let cart = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.shopping_cart`)
    let airpods = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.airpods`)
    let spinner = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.fidget_spinner`)
    let fish = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.fish`)
    let squan = await economyDB.obtener(`${message.guild.id}.${memberProfile.id}.inv.itemsCollected.squanchy`)
    
    let profileEmbed = new Discord.MessageEmbed()
    
      .setAuthor(`${memberProfile.username} Inventory`, memberProfile.avatarURL())
      .setDescription(`${coal} Coal\n${iron} Iron\n${gold} Gold\n${diamond} Diamond\n${emerald} Emerald \n${cart} Shopping Cart\n${airpods} Airpod \n${spinner} Spinner \n${fish} Fish \n${squan || 0} Squanchy`)
      .setColor("#2f3136")
    
    return message.channel.send({embed: profileEmbed})  
    
  }
};