const Discord = require("discord.js");
const math = require("math-expression-evaluator");

module.exports = {
  name: "calc",
  category: "utility",
  description: "Calc.",
  usage: "[]",
  run: async function run(client, message, args) {
    
    let embedType = new Discord.MessageEmbed()
    
      .setDescription('Type a expression.')
      .setColor('#2f3136')
  
    if (!args[0]) {
      return message.channel.send({embed: embedType}); // Devuelve un mensaje si es que ejecuta el comando sin nada
    }
    
    let result;
    try {
      result = math.eval(args.join(" "));
    } catch (e) {
      result = "Syntax Error";
    }
    let embedResult = new Discord.MessageEmbed()
    
      .addField("Syntax", `\`\`\`\n${args.join(" ")}\`\`\``)
      .addField("Result", `\`\`\`\n${result}\`\`\``)
      .setColor('#2f3136')
    
    return message.channel.send({embed: embedResult});
}
}