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
            return leaver(message);
        case join:
            return joiner(message);
        default:
            return;
    }

    // //this code is less effecient than two seperate methods but easier to maintain
    // if (argssingle[0] === leave || argssingle[0] === join) {
    //     var args1 = argssingle[1].toLocaleLowerCase();
    //     // role => role.name === "ModStaff"
    //     if (!message.member.roles.has(message.guild.roles.find(role => role.name === `${args1}`))) {
    //         switch (args1) {
    //             case "nofreegames":
    //                 break;
    //             case "netTest":
    //                 break;
    //             case "helfer":
    //                 break;
    //             case "lfg":
    //                 break;
    //             default:
    //                 return message.reply("thats not a role please check out my help page https://meshstyles.github.io/unilandiscordbot/");
    //         }
    //         if (argssingle[0] === leave) { leaver() }
    //         if (argssingle[0] === join) { joiner() }
    //     }
    // }
    // if (message.content.startsWith(leave)) {
    //     var args1 = argssingle[1].toLocaleLowerCase();
    // }

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

function joiner() {
    var roler = message.guild.roles.find(role => role.name === `${args1} `);
    message.reply(` Achievement Get! \" ${args1} \" `);
    return member.addRole(roler).catch(console.error);
}

function leaver() {
    var roler = message.guild.roles.find(role => role.name === `${args1}`);
    message.reply(`:crab: is gone from \"${args1}\" :crab: `);
    return member.removeRole(roler).catch(console.error);
}