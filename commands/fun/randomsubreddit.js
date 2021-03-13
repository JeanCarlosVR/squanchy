const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randomsubreddit",
  category: "fun",
  description: "Get random subreddits.",
  usage: "[]",
  run: async function run(client, message, args) {
    let {
      data: {
        children: [
          {
            kind,
            data: {
              total_awards_received,
              link_title,
              body,
              author,
              link_url,
              link_permalink,
              permalink
            }
          }
        ]
      }
    } = await fetch(
      "http://www.reddit.com/r/random/comments.json?limit=5"
    ).then(response => response.json());

    var embedSubreddit = new Discord.MessageEmbed()

      .setAuthor(
        `${author}`,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Reddit_logo_orange.svg/1024px-Reddit_logo_orange.svg.png"
      )
      .setTitle(`${link_title}`)
      .setURL(`https://reddit.com` + `${permalink}`)
      .setDescription(`${body}`)
      .setImage(`${link_url}`)
      .setColor('#2f3136')
      .setTimestamp(message.createdAt);

    return message.channel
      .send({ embed: embedSubreddit })
      .catch(error =>
        message.channel.send(
          `> Sorry, The subreddit is very long, you can see the subreddit here: **https://reddit.com${permalink}** (Error: ${error})`
        )
      );
}
}