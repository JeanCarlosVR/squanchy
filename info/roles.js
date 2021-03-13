const Discord = require("discord.js");

module.exports = {
  name: "roles",
  category: "info",
  description: "See a list of all roles.",
  usage: "<prefix>roles",
  run: async function run(client, message, args) {

    let roleslist =
      message.guild.roles.cache.map(role => role.name).join(" \n") || "No roles";
    
    const embedRoles = new Discord.MessageEmbed()
    
      .setTitle('List Roles')
      .setDescription(roleslist)
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedRoles})
}
}