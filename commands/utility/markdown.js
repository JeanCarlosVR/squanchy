const Discord = require("discord.js");

module.exports = {
  name: "markdown",
  category: "utility",
  description: "Watch of guide about markdown.",
  usage: "[]",
  run: async function run(client, message, args) {
    
    let embedMarkdown = new Discord.MessageEmbed()
    
    
      .setTitle('A complete markdown guide.')
      .setDescription('**Bold** ```**Bold**``` \n*Italics* ```*Italics* or _Italics_```\n__Underline__ ```__Underline__```\n~~Strikethrough~~ ```~~Strikethrough~~```\nThe above styles can be combined with each other. \n \n \n`Wrapping` ````Wrapping` ``` \n```css\nMultiple\n```')
      .setImage('https://support.discord.com/hc/article_attachments/115000864772/screen_03.png')
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedMarkdown});
}
}