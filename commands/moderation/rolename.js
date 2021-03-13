const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "rolename",
  category: "moderation",
  description: "hange the name of a role.",
  usage: "<prefix>roleName <actualRoleName>|<newRoleName>",
  run: async function run(client, message, args) {

    let prefix = await customprefix.obtener(`${message.guild.id}`) || 'w/'
    
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

    var text = args.join(" ");
    var textstring = text.split("|");
    var [
      roleName,
      roleNewName
    ] = textstring;
    
    let embedNoType = new Discord.MessageEmbed()
    
      .setDescription(`You need to write exactly the name of a role. Usage: \`${prefix}roleName <actualRoleName>|<newRoleName>\``)
      .setColor('#2f3136')
    
    if(!roleName) return message.channel.send({embed: embedNoType})
    
    let embedNoTypeNew = new Discord.MessageEmbed()
    
      .setDescription('You need to write the new name for the role.')
      .setColor('#2f3136')
    
    if(!roleNewName) return message.channel.send({embed: embedNoTypeNew})

    let roleToAdd = message.guild.roles.cache.find(role => role.name === roleName);
    
    let embedNoFound = new Discord.MessageEmbed()
    
      .setDescription('Not found this role on the server.')
      .setColor('#2f3136')
    
    if(!roleToAdd) return message.channel.send('Not found')

    let embedAdded = new Discord.MessageEmbed()

      .setAuthor('New Name Role')
      .addField("Moderator", `<@${message.author.id}>`, true)
      .addField("Role", roleToAdd, true)
      .setTimestamp(message.createdAt)
      .setColor('#2f3136')

    await  roleToAdd.edit({
            name: roleNewName
    })

    return message.channel
      .send({embed: embedAdded})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      ); 
}
}