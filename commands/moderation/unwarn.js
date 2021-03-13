const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");

module.exports = {
  name: "unwarn",
  category: "moderation",
  description: "Remove a warning from a user in this guild.",
  usage: "<prefix>unwarn <mentionUser>",
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN MEMBERS` permission to use this command.")
      .setColor('#2f3136')
    
    let embedNoWarns = new Discord.MessageEmbed()

      .setDescription("This user not have warnings.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    let memberTo = message.mentions.members.first() || client.users.cache.get(args[0]);
    if (!memberTo) return message.channel.send({ embed: embedMention });
    
    let embedNotHave = new Discord.MessageEmbed()
    
      .setDescription('This user not have warnings.')
      .setColor('#2f3136')
    
    let countWarn = await warnDB.obtener(`${message.guild.id}.${memberTo.id}`)
    
    if (countWarn > 0) {     
      await warnDB.restar(`${message.guild.id}.${memberTo.id}`, 1);
      
      let countWarnUpdate = await warnDB.obtener(`${message.guild.id}.${memberTo.id}`)
      
      var embedWarn = new Discord.MessageEmbed()
      .setTitle("UnWarning")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${memberTo.id}>`, true)
      .addField("Warnings", `${countWarnUpdate}`, true)
      .setTimestamp()
      .setColor('#2f3136')
      
      
      return message.channel.send({embed: embedWarn})
  
    } else {
      return message.channel.send({embed: embedNoWarns});
    }
}
}