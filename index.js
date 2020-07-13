const botconfig = require("./botconfig.json");
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

    let prefix = botconfig.prefix;
    let join = botconfig.join;
    let leave = botconfig.leave;
    let vote = botconfig.vote;
    let member = message.member;
    var argssingle = message.content.split(" ");
    if (message.content.startsWith(prefix)) {
        //bot uptime calc
        let botuptime = bot.uptime;
        botuptime = botuptime * 0.001;
        //uptime
        switch (message.content.toLocaleLowerCase()) {
            case `${prefix}help`:
                return message.author.send(botconfig.messages.help.en);
            case `${prefix}hilfe`:
                return message.author.send(botconfig.messages.help.de)
            // case `${prefix}serverinfo`:
            //     let sicon = message.guild.iconURL;
            //     let serverembed = new Discord.RichEmbed()
            //         .setDescription("Server Information")
            //         .setColor("#ff7357")
            //         .setThumbnail(sicon)
            //         .addField("Server Name", message.guild.name)
            //         .addField("Created on", message.guild.createdAt)
            //         .addField("You Joined", message.member.joinedAt)
            //         .addField("Total Memebers", message.guild.memberCount)
            //         .addField("AFK Timeout Limit", message.guild.afkTimeout)
            //         .addField("Uptime in sec", botuptime);
            //     return message.channel.send(serverembed);
            // case `${prefix}botinfo`:
            //     message.delete(1);
            //     let bicon = bot.user.displayAvatarURL;
            //     let botembed = new Discord.RichEmbed()
            //         .setDescription("Bot Information")
            //         .setColor("#ff7357")
            //         .setThumbnail(bicon)
            //         .addField("Bot Name", bot.user.username)
            //         .addField("Uptime in sec", botuptime);
            //     return message.channel.send(botembed);
        }
    }
    //vote
    if (message.content.startsWith(vote)) {
        var myRole = message.guild.roles.find(role => role.name === "ModStaff");
        if (message.member.roles.has(myRole.id)) {
            var voteInMessage = message.content;
            var voteIn = voteInMessage.split(botconfig.votesplit);
            var votemessage = voteIn[1].split(botconfig.votesplit2);
            var voteArgC = votemessage.length;

            //votes Switch
            switch (voteArgC) {

                case 3:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2])
                        .then(async message => {
                            //please note the lacking support of utf-8 emoji support for these
                            // https://github.com/discordjs/discord.js/issues/2287
                            // another listing solutions https://stackoverflow.com/questions/49225971/discord-js-message-react-fails-when-adding-specific-unicode-emotes
                            message.pin();
                            await message.react('1⃣');
                            await message.react('2⃣');
                        }).catch(function (error) {
                        });
                    return;

                case 4:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2] + "\n" + ":three: " + votemessage[3])
                        .then(async message => {
                            message.pin();
                            await message.react('1⃣');
                            await message.react('2⃣');
                            await message.react('3⃣');
                        }).catch(function (error) {
                        });
                    return;

                case 5:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2] + "\n" + ":three: " + votemessage[3] + "\n" + ":four: " + votemessage[4])
                        .then(async message => {
                            message.pin();
                            await message.react('1⃣');
                            await message.react('2⃣');
                            await message.react('3⃣');
                            await message.react('4⃣');
                        }).catch(function (error) {
                        });
                    return;

                default:
                    return message.channel.send(botconfig.messages.votes.en);
            }
        }
    }

    //this code is less effecient than two seperate methods but easier to maintain
    if (argssingle[0] === leave || argssingle[0] === join) {
        var args1 = argssingle[1].toLocaleLowerCase();
        // role => role.name === "ModStaff"
        if (!message.member.roles.has(message.guild.roles.find(role => role.name === `${args1}`))) {
            switch (args1) {
                case "nofreegames":
                    break;
                case "netTest":
                    break;
                case "helfer":
                    break;
                case "lfg":
                    break;
                default:
                    return message.reply("thats not a role please check out my help page https://meshstyles.github.io/unilandiscordbot/");
            }
            if (argssingle[0] === leave) { leaver() }
            if (argssingle[0] === join) { joiner() }
        }
    }
    function joiner() {
        var roler = message.guild.roles.find(role => role.name === `${args1}`);
        message.reply(` Achievement Get! \" ${args1} \" `);
        return member.addRole(roler).catch(console.error);
    }
    function leaver() {
        var roler = message.guild.roles.find(role => role.name === `${args1}`);
        message.reply(`:crab: is gone from \"${args1}\" :crab: `);
        return member.removeRole(roler).catch(console.error);
    }
    if (message.content.startsWith(leave)) {
        var args1 = argssingle[1].toLocaleLowerCase();

    }

});
bot.login(botconfig.token);
