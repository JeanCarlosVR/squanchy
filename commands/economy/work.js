const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  name: "work",
  category: "economy",
  description: "Work to get money.",
  usage: "<prefix>work",
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
    
        .setDescription(`Do you wait ${remaining} to work again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {

      var moneyToAdd = Math.floor(Math.random() * 150) + 1;
      
      let actToWin = [
        `You grew up and joined a company where you work 24 hours a day 7 days a week all year and you earned **${moneyToAdd}**.`,
        `A strange company hired you to murder the most wanted criminal in the world and you won **${moneyToAdd}**.`,
        `You bumped into Cristiano ronaldo after leaving a brothel and they met and now you play for Real Madrid where you have won the magnificent number of **${moneyToAdd}**.`,
        `Some aliens abducted you and did experiments on you, they paid you **${moneyToAdd}**.`,
        `You fixed an old man's computer and he paid you **${moneyToAdd}**.`,
        `You had a plane crash but you fell into a pillow factory and when you went out the door they paid you **${moneyToAdd}** because they thought you were a worker.`,
        `You won the lottery but spent everything on Nitro memberships and candies and now you only have **${moneyToAdd}**.`,
        `You did nothing and got **${moneyToAdd}**`,
        `A fake wad of banknotes fell from the sky and you sold them for **${moneyToAdd}**`,
      ]
      
      let response = actToWin[Math.floor(Math.random() * actToWin.length)];
      
      let workGained = new Discord.MessageEmbed()
      
        .setThumbnail('https://pngimg.com/uploads/coin/coin_PNG36924.png')
        .setDescription(response)
        .setColor("#2f3136");
      
      let embedLimit = new Discord.MessageEmbed()

        .setDescription("For the welfare of the Waifu system the quantity is limited to 999 quintillion.")
        .setColor("#2f3136");

      let countBalance = await economyDB.obtener(`${message.guild.id}.${message.author.id}.balance`)
      if(countBalance + moneyToAdd >= 999999999999999999999999999999999) return message.channel.send({embed: embedLimit})
      
      await economyDB.sumar(`${message.guild.id}-${message.author.id}-balance`, moneyToAdd, "-").then(m => message.channel.send({embed: workGained}))
      
      cooldownRecently.set(message.author.id, Date.now() + 15000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 15000);
    }
  }
};
