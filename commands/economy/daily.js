const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "daily",
  category: "economy",
  description: "Receive a daily reward.",
  usage: "<prefix>daily",
  run: async function run(client, message, args) {
    
    let embedAlready = new Discord.MessageEmbed()
    
      .setDescription("Do you dont have an account.")
      .setColor("#2f3136");
    
    let haveAccount = await economyDB.tiene(`${message.guild.id}.${message.author.id}`)
    if(!haveAccount) await economyDB.establecer(`${message.guild.id}.${message.author.id}`, {iduser: `${message.author.id}`, nameuser: `${message.author.username}`, created: `${message.createdAt.toDateString()}`, balance: 0})
    
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });
      
      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to receive money again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {

      let moneyToAdd = 350
      
      let embedLimit = new Discord.MessageEmbed()
    
        .setDescription("For the welfare of the Waifu system the quantity is limited to 999 quintillion.")
        .setColor("#2f3136");

      let countBalance = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(countBalance + moneyToAdd >= 999999999999999999999999999999999) return message.channel.send({embed: embedLimit})
      
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToAdd, "-")
      
      let countBalanceNew = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      
      let workGained = new Discord.MessageEmbed()
      
        .setDescription(`You just claimed your daily reward (**${moneyToAdd}**) your new balance is **${countBalanceNew}**.`)
        .setColor("#2f3136");
      
      await message.channel.send({embed: workGained})
      
      cooldownRecently.set(message.author.id, Date.now() + 86400000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 86400000);
    }
  }
};
