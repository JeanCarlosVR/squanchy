const Discord = require("discord.js");
const { inspect } = require("util");
const fs = require("fs");

module.exports = {
  name: "eval",
  category: "bot",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    if(message.author.id !== "525842461655040011") return;

    const input = args.join(" ");
    if (!input)
      return message.author.send('Ingresa argumentos.');

    try {     
      let codein = args.join(" ");
        if(codein == "client.TOKEN") return;
        if(codein == "client.token") return;
        if(codein == "process.env.TOKEN") return;
        let code = eval(codein);
    

      let output = await eval(input);
      const type = typeof output;
      if (typeof output !== "string") output = inspect(output, {depth :0});

      if (output.length < 1025) {
        const embed = new Discord.MessageEmbed()
          .addField("**Input**", `\`\`\`js\n${input}\n\`\`\``)
          .addField("**Output**", `\`\`\`js\n${output}\n\`\`\``)
          .addField("**Type**", `\`\`\`${type}\`\`\``)
          .setColor('#2f3136')

        message.channel.send(embed);
      } else if (output.length > 1025) {
        try {
          fs.appendFile("./evaluation.txt", output, err => {
            if (err) {
              return message.author.send(err);
            }
            console.log("Archivo Creado");
          });
          await message.author.send(`Opps.`, {
            files: ["./evaluation.txt"]
          });
          
          try {
            fs.unlink("./evaluation.txt", function(err) {
              if (err) throw err;
              console.log("Archivo Borrado");
            });
          } catch (err) {
            return message.author.send(err);
          }
        } catch (err) {
          return message.author.send(err);
        }
        return;
      }
    } catch (err) {
      return message.channel.send("Nope" );
    } 
}
}