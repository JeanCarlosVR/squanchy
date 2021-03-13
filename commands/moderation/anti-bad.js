const Discord = require("discord.js");
const db = require("megadb");
let statusBadDB = new db.crearDB("statusBadDB");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "anti-swearword",
  category: "moderation",
  description: "Prevent users from say swearwords.",
  usage: "<prefix>anti-swearword",
  aliases: ["as", "swearword", "antisw"],
  run: async function run(client, message, args) {
    
    let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";
    
    if(!statusBadDB.tiene(`${message.guild.id}`)) await statusBadDB.establecer(`${message.guild.id}`, {status: "off", rolesAllowed: [], word: []})
    
    let embedNoPermissions = new Discord.MessageEmbed()

      .setDescription("You need `MANAGE MESSAGES` permission to use this command.")
      .setColor('#2f3136')

    if (!message.member.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "> `MANAGE MESSAGES` permissions to be able to active anti-swearword. Try to re-enter the bot with the appropriate permissions and fix the permissions of the current channel. If this does not work, contact the owner **Jean#3897**."
      );
    
    let embedHelp = new Discord.MessageEmbed()
      
        .addField('Enable System Swearword', `\`${prefix}anti-swearword on\``)
        .addField('Disable System Swearword', `\`${prefix}anti-swearword off\``)
        .addField('Add Roles To Whitelist', `\`${prefix}anti-swearword addrole <roleName>\``)
        .addField('Remove Roles from Whitelist', `\`${prefix}anti-swearword removerole <roleName>\``)
        .addField('Add Words to Blacklist', `\`${prefix}anti-swearword addword <word>\``)
        .addField('Remove Words To Whitelist', `\`${prefix}anti-swearword removeword <word>\``)
        .addField('Word Blacklist', `\`${prefix}anti-swearword wordlist\``)
        .addField('Remove Words To Whitelist', `\`${prefix}anti-swearword rolelist\``)
        .addField('Words Blacklist', `\`${prefix}anti-swearword addword\``)
        .addField('Roles Whitelist', `\`${prefix}anti-swearword rolelist\``)
        .setColor('#2f3136')
    
    let responseStatus = args[0]
    if(!responseStatus) return message.channel.send({embed: embedHelp})
    
    let statusActual = await statusBadDB.obtener(`${message.guild.id}.status`);
    
    if(responseStatus === "off"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedNope = new Discord.MessageEmbed()
      
        .setDescription("The anti-swearword system status was already on **Off**.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      if(statusActual === "off") return message.channel.send({embed: embedNope});
      
      let embedOff = new Discord.MessageEmbed()
      
        .setDescription("The anti-swearword system status has been set to **Off**.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      await statusBadDB.establecer(`${message.guild.id}.status`, "off")
      return message.channel.send({embed: embedOff})
    } else if(responseStatus === "on"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedNope = new Discord.MessageEmbed()
      
        .setDescription("The anti-swearword system status was already on **On**.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      if(statusActual === "on") return message.channel.send({embed: embedNope});
      
      let embedOn = new Discord.MessageEmbed()
      
        .setDescription("The anti-swearword system status has been set to **On**.")
        .setColor('#2f3136')
      
      await statusBadDB.establecer(`${message.guild.id}.status`, "on")
      return message.channel.send({embed: embedOn})
    } else if(responseStatus === "addrole"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a role name.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let roleArg = args.slice(1).join(" ")
      if(!roleArg) return message.channel.send({embed: embedType})
      
      let roleToAdd = message.guild.roles.cache.find(role => role.name === roleArg);
      
      let embedNoRole = new Discord.MessageEmbed()
      
        .setDescription("This role was not found.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      if(!roleToAdd) return message.channel.send({embed: embedNoRole})
      
      let embedExist = new Discord.MessageEmbed()
      
        .setDescription("This role already exist in the roles whitelist.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let existRoleDB = await statusBadDB.obtener(`${message.guild.id}.rolesAllowed`)
      if(existRoleDB.includes(roleToAdd.id)) return message.channel.send({embed: embedExist});
      
      await statusBadDB.push(`${message.guild.id}.rolesAllowed`, `${roleToAdd.id}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The ${roleToAdd} role has been correctly placed in the whitelist.`)
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
      
      
      
    } else if(responseStatus === "removerole"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a role name.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let roleArg = args.slice(1).join(" ")
      if(!roleArg) return message.channel.send({embed: embedType})
      
      let roleToAdd = message.guild.roles.cache.find(role => role.name === roleArg);
      
      let embedNoRole = new Discord.MessageEmbed()
      
        .setDescription("This role was not found.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      if(!roleToAdd) return message.channel.send({embed: embedNoRole})
      
      let embedExist = new Discord.MessageEmbed()
      
        .setDescription("This role doenst exist in the roles whitelist.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let existRoleDB = await statusBadDB.obtener(`${message.guild.id}.rolesAllowed`)
      if(!existRoleDB.includes(roleToAdd.id)) return message.channel.send({embed: embedExist});
      
      await statusBadDB.extract(`${message.guild.id}.rolesAllowed`, `${roleToAdd.id}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The ${roleToAdd} role has been correctly removed from whitelist.`)
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
      
      
      
    } else if(responseStatus === "addword"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a word.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let badArg = args.slice(1).join(" ").toLowerCase()
      if(!badArg) return message.channel.send({embed: embedType})
      
      let embedExist = new Discord.MessageEmbed()
      
        .setDescription("This word already exist in the bad words list.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let badWords = await statusBadDB.obtener(`${message.guild.id}.word`) 
      if(badWords.includes(badArg)) return message.channel.send({embed: embedExist});
      
      await statusBadDB.push(`${message.guild.id}.word`, `${badArg}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The \`${badArg}\` word has been correctly placed in the blacklist.`)
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
      
      
      
    } else if(responseStatus === "removeword"){
      
      if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send({ embed: embedNoPermissions });
      
      let embedType = new Discord.MessageEmbed()
      
        .setDescription("You need type a word.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let badArg = args.slice(1).join(" ").toLowerCase()
      if(!badArg) return message.channel.send({embed: embedType})
      
      
      let embedNoExist = new Discord.MessageEmbed()
      
        .setDescription("This word doenst exist in the bad words list.")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      let badWords = await statusBadDB.obtener(`${message.guild.id}.word`) 
      if(!badWords.includes(badArg)) return message.channel.send({embed: embedNoExist});
      
      await statusBadDB.extract(`${message.guild.id}.word`, `${badArg}`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(`The \`${badArg}\` word has been correctly remove from blacklist.`)
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
    } else if(responseStatus === "wordlist"){
      const nsfwemoji = client.emojis.cache.get("585783907660857354");
    
      if (!message.channel.nsfw)
      return message.channel.send(
        `${nsfwemoji} This command only work in NSFW channels`
      );
      
      let listDB = await statusBadDB.obtener(`${message.guild.id}.word`)
      
      let embedReady = new Discord.MessageEmbed()
      
        .setDescription(listDB.join(" \n") || "Nothing")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
    } else if(responseStatus === "rolelist"){
      
      let listDB = await statusBadDB.obtener(`${message.guild.id}.rolesAllowed`)
      
      listDB.map(x => `<@&${x}>`)
      
      let embedReady = new Discord.MessageEmbed()

      
        .setDescription(listDB.map(x => `<@&${x}>`).join(" \n")|| "Nothing")
        .setFooter('Anti Swearword')
        .setColor('#2f3136')
      
      return message.channel.send({embed: embedReady})
    } else {
      let embedHelp = new Discord.MessageEmbed()
      
        .addField('Enable System Swearword', `\`${prefix}anti-swearword on\``)
        .addField('Disable System Swearword', `\`${prefix}anti-swearword off\``)
        .addField('Add Roles To Whitelist', `\`${prefix}anti-swearword addrole <roleName>\``)
        .addField('Remove Roles from Whitelist', `\`${prefix}anti-swearword removerole <roleName>\``)
        .addField('Add Words to Blacklist', `\`${prefix}anti-swearword addword <word>\``)
        .addField('Remove Words To Whitelist', `\`${prefix}anti-swearword removeword <word>\``)
        .setColor('#2f3136')
    
      return message.channel.send({embed: embedHelp})
    }
    
    
  }
};
