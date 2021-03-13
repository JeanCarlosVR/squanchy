const Discord = require("discord.js");

module.exports = {
  name: "multiple",
  category: "polls",
  description: "Normal multiple poll.",
  usage: "[]",
  aliases: ["mul"],
  run: async function run(client, message, args) {
    var text = args.join(" ");
    var textstring = text.split("|");
    var [
      title,
      description,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
      ten
    ] = textstring;
    
    let embedType = new Discord.MessageEmbed()
      .setDescription('You need type minimum a title. Usage: `<prefix>multiple Question|Description|Option 1|Option 2|...`')
      .setColor('#2f3136')

    if (!title) return message.channel.send({embed: embedType});

    if (!description) description = '** **'
    
    let embedTypeOne = new Discord.MessageEmbed()
      .setDescription('You need type minimum a option. Usage: `<prefix>multiple Question|Description|Option 1|Option 2|...`')
      .setColor('#2f3136')

    if (!one) return message.channel.send({embed: embedTypeOne});

    if (!two) two = "Not voting.";

    var embed2 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed3 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed4 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed5 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed6 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .addField("Choose 6", six)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed7 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .addField("Choose 6", six)
      .addField("Choose 7", seven)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed8 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .addField("Choose 6", six)
      .addField("Choose 7", seven)
      .addField("Choose 8", eight)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed9 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .addField("Choose 6", six)
      .addField("Choose 7", seven)
      .addField("Choose 8", eight)
      .addField("Choose 9", nine)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    var embed10 = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .addField("Choose 1", one)
      .addField("Choose 2", two)
      .addField("Choose 3", three)
      .addField("Choose 4", four)
      .addField("Choose 5", five)
      .addField("Choose 6", six)
      .addField("Choose 7", seven)
      .addField("Choose 8", eight)
      .addField("Choose 9", nine)
      .addField("Choose 10", ten)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    //END EMBED LIST

    if (ten)
      return message.channel
        .send({ embed: embed10 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
          await embedMessage.react("6️⃣");
          await embedMessage.react("7️⃣");
          await embedMessage.react("8️⃣");
          await embedMessage.react("9️⃣");
          await embedMessage.react("🔟");
        });

    if (nine)
      return message.channel
        .send({ embed: embed9 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
          await embedMessage.react("6️⃣");
          await embedMessage.react("7️⃣");
          await embedMessage.react("8️⃣");
          await embedMessage.react("9️⃣");
        });

    if (eight)
      return message.channel
        .send({ embed: embed8 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
          await embedMessage.react("6️⃣");
          await embedMessage.react("7️⃣");
          await embedMessage.react("8️⃣");
        });

    if (seven)
      return message.channel
        .send({ embed: embed7 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
          await embedMessage.react("6️⃣");
          await embedMessage.react("7️⃣");
        });

    if (six)
      return message.channel
        .send({ embed: embed6 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
          await embedMessage.react("6️⃣");
        });

    if (five)
      return message.channel
        .send({ embed: embed5 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
          await embedMessage.react("5️⃣");
        });

    if (four)
      return message.channel
        .send({ embed: embed4 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
          await embedMessage.react("4️⃣");
        });

    if (three)
      return message.channel
        .send({ embed: embed3 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
          await embedMessage.react("3️⃣");
        });

    if (two)
      return message.channel
        .send({ embed: embed2 })
        .then(async embedMessage => {
          await embedMessage.react("1️⃣");
          await embedMessage.react("2️⃣");
        });
}
}