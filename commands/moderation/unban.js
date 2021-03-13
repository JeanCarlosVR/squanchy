const Discord = require("discord.js");

module.exports = {
  name: "unban",
  category: "moderation",
  description: "Remove that ban instantly from the user.",
  usage: "<prefix>unban <userID>",
  run: async function run(client, message, args) {
    
    /*
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN_MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "> I need `BAN MEMBERS` permissions to be able to unban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let unbanned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");

    let member = await client.users.fetch(unbanned);
    let ban = await message.guild.fetchBans();
    
    let embedOwner = new Discord.MessageEmbed()
  
      .setDescription(`This user is the owner of the guild.`)
      .setColor('#2f3136')
    
    let embedNotBanned = new Discord.MessageEmbed()
  
      .setDescription(`This user is not banned.`)
      .setColor('#2f3136')
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    
    if(!member) return message.channel.send({embed: embedMention})
    
    if (!ban.get(member.id)) return message.channel.send({embed: embedNotBanned})
/*

    let banList = await message.guild.get.fetchBans();
  
    let bannedUser = banList.find(user => user.id === `${member}`);
  
    if (!bannedUser)
      return await message.channel.send({embed: embedNoBanned});

    
    if (member === message.guild.owner.id)
      return message.channel.send({embed: embedOwner});

    var embedUnban = new Discord.MessageEmbed()
      .setTitle("UnBan")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .setTimestamp()
      .setColor('#2f3136')
    
    var user = ban.get(member.id);
    await message.guild.members.unban(member);

    return message.channel.send({embed: embedUnban});
    
    
*/
    
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `BAN_MEMBERS` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "> I need `BAN MEMBERS` permissions to be able to unban. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You must provide a user ID.`)
      .setColor('#2f3136')

    let member = client.users.cache.get(args[0]);
    if (!member) return message.channel.send({embed: embedMention});
    
    let embedUnban = new Discord.MessageEmbed()
      .setTitle("Unban")
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${member.id}>`, true)
      .setColor('#2f3136')
    
    let embedNotBanned = new Discord.MessageEmbed()
  
      .setDescription(`This user is not banned.`)
      .setColor('#2f3136')
    
    await message.guild.members.unban(member.id).then(()=>{
 message.channel.send({embed: embedUnban});
    }).catch(()=>{
    message.channel.send({embed: embedUnban})
    })
}
}