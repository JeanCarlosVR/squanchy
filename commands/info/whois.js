const Discord = require("discord.js");
const db = require("megadb");
let economyDB = new db.crearDB("economyDB");
const cooldownRecently = new Map();
const humanizeDuration = require('humanize-duration');

const fetch = require("node-fetch")

module.exports = {
  name: "whois",
  category: "info",
  description: "Watch the information about any website.",
  usage: "<prefix>whois <domain>",
  run: async function run(client, message, args) {
    const cooldown = cooldownRecently.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(), { round: true });

      let cooldownForWork = new Discord.MessageEmbed()
    
        .setDescription(`Do you wait ${remaining} to search another website whois again.`)
        .setColor("#2f3136");

      return message.channel.send({embed: cooldownForWork})
        .catch(console.error);
    } else {

      if(!args[0]) return message.channel.send({ embed: {
        description: `You have to provide the domain name of any website.`
      } });



      const _r = await fetch(`https://rdap.centralnic.com/host/domain/${args[0].slice(0, 200)}`).then((res) => res.json()).catch(() => message.channel.send("a error has been ocurred"));

      if(!_r.objectClassName) {
        message.channel.send(`a error has been ocurred`)
      }
      const fields = [];
      for(let nameserver of _r.nameservers) {
        fields.push({
          name: `Name Server`,
          value: `**Name**: ${nameserver.ldhName}\n**Status**: ${nameserver.status.map(e => `${e}, `)}`
        })
      }

      message.channel.send({
        embed: {
          description: `Domain: ${args[0].slice(0, 200)}\nDomain ID: ${_r.handle || "none"}`,
          fields
        }
      })
      
      cooldownRecently.set(message.author.id, Date.now() + 8000);
      setTimeout(() => cooldownRecently.delete(message.author.id), 8000);
    }
  }
};
