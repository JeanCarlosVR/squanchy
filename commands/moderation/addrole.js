const Discord = require("discord.js");

module.exports = {
  name: "addrole",
  category: "moderation",
  description: "Add a role to a user.",
  usage: "<prefix>addrole <mentionUser> <roleName>",
  run: async function run(client, message, args) {

    let embedMention = new Discord.MessageEmbed()

      .setDescription(`You have to mention a member of the guild.`)
      .setColor('#2f3136')

    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription(
        "You need `MANAGE ROLES` permission to use this command."
      )
      .setColor('#2f3136')

    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.channel.send({ embed: embedNoPermissions });

    if (
      !message.member.guild.me.permissions.has("MANAGE_ROLES")
    )
      return message.channel.send(
        "> I need `MANAGE ROLES` permissions to be able to mute. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );

    let toAdd = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    
    let embedNoUser = new Discord.MessageEmbed()
    
      .setDescription('You have to mention a member of the guild.')
      .setColor('#2f3136')
    
    if(!toAdd) return message.channel.send({embed: embedNoUser})
  
    let roleName = args.slice(1).join(" ");
    
    let embedNoType = new Discord.MessageEmbed()
    
      .setDescription('You need to write exactly the name of a role.')
      .setColor('#2f3136')
    
    if(!roleName) return message.channel.send({embed: embedNoType})

    let roleToAdd = message.guild.roles.cache.find(role => role.name === roleName);
    
    let embedNoFound = new Discord.MessageEmbed()
    
      .setDescription('Not found this role on the server.')
      .setColor('#2f3136')
    
    if(!roleToAdd) return message.channel.send('Not found')

    let embedAdded = new Discord.MessageEmbed()

      .setAuthor('Added Role')
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("User", `<@${toAdd.id}>`, true)
      .addField("Role", roleToAdd, true)
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')

    await toAdd.roles.add(roleToAdd.id);

    return message.channel
      .send({embed: embedAdded})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      ); 
}
}