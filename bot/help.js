const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "help",
  category: "bot",
  description: "Get commands help.",
  usage: "[]",
  aliases: ["ayuda"],
  run: async function run(client, message, args) {
    let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";

    if (args[0]) {
      
      let embedHelp = new Discord.MessageEmbed()

        .setAuthor("Unknown Command", client.user.avatarURL())
        .setColor('#2f3136')
        .setDescription(`**Prefix**: \`${prefix}\` or <@${client.user.id}> \n**Documentation**: [Here](https://waifuu.glitch.me) \n**Support**: [Here](https://discord.gg/yYsj8p4) \n**Invite**: [Here](https://discordapp.com/api/oauth2/authorize?client_id=637108716151504926&permissions=2147483127&scope=bot) \n \nTo view all command type \`${prefix}commands\``)
        .setFooter(`Vote for bot ${prefix}vote `)
      return message.channel.send({embed: embedHelp})
    
        let cmd = client.commands.get(args[0]).catch(message.channel.send(embedHelp))
        if(cmd) {
            
          let embedToHelp = new Discord.MessageEmbed()
          
            .setTitle('Help Command')
            .setDescription(`**Note**: \`<>\` Is required and \`[]\` Is optional \n \nName: \`${cmd.name}\` \nDescription: \`${cmd.description}\` \nCategory: \`${cmd.category}\` \nUsage: \`${cmd.usage}\` \nAliases: \`${cmd.aliases ? cmd.aliases.join(", ") : "No aliases"}\``)
            .setColor('#2f3136')
          
          return message.channel.send({embed: embedToHelp})
        }
    } else {
      let embedHelp = new Discord.MessageEmbed()

        .setAuthor(client.user.username, client.user.avatarURL())
        .setColor('#2f3136')
        .setDescription(`**Prefix**: \`${prefix}\` or <@${client.user.id}> \n**Documentation**: [Here](https://waifuu.glitch.me) \n**Support**: [Here](https://discord.gg/yYsj8p4) \n**Invite**: [Here](https://discordapp.com/api/oauth2/authorize?client_id=637108716151504926&permissions=2147483127&scope=bot) \n \nTo view all command type \`${prefix}commands\``)
        .setFooter(`Vote for bot ${prefix}vote`)

      return message.channel.send({embed: embedHelp})
    }
  }
};