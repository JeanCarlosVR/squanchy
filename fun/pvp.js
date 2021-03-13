const Discord = require("discord.js");

module.exports = {
  name: "pvp",
  category: "fun",
  description: "",
  usage: "<prefix>pvp <mention>",
  run: async function run(client, message, args) {
    let embedMention = new Discord.MessageEmbed()

      .setDescription("Multiples users is not available.")
      .setColor("#2f3136");

    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send(
        "> You have to mention a member of the server"
      );

    if (args[1]) return message.channel.send("Multiples users not available.");

    let options = [
      `<@${member.user.id}>. drinks a speed 1 potion and pulls out :crossed_swords:. <@${message.author.id}> Toggles their hacks and begins to combo <@${member.user.tag}>. with :axe:. <@${member.user.id}>. is dropped down to 1.5:heart:s.<@${member.user.id}>. pulls out a :crossed_swords: which strikes <@${message.author.id}> down to 0.5:heart:s. <@${member.user.id}>. destroys <@${message.author.id}>. <@${member.user.id}> types in the chat: "GG"`,
      `<@${member.user.id}> jumps into combat with <@${message.author.id}>. <@${member.user.id}> is equipped with a :wrench:. <@${member.user.id}> combos <@${message.author.id}> down to 7:heart:s.<@${message.author.id}> pulls out a :scissors: which strikes <@${member.user.id}> down to 5.5:heart:s. <@${member.user.id}> kills <@${message.author.id}>. <@${message.author.id}> types in the chat: "Bye Bye".`
    ];

    let response = options[Math.floor(Math.random() * options.length)];

    const embedPvp = new Discord.MessageEmbed()

      .setTitle(`${message.author.username} VS ${member.user.tag}`)
      .setDescription(`${response}`)
      .setColor("#2f3136");

    message.channel
      .send({ embed: embedPvp })
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  }
};
