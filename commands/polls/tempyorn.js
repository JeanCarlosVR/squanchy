const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "tempyesornot",
  category: "polls",
  description: "Temporaly poll of yes or not.",
  usage: "[]",
  aliases: ["tyn"],
  run: async function run(client, message, args) {

    var text = args.join(" ");
    var textstring = text.split("|");
    var [title, description, time] = textstring;
    
    let embedType = new Discord.MessageEmbed()
      .setDescription('You need type minimum a title. Usage: `<prefix>yorn Question|Description|Time`')
      .setColor('#2f3136')

    if (!title)
      return message.channel
        .send({embed: embedType})
        .then(function(message) {});
    
    let embedTime = new Discord.MessageEmbed()
      .setDescription('Defines the survey time  [1s, 1m, 1h, 1d...]. Usage: `<prefix>yorn Question|Description|Time`')
      .setColor('#2f3136')

    if (!time) return message.channel.send({embed: embedTime});

    var timer = ms(time)

    var channelname = message.channel;

    channelname.updateOverwrite(message.channel.guild.roles.everyone, {
      ADD_REACTION: false
    });

    if (!description) description = '** **'

    let embedPoll = new Discord.MessageEmbed()

      .setTitle(title)
      .setDescription(description)
      .setFooter(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL()
      )
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    let embedEnd = new Discord.MessageEmbed()

      .setTitle("The poll has been ended")
      .addField("In charge", `<@${message.author.id}>`, true)
      .addField("Duration", `${time}`, true)
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);
    
    let embedEndMD = new Discord.MessageEmbed()

      .setDescription(`${message.author} Your poll has over.`)
      .setColor('#2f3136')

    message.channel
      .send({ embed: embedPoll})
      .then(async embedMessage => {
        await embedMessage.react("✅"), await embedMessage.react("❌");
        await setTimeout(function() {
          message.author.send({embed: embedEndMD}) ||
            channelname.send({embed: embedEndMD});
        }, timer);
        await setTimeout(function() {
          channelname.send(embedEnd);
        }, timer);
      })

      .catch(error =>
        message.channel.send(
          `> A error has been ocurred, please contact Jean#3897, error: ${error}`
        )
      );
}
}