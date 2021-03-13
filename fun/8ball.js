const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  category: "fun",
  description: "Get answers to your questions.",
  usage: "<prefix>8ball <Question>",
  run: async function run(client, message, args) {
    
    let embedAsk = new Discord.MessageEmbed()
    
      .setDescription('You need to ask something.')
      .setColor('#2f3136')
    
    
    var question = args.join(" ");
    if (!question) return message.channel.send({embed: embedAsk});

    var options = [
      "Yes",
      "Not",
      "Maybe",
      "Definitely not",
      "Definitely yes",
      "Probably yes",
      "Probably not",
      "Never",
      "I will meditate for a while"
    ];

    var response = options[Math.floor(Math.random() * options.length)];

    const embedResponse = new Discord.MessageEmbed()

      .setTitle("Ask your questions")
      .addField("Question", question)
      .addField("Reply", response)
      .setColor('#2f3136')

    message.channel
      .send({embed: embedResponse})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
}
}