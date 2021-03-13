const Discord = require("discord.js");
const db = require("megadb");
let customprefix = new db.crearDB("customprefix");

module.exports = {
  name: "commands",
  category: "bot",
  description: "Get a list of all commands.",
  usage: "<prefix>commands [category]",
  aliases: ["ch", "cmds", "commandhelp", "helpcommand", "comandos"],
  run: async function run(client, message, args) {
    
    if(!args[0]) {
      let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";

      let embedHelp = new Discord.MessageEmbed()

      .setAuthor(client.user.username, client.user.avatarURL())
      .addField('👮 Moderation', `\`${prefix}commands moderation\``, true)
      .addField('🤪 Fun', `\`${prefix}commands fun\``, true)
      .addField('🛠️ Utility', `\`${prefix}commands utility\``, true)
      .addField('💬 Info', `\`${prefix}commands info\``, true)
      .addField('🔞 Nsfw', `\`${prefix}commands nsfw\``, true)
      .addField('📄 Text', `\`${prefix}commands text\``, true)
      .addField('😺 Animals', `\`${prefix}commands animals\``, true)
      .addField('🧊 Minecraft', `\`${prefix}commands minecraft\``, true)
      .addField('📊 Polls', `\`${prefix}commands polls\``, true)
      .addField('💰 Economy', `\`${prefix}commands economy\``, true)
      .addField('🤖 Bot', `\`${prefix}commands bot\``, true)
      .addField('** **', `** **`, true)
      .setFooter(client.commands.size + " Commands")
      .setColor('#2f3136')


      return message.channel.send({embed: embedHelp})
    } else if(args[0] === 'moderation') {

      let embedModeration = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Moderation', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "moderation").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedModeration})
    } else if(args[0] === 'fun') {

      let embedFun = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Fun', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "fun").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedFun})
    } else if(args[0] === 'utility') {

      let embedU = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Utility', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "utility").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedU})
    } else if(args[0] === 'animals') {

      let embedAnimals = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Animals', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "animals").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedAnimals})
    } else if(args[0] === 'bot') {

      let embedBot = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Bot', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "bot").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedBot})
    } else if(args[0] === 'minecraft') {

      let embedMine = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Minecraft', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "minecraft").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedMine})
    } else if(args[0] === 'nsfw') {
      
      const nsfwemoji = client.emojis.cache.get("585783907660857354");
    
      if (!message.channel.nsfw)
        return message.channel.send(
          `${nsfwemoji} This command only work in NSFW channels`
      );

      let embedNSFW = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > NSFW', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "nsfw").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedNSFW})
    } else if(args[0] === 'interaction') {

      let embedI = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Interaction', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "interaction").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedI})
    } else if(args[0] === 'text') {

      let embedText = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Text', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "text").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedText})
    } else if(args[0] === 'info') {

      let embedInfo = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Info', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "info").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedInfo})
    } else if(args[0] === 'polls') {

      let embedPo = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Polls', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "polls").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedPo})
    } else if(args[0] === 'economy') {

      let embedEco = new Discord.MessageEmbed()

      .setAuthor('Help > Commands > Economy', client.user.avatarURL())
      .setDescription(client.commands.filter((e) => e.category === "economy").map((x) => `\`${x.name}\``))
      .setColor('#2f3136')


      return message.channel.send({embed: embedEco})
    } else {
      let prefix = await customprefix.obtener(`${message.guild.id}`) || "w/";
      let embedHelp = new Discord.MessageEmbed()

      .setAuthor('Unknown Category', client.user.avatarURL())
      .addField('Moderation', `${prefix}commands moderation`, true)
      .addField('Fun', `${prefix}commands fun`, true)
      .addField('Utility', `${prefix}commands utility`, true)
      .addField('Info', `${prefix}commands info`, true)
      .addField('Nsfw', `${prefix}commands nsfw`, true)
      .addField('Text', `${prefix}commands text`, true)
      .addField('Animals', `${prefix}commands animals`, true)
      .addField('Minecraft', `${prefix}commands minecraft`, true)
      .addField('Bot', `${prefix}commands bot`, true)
      .setColor('#2f3136')


      return message.channel.send({embed: embedHelp})
    }
    
    
    
    
    ////////
  }
};
