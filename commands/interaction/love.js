const Discord = require("discord.js");

module.exports = {
  name: "love",
  category: "interaction",
  description: "",
  usage: "[]",
  run: async function run(client, message, args) {
    var options = [
      ":broken_heart: 1% :broken_heart:",
      ":poop: :broken_heart: 2% :broken_heart: :poop:",
      ":poop: :broken_heart: 3% :broken_heart: :poop:",
      ":poop: :broken_heart: 4% :broken_heart: :poop:",
      ":poop: :broken_heart: 5% :broken_heart: :poop:",
      ":poop: :broken_heart: 6% :broken_heart: :poop:",
      ":poop: :broken_heart: 7% :broken_heart: :poop:",
      ":poop: :broken_heart: 8% :broken_heart: :poop:",
      ":poop: :broken_heart: 9% :broken_heart: :poop:",
      ":poop: :broken_heart: 10% :broken_heart: :poop:",
      ":broken_heart: 11% :broken_heart:",
      ":broken_heart: 12% :broken_heart:",
      ":broken_heart: 13% :broken_heart:",
      ":broken_heart: 14% :broken_heart:",
      ":broken_heart: 15% :broken_heart:",
      ":broken_heart: 16% :broken_heart:",
      ":broken_heart: 17% :broken_heart:",
      ":broken_heart: 18% :broken_heart:",
      ":broken_heart: 19% :broken_heart:",
      ":broken_heart: 20% :broken_heart:",
      ":broken_heart: 21% :broken_heart:",
      ":broken_heart: 22% :broken_heart:",
      ":broken_heart: 23% :broken_heart:",
      ":broken_heart: 24% :broken_heart:",
      ":broken_heart: 25% :broken_heart:",
      ":broken_heart: 26% :broken_heart:",
      ":broken_heart: 27% :broken_heart:",
      ":broken_heart: 28% :broken_heart:",
      ":broken_heart: 29% :broken_heart:",
      ":broken_heart: 30% :broken_heart:",
      ":broken_heart: 31% :broken_heart:",
      ":broken_heart: 32% :broken_heart:",
      ":broken_heart: 33% :broken_heart:",
      ":broken_heart: 34% :broken_heart:",
      ":broken_heart: 35% :broken_heart:",
      ":broken_heart: 36% :broken_heart:",
      ":broken_heart: 37% :broken_heart:",
      ":broken_heart: 38% :broken_heart:",
      ":broken_heart: 39% :broken_heart:",
      ":broken_heart: 40% :broken_heart:",
      ":broken_heart: 41% :broken_heart:",
      ":broken_heart: 42% :broken_heart:",
      ":broken_heart: 43% :broken_heart:",
      ":broken_heart: 44% :broken_heart:",
      ":broken_heart: 45% :broken_heart:",
      ":broken_heart: 46% :broken_heart:",
      ":broken_heart: 47% :broken_heart:",
      ":broken_heart: 48% :broken_heart:",
      ":broken_heart: 49% :broken_heart:",
      ":broken_heart: 50% :broken_heart:",
      ":hearts: 51% :hearts:",
      ":hearts: 52% :hearts:",
      ":hearts: 53% :hearts:",
      ":hearts: 54% :hearts:",
      ":hearts: 55% :hearts:",
      ":hearts: 56% :hearts:",
      ":hearts: 57% :hearts:",
      ":hearts: 58% :hearts:",
      ":hearts: 59% :hearts:",
      ":hearts: 60% :hearts:",
      ":hearts: 61% :hearts:",
      ":hearts: 62% :hearts:",
      ":hearts: 63% :hearts:",
      ":hearts: 64% :hearts:",
      ":hearts: 65% :hearts:",
      ":hearts: 66% :hearts:",
      ":hearts: 67% :hearts:",
      ":hearts: 68% :hearts:",
      ":hearts: 69% :hearts:",
      ":hearts: 70% :hearts:",
      ":hearts: 71% :hearts:",
      ":hearts: 72% :hearts:",
      ":hearts: 73% :hearts:",
      ":hearts: 74% :hearts:",
      ":hearts: 75% :hearts:",
      ":hearts: 76% :hearts:",
      ":hearts: 77% :hearts:",
      ":hearts: 78% :hearts:",
      ":hearts: 79% :hearts:",
      ":hearts: 80% :hearts:",
      ":hearts: 81% :hearts:",
      ":hearts: 82% :hearts:",
      ":hearts: 83% :hearts:",
      ":hearts: 84% :hearts:",
      ":hearts: 85% :hearts:",
      ":hearts: 86% :hearts:",
      ":hearts: 87% :hearts:",
      ":hearts: 88% :hearts:",
      ":hearts: 89% :hearts:",
      ":sparkling_heart: 90% :sparkling_heart:",
      ":sparkling_heart: 91% :sparkling_heart:",
      ":sparkling_heart: 92% :sparkling_heart:",
      ":sparkling_heart: 93% :sparkling_heart:",
      ":sparkling_heart: 94% :sparkling_heart:",
      ":sparkling_heart: 95% :sparkling_heart:",
      ":sparkling_heart: 96% :sparkling_heart:",
      ":sparkling_heart: 97% :sparkling_heart:",
      ":sparkling_heart: 98% :sparkling_heart:",
      ":sparkling_heart: 99% :sparkling_heart:",
      ":sparkling_heart: 100% :sparkling_heart:",
      ":sparkling_heart: 101% :sparkling_heart:"
    ];

    let embedMention = new Discord.MessageEmbed()
    
      .setDescription('You have to mention a member of the server.')
      .setColor("#ff0061");
    
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send({embed: embedMention});

    let membertwo = message.mentions.members.first(2)[1];

    let response = options[Math.floor(Math.random() * options.length)];

    let embedOne = new Discord.MessageEmbed()

      .setDescription(`Your Love with <@${member.user.id}> is  ${response}`)
      .setColor("#ff0061");

    let embedtwo = new Discord.MessageEmbed()

      .setDescription(
        `The love from <@${member.user.id}> to ${membertwo} is  ${response}`
      )
      .setColor("#ff0061");

    if (!membertwo) return message.channel.send({ embed: embedOne });

    message.channel
      .send({embed: embedtwo})
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      ); 
}
}