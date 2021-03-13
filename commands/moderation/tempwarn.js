const Discord = require("discord.js");
const db = require("megadb");
let warnDB = new db.crearDB("warnDB");
const ms = require("ms");
const humanizeDuration = require('humanize-duration');
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "tempwarn",
  category: "moderation",
  description: "Temporaly warn a user in this guild.",
  usage: "<prefix>warn <mentionChannel> [reason]",
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    let memberTo = message.mentions.members.first();
    if (!memberTo) return message.channel.send({ embed: embedMention });
    
    let embedMember = new Discord.MessageEmbed()

      .setDescription("I cant warn this user. It is likely that my role is below it.")
      .setColor('#2f3136')
    
    let embedUsageTime = new Discord.MessageEmbed()

      .setDescription(`You need to specify the time (10m, 10minutes, 10h, 10hours, etc). Usage: \`${prefix}tempmute <mentionUser> <time> [reason]\``)
      .setColor('#2f3136')
    
    let time = args[1]
    if(!time) return message.channel.send({embed: embedUsageTime})
    let timer = ms(time);
    
    let reason = args.slice(2).join(" ");
    if (!reason) reason = "None reason";

    if (!warnDB.tiene(`${message.guild.id}.${memberTo.id}`)) {
      warnDB.establecer(`${message.guild.id}.${memberTo.id}`, 1);
    } else {
      warnDB.sumar(`${message.guild.id}.${memberTo.id}`, 1);
    }

    let memberWarnCount = await warnDB.obtener(
      `${message.guild.id}.${memberTo.id}`
    );

    var embedWarn = new Discord.MessageEmbed()
      .setTitle("Endly Temporaly Warning")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${memberTo.id}>`, true)
      .addField("Reason", `${reason}`, true)
      .addField("Time", humanizeDuration(timer), true)
      .addField("Warnings", `${memberWarnCount}`, true)
      .setTimestamp()
      .setColor('#2f3136')

    await message.channel.send({embed: embedWarn});
    
    await setTimeout(async function() {
      
      await warnDB.restar(`${message.guild.id}.${memberTo.id}`, 1).catch(console.log)
      
      let embedUnWarn = new Discord.MessageEmbed()
      .setTitle("Endly Temporaly Warning")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${memberTo.id}>`, true)
      .addField("Time", humanizeDuration(timer), true)
      .addField("Warnings", `${memberWarnCount - 1}`, true)
      .setTimestamp()
      .setColor('#2f3136')
      
      await message.channel
        .send({embed: embedUnWarn})
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    }, timer);
}
}