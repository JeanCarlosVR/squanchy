const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pokedex",
  category: "fun",
  description: "Know all pokemons.",
  usage: "<prefix>pokedex <Pokemon Name>",
  run: async function run(client, message, args) {
    let embedType = new Discord.MessageEmbed()

      .setDescription("You need type a name pokemon.")
      .setColor("#ff0061");

    let embedExist = new Discord.MessageEmbed()

      .setDescription("This pokemon doesnt exist.")
      .setColor("#ff0061");

    let pokemon = args[0];
    if (!pokemon) return message.channel.send({ embed: embedType });

    let {
      name,
      description,
      type,
      species,
      abilities,
      height,
      weight,
      gender,
      generation,
      base_experience,
      egg_groups,
      stats: { hp, attack, defense, speed },
      sprites: { normal, animated }
    } = await fetch(
      "https://some-random-api.ml/pokedex?pokemon=" + `${pokemon}`
    )
      .then(response => response.json())
      .catch(m => message.channel.send({ embed: embedExist }));

    let embed = new Discord.MessageEmbed()

      .setAuthor(name.toUpperCase(), animated)
      .setDescription(description)
      .addField(`Type`, type, true)
      .addField(`Specie`, species, true)
      .addField(`Abilities`, abilities, true)
      .addField(`Height`, height, true)
      .addField(`Weight`, weight, true)
      .addField(`Gender`, gender, true)
      .addField(`Generation`, generation, true)
      .addField(`Egg Group`, egg_groups, true)
      .addField(`Base Experience`, base_experience, true)
      .addField(`Health`, hp, true)
      .addField(`Attack`, attack, true)
      .addField(`Defense`, defense, true)
      .addField(`Speed`, speed, true)
      .setThumbnail(animated)
      .setColor('#2f3136')

    return message.channel
      .send(embed)
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  }
};
