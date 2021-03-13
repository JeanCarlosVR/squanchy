const Discord = require("discord.js");

module.exports = {
  name: "waifu",
  category: "fun",
  description: "Receive your level of being a waifu.",
  usage: "<prefix>waifu [mention]",
  run: async function run(client, message, args) {
    var member = message.mentions.members.first() || message.author;
    var options = [
      "1%",
      "2%",
      "3%",
      "4%",
      "5%",
      "6%",
      "7%",
      "8%",
      "9%",
      "10%",
      "11%",
      "12%",
      "13%",
      "14%",
      "15%",
      "16%",
      "17%",
      "18%",
      "19%",
      "20%",
      "21%",
      "22%",
      "23%",
      "24%",
      "25%",
      "26%",
      "27%",
      "28%",
      "29%",
      "30%",
      "31%",
      "32%",
      "33%",
      "34%",
      "35%",
      "36%",
      "37%",
      "38%",
      "39%",
      "40%",
      "41%",
      "42%",
      "43%",
      "44%",
      "45%",
      "46%",
      "47%",
      "48%",
      "49%",
      "50%",
      "51%",
      "52%",
      "53%",
      "54%",
      "55%",
      "56%",
      "57%",
      "58%",
      "59%",
      "60%",
      "61%",
      "62%",
      "63%",
      "64%",
      "65%",
      "66%",
      "67%",
      "68%",
      "69%",
      "70%",
      "71%",
      "72%",
      "73%",
      "74%",
      "75%",
      "76%",
      "77%",
      "78%",
      "79%",
      "80%",
      "81%",
      "82%",
      "83%",
      "84%",
      "85%",
      "86%",
      "87%",
      "88%",
      "89%",
      "90%",
      "91%",
      "92%",
      "93%",
      "94%",
      "95%",
      "96%",
      "97%",
      "98%",
      "99%",
      "100%",
      "101%"
    ];

    let response = options[Math.floor(Math.random() * options.length)];

    const embedResponse = new Discord.MessageEmbed()

      .setDescription(`<@${member.id}> Your are ${response} waifu.`)
      .setColor("#2f3136");

    message.channel
      .send({ embed: embedResponse })
      .then()
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  }
};
