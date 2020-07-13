const botconfig = require("./botconfig.json");
const guildPersonality = require("./server_settings.json");
const emoji = require("./emotes.json")
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
    console.log(`We released the Kraken`)
    bot.user.setActivity("type -help for help")
});

bot.on("guildMemberAdd", function (member) {
    member.send(`Hi ${member.toString()}. Welcome to ${member.guild.name} please check the Welcome and Rule channels. we have Openings if you wanna help us out`);
});

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    if (message.type === "PINS_ADD") message.delete(1);

    let join = botconfig.join;
    let leave = botconfig.leave;
    let vote = botconfig.vote;
    var argssingle = message.content.split(" ");

    switch (argssingle[0].toLocaleLowerCase()) {
        case `${botconfig.prefix}help`:
            return message.author.send(guildPersonality.messages.help);

        case vote:
            return voting(message);

        case leave:
            if (argssingle.length <= 1)
                return;

            var args1 = argssingle[1];

            if (!guildPersonality.roles.includes(args1))
                return message.reply("this role is not supported");
            var roler = message.guild.roles.cache.find(r => r.name === args1);

            if (!message.member.roles.cache.has(roler.id))
                return message.reply("you don't have that role");

            message.member.roles.remove(roler).catch(console.error);
            return message.reply(`:crab: is gone from \"${args1}\" :crab: `);

        case join:
            if (argssingle.length <= 1)
                return;

            var args1 = argssingle[1];

            if (!guildPersonality.roles.includes(args1))
                return message.reply("this role is not supported");
            var roler = message.guild.roles.cache.find(r => r.name === args1);

            if (message.member.roles.cache.has(roler.id))
                return message.reply("you already have that role");

            message.member.roles.add(roler).catch(console.error);
            return message.reply(` Achievement Get! \" ${args1} \" `);

        default:
            return;
    }

});
bot.login(botconfig.token);

function voting(message) {
    var modRole = message.guild.roles.cache.find(role => role.name === "ModStaff");
    if (message.member.roles.cache.has(modRole.id)) {
        var voteInMessage = message.content;
        var voteIn = voteInMessage.split(botconfig.votesplit);
        var votemessage = voteIn[1].split(botconfig.votesplit2);
        var voteArgC = votemessage.length;
        let content = `${emoji.emotes.q.text} ${votemessage[0]} \n`;
        for (let index = 1; index < voteArgC; index++) {
            content = content + `${emoji.emotes.numbers[index].text} ${votemessage[index]} \n`;
        }
        message.channel.send(content).then(async message => {
            message.pin();
            for (let index = 1; index < voteArgC; index++) {
                await message.react(emoji.emotes.numbers[index].emote)
            }
        })
    }
}
