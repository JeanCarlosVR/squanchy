const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  category: "utility",
  description: "See avatar image.",
  usage: "[]",
  aliases: ["av"],
  run: async function run(client, message, args) {
   
  let img = message.mentions.users.first();
    if (!img) {
      const embedAvatarOne = new Discord.MessageEmbed()
        .setImage(`${message.author.avatarURL({ dynamic: true, format: 'png', size: 2048 })}`)
        .setColor('#2f3136')
        .setFooter(
          `Avatar of ${message.author.username}#${message.author.discriminator}`
        );
      
      message.channel
        .send({embed: embedAvatarOne })
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
  
    } else if (img.avatarURL({ dynamic: true, format: 'png', size: 2048 }) === null) {
      let embedNoHave = new Discord.MessageEmbed()
  
        .setDescription("The user **" + img.username + "** cant have a avatar!")
        .setColor('#2f3136')
      message.channel.send({embed: embedNoHave});
    } else {
      const embedAvatarTwo = new Discord.MessageEmbed()
        .setImage(`${img.avatarURL({ dynamic: true, format: 'png', size: 2048 })}`)
        .setColor('#2f3136')
        .setFooter(`Avatar of ${img.username}#${img.discriminator}`);
      message.channel
        .send({embed: embedAvatarTwo})
        .catch(error =>
          message.channel.send(
            `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
          )
        );
    }  
}
}