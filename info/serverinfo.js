const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "info",
  description: "Watch the guild information.",
  usage: "<prefix>serverinfo",
  aliases: ["guildinfo", "guild", "server"],
  run: async function run(client, message, args) {
    
    const mentionemoji = client.emojis.cache.get("658538492019867683");
    const voiceemoji = client.emojis.cache.get("585788304210001920");
    const addemoji = client.emojis.cache.get("658538492334178315");
    const memberemoji = client.emojis.cache.get("658538493470965787");
    const owneremoji = client.emojis.cache.get("585789630800986114");
    const channelemoji = client.emojis.cache.get("585783907841212418");
    const richemoji = client.emojis.cache.get("658538493521166336");
    const typeemoji = client.emojis.cache.get("393848431413559296");
    const pinemoji = client.emojis.cache.get("658538493202530336");
    const botemoji = client.emojis.cache.get("230105988211015680");
    const staffemoji = client.emojis.cache.get("314348604095594498");
    const tier1 = client.emojis.cache.get("585764032162562058");
    const tier2 = client.emojis.cache.get("585764032162562058");
    const tier3 = client.emojis.cache.get("585764446220189716");
    
    let verifLevels = {
      "NONE": "**None** [Unrestricted]",
      "LOW": "**Low** [Must have a verified email on their Discord account.]",
      "MEDIUM": "**Medium** [Must also be registered on Discord for longer than 5 minutes.]",
      "HIGH": "**Hight** [Must also be a member of this server for longer than 10 minutes.]",
      "VERY_HIGH": "**Very Hight** [Must have a verified phone on their Discord account.]"
    };
    
    let explicitContentLevel = {
      "DISABLED": `Disabled`,
      "MEMBERS_WITHOUT_ROLES": `Scan Only Members Without Roles`,
      "ALL_MEMBERS": `Scan All Members`
    }
    
    let mfaLevelLevel = {
      0: `Disabled`,
      1: `Elevated`,
    }
    
    let premiumTierLevel = {
      0: `Level 0`,
      1: `${tier1} Level 1`,
      2: `${tier2}Level 2`,
      3: `${tier3}Level 3`
    }

    let noSirve = {
      "INVITE_SPLASH": "Invite Splash",
      "WELCOME_SCREEN_ENABLED": "Welcome Screen",
      "PUBLIC_DISABLED": "Disable Public",
      "BANNER": "Banner",
      "ANIMATED_ICON": "Animated Icon",
      "FEATURABLE": "Featurable",
      "DISCOVERABLE": "Discoverable",
      "NEWS": "News",
      "COMMERCE": "Commerce",
      "PUBLIC": "Public",
      "PARTNERED": "Partnered",
      "VERIFIED": "Verified",
      "VANITY_URL": "Vanity Url",
      "VIP_REGIONS": "Vip Regions",
      "COMMUNITY": "Community"
    }
    
    let region = {
      brazil: ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      singapore: ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      sydney: ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      london: ":flag_gb: London",
      amsterdam: ":flag_nl: Amsterdam",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Russia",
      southafrica: ":flag_za:  South Africa"
    };

    let server = message.guild;
    let text = message.guild.channels.cache.filter(c => c.type === "text").size;
    let voice =
      message.guild.channels.cache.filter(c => c.type === "voice").size ||
      "No voice channels";
    let totalc = message.guild.channels.cache.filter(c => c.type !== "category").size;
    let humancount = message.guild.members.cache.filter(member => !member.user.bot)
      .size;
    let botcount = message.guild.members.cache.filter(member => member.user.bot).size;
    let roleslist =
      message.guild.roles.cache.map(role => role.name).join(", ") || "No roles";
    let emojilist =
      message.guild.emojis.cache.map(e => e.toString()).join(" | ") || "No emojis";
    
    let featurelist = message.guild.features.map(f => noSirve[f]).join(', ') || "No features";
    
    const embedInfo = new Discord.MessageEmbed()
      .setThumbnail(server.iconURL())
      .setAuthor(server.name, server.iconURL())
      .addField(`${typeemoji} Name`, server.name, true)
      .addField(`${owneremoji} Owner`, `<@${server.owner.id}>`, false)
      .addField(":triangular_flag_on_post: Region", region[server.region], true)
      .addField(`${pinemoji} Created`, server.createdAt.toDateString(), false)
      .addField(`${memberemoji} Member Total`, server.memberCount, true)
      .addField(`${addemoji} Humans`, humancount, true)
      .addField(`${botemoji} Bots`, botcount, true)
      .addField(`${richemoji} Total Channels`, totalc, true)
      .addField(`${channelemoji} Text Channels`, text, true)
      .addField(`${voiceemoji} Voice Channels`, voice, true)
      .addField(`${mentionemoji} Total Roles`, server.roles.cache.size, true)
      .addField(`${staffemoji} Verification`, verifLevels[message.guild.verificationLevel], false)
      .addField(":mag: Explicit Content Filter", explicitContentLevel[message.guild.explicitContentFilter], false)
      .addField(`${tier1} Boost Level`, premiumTierLevel[message.guild.premiumTier], true)
      .addField(`${tier1} Boosts`, message.guild.premiumSubscriptionCount + " Boosters", true)
      .addField(':scales: Features', featurelist, false)
      .setColor('#2f3136')

    message.channel
      .send({embed: embedInfo})
      .catch(error =>
        message.channel.send(
          `> Sorry, ${message.author} A error ocurred, Please contact Jean#3897, error: ${error}.`
        )
      );
  
}
}