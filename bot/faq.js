const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "faq",
  category: "bot",
  description: "Questions",
  usage: "<prefix>faq [faqNumber]",
  run: async function run(client, message, args) {
    
    if(!args[0]) {
      let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";

      let embedHelp = new Discord.MessageEmbed()

      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`Usage: \`<prefix>faq <number>\``)
      .addField(`**${prefix}faq 1**`, "I muted someone but keep talking.")
      .addField(`**${prefix}faq 2**`, "The bot cannot fulfill moderative functions.")
      .addField(`**${prefix}faq 3**`, "The bot cannot fulfill certain functions such as SetGuildName or SetUsername")
      .setColor('#2f3136')


      return message.channel.send({embed: embedHelp})
    } else if(args[0] === '1') {

      let embedModeration = new Discord.MessageEmbed()

      .setAuthor('I muted someone but keep talking.')
      .setDescription('This is because the user has a higher role than the Muted role, we advise you to put this role at the top, but below the Squanchy role.')
      .setImage("https://i.imgur.com/RTVDVOT.gif")
      .setColor('#2f3136')


      return message.channel.send({embed: embedModeration})
    } else if(args[0] === '2') {

      let embedModeration = new Discord.MessageEmbed()

      .setAuthor('The bot cannot fulfill moderative functions.')
      .setDescription('You have to enter the bot with the necessary permissions, kick the bot and invite it with [This Invitation](https://discord.com/oauth2/authorize?client_id=637108716151504926&scope=bot&permissions=-9&redirect_uri=https%3A%2F%2Fwaifuu.glitch.me%2F&response_type=code) remember to put this in the highest role..')
      .setColor('#2f3136')


      return message.channel.send({embed: embedModeration})
    }  else if(args[0] === '3') {

      let embedModeration = new Discord.MessageEmbed()

      .setAuthor('The bot cannot fulfill certain functions such as SetGuildName or SetUsername.')
      .setDescription('You have to enter the bot with the necessary permissions, kick the bot and invite it with [This Invitation](https://discord.com/oauth2/authorize?client_id=637108716151504926&scope=bot&permissions=-9&redirect_uri=https%3A%2F%2Fwaifuu.glitch.me%2F&response_type=code).')
      .setColor('#2f3136')


      return message.channel.send({embed: embedModeration})
    } else {
      let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";

      let embedHelp = new Discord.MessageEmbed()

      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`Usage: \`<prefix>faq <number>\``)
      .addField('1', "I muted someone but keep talking.")
      .addField('2', "The bot cannot fulfill moderative functions.")
      .addField('3', "The bot cannot fulfill certain functions such as SetGuildName or SetUsername")
      .setColor('#2f3136')


      return message.channel.send({embed: embedHelp})
    }
  }
};
