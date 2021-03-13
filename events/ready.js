const Discord = require("discord.js");

module.exports = client => {
  console.log(`--------------------------------------------------------`);
  console.log(` `);
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  console.log(` `);
  console.log(`--------------------------------------------------------`);

  const activities_list = [
    `@Waifuu help | ${client.guilds.cache.size} Guilds`,
    `waifuu.glitch.me | ${client.users.cache.size} Users`,
    `Since 2019 | ${client.channels.cache.size} Channels`,
    `w/ Default prefix | @JeanCarlosV_R`,
  ];

  setInterval(() => {
    const activitiesRandom = Math.floor(
      Math.random() * (activities_list.length - 1) + 1
    );
    client.user.setActivity(activities_list[activitiesRandom], {
      type: "WATCHING"
    });
  }, 8000);


  client.user.setStatus("online");
};