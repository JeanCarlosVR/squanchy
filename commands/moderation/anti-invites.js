const Discord = require("discord.js");
const db = require("megadb");
let statusInviteDB = new db.crearDB("statusInviteDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "anti-invites",
  category: "moderation",
  description: "Prevent users from sharing Discord invites.",
  usage: "<prefix>anti-invites",
  aliases: ["av", "invites"],
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";
    
    if(!statusInviteDB.tiene(`${message.guild.id}`)) await statusInviteDB.establecer(`${message.guild.id}`, {status: "off", rolesAllowed: []})
    
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE GUILD` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });

    if (!message.member.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "> I need MANAGE MESSAGES` permissions to be able THE SYSTEM ANTI LINKS. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedHelp = new Discord.MessageEmbed()
      
        .addField('Enable System Anti Invites', `\`${prefix}anti-invites on\``)
        .addField('Disable System Anti Invites', `\`${prefix}anti-invites off\``)
        .addField('Add Roles To Whitelist', `\`${prefix}anti-invites addrole <roleName>\``)
        .addField('Remove Roles From Whitelist', `\`${prefix}anti-invites removerole <roleName>\``)
        .setColor('#2f3136')
    
    var responseStatus = args[0]
    if(!responseStatus) return message.channel.send({embed: embedHelp})
    
    let statusActual = await statusInviteDB.obtener(`${message.guild.id}.status`);
    
    if(responseStatus === "off"){
      
      let embedNope = new Discord.MessageEmbed()
      
        .setDescription("The anti-invites system status was already on **Off**.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      if(statusActual === "off") return message.channel.send({embed: embedNope});
      
      let embedOff = new Discord.MessageEmbed()
      
        .setDescription("The anti-invites system status has been set to **Off**.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      await statusInviteDB.establecer(`${message.guild.id}.status`, "off")
      return message.channel.send({embed: embedOff})
    } else if(responseStatus === "on"){
      
      let embedNope = new Discord.MessageEmbed()
      
        .setDescription("The anti-invites system status was already on **On**.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      if(statusActual === "on") return message.channel.send({embed: embedNope});
      
      let embedOn = new Discord.MessageEmbed()
      
        .setDescription("The anti-invites system status has been set to **On**.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      await statusInviteDB.establecer(`${message.guild.id}.status`, "on")
      return message.channel.send({embed: embedOn})
    } else if(responseStatus === "addrole"){
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a role name.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      let roleArg = args.slice(1).join(" ")
      if(!roleArg) return message.channel.send({embed: embedType})
      
      let roleToAdd = message.guild.roles.cache.find(role => role.name === roleArg);
      
      let embedNoRole = new Discord.MessageEmbed()
      
        .setDescription("This role was not found.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      if(!roleToAdd) return message.channel.send({embed: embedNoRole})
      
      let embedExist = new Discord.MessageEmbed()
      
        .setDescription("This role already exist in the roles whitelist.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      let existRoleDB = await statusInviteDB.obtener(`${message.guild.id}.rolesAllowed`)
      if(existRoleDB.includes(roleToAdd.id)) return message.channel.send({embed: embedExist});
      
      await statusInviteDB.push(`${message.guild.id}.rolesAllowed`, `${roleToAdd.id}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The ${roleToAdd} role has been correctly placed in the whitelist.`)
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
    } else if(responseStatus === "removerole"){
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a role name.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      let roleArg = args.slice(1).join(" ")
      if(!roleArg) return message.channel.send({embed: embedType})
      
      let roleToAdd = message.guild.roles.cache.find(role => role.name === roleArg);
      
      let embedNoRole = new Discord.MessageEmbed()
      
        .setDescription("This role was not found.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      if(!roleToAdd) return message.channel.send({embed: embedNoRole})
      
      let embedNoExist = new Discord.MessageEmbed()
      
        .setDescription("This role doenst exist in the roles whitelist.")
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      let existRoleDB = await statusInviteDB.obtener(`${message.guild.id}.rolesAllowed`)
      if(!existRoleDB.includes(roleToAdd.id)) return message.channel.send({embed: embedNoExist});
      
      await statusInviteDB.extract(`${message.guild.id}.rolesAllowed`, `${roleToAdd.id}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The ${roleToAdd} role has been removed from whitelist.`)
        .setFooter("Anti Invites")
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
    }
    
    
  }
};
