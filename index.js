const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
    member.send("Hi " + member.toString() + " and welcome on the FRAUAS UNILAN Discord please check the Welcome and Rule channels. we have Openings if you wanna help us out");
});

bot.on("ready", async() => {
    console.log(`We released the Kraken`)
    bot.user.setActivity("type -help for help")
});


bot.on("message", async message => {
    if(message.type === "PINS_ADD") message.delete(1);
    if(message.author.bot) return;
    if(message.channel.type === "dm" && !message.author.bot){
        return message.reply("Sorry I can't read that thats private... but check out my Help pages on https://meshstyles.github.io/unilandiscordbot/");
    };
    let prefix = botconfig.prefix;
    let alexa = botconfig.alexa;
    let join = botconfig.join;
    let leave = botconfig.leave;
    let vote = botconfig.vote;
    let member = message.member;
    var argssingle = message.content.split(" ");
    if(message.content.startsWith(prefix)){
        //prefix commands
        var args = message.content.substring(prefix.length).split(" ");
            //bot uptime calc
        let botuptime = bot.uptime;
        botuptime = botuptime*0.001;
        //uptime
        switch(message.content.toLocaleLowerCase()){
            case `${prefix}help`:
                message.delete(1);
                return message.author.send("If you need help than check out my help pages in English/German over @ Check the Help pages on https://meshstyles.github.io/unilandiscordbot/ ");
            case `${prefix}hilfe`:
                message.delete(1);
                return message.author.send("Wenn du Hilfe brauchst mit dem Bot dann seh dir unsere hilfe Seite unter Check the Help pages on https://meshstyles.github.io/unilandiscordbot/ an")
            case `${prefix}serverinfo`:
                message.delete(1);
                let sicon = message.guild.iconURL;
                let serverembed = new Discord.RichEmbed()
                .setDescription("Server Information")
                .setColor("#ff7357")
                .setThumbnail(sicon)
                .addField("Server Name", message.guild.name)
                .addField("Created on", message.guild.createdAt)
                .addField("You Joined", message.member.joinedAt)
                .addField("Total Memebers", message.guild.memberCount)
                .addField("AFK Timeout Limit", message.guild.afkTimeout)
                .addField("Uptime in sec", botuptime);
                return message.channel.send(serverembed);
            case `${prefix}botinfo`:
                message.delete(1);
                let bicon = bot.user.displayAvatarURL;
                let botembed = new Discord.RichEmbed()
                .setDescription("Bot Information")
                .setColor("#ff7357")
                .setThumbnail(bicon)
                .addField("Bot Name", bot.user.username)
                .addField("Uptime in sec", botuptime);
                return message.channel.send(botembed);
        }
    }
    //alexa meme
    if(message.content.startsWith(alexa)){
        // alexa
        switch(message.content.toLowerCase()) {
            case `${alexa} play despacito`:
                return message.channel.send("ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Despacito ───────────⚪────── ◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙️ ❐ ⊏⊐");
            case `${alexa} play despacito 2`:
                return message.channel.send("ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Despacito 2 (Feat: Lil Pump) ───────────⚪────── ◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙️ ❐ ⊏⊐");
            case `${alexa} this is epic`:
                return message.channel.send("...");
            case `${alexa} this is sad`:
               return message.channel.send("ɴᴏᴡ ᴘʟᴀʏɪɴɢ: DespaSADto ───────────⚪────── ◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙️ ❐ ⊏⊐");
        }
    }
    //vote
    if (message.content.startsWith(vote)){
        var myRole = message.guild.roles.find(role => role.name === "ModStaff");
        if(message.member.roles.has(myRole.id)){
            var voteInMessage = message.content;
            var voteIn = voteInMessage.split(botconfig.votesplit);
            var votemessage = voteIn[1].split(botconfig.votesplit2);
            var voteArgC = votemessage.length;
            var reactCounter = 0;

            //votes Switch
            switch (voteArgC) {

                case 3:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2])
                    .then(function (message) {
                        //please note the lacking support of utf-8 emoji support for these
                        // https://github.com/discordjs/discord.js/issues/2287
                        // another listing solutions https://stackoverflow.com/questions/49225971/discord-js-message-react-fails-when-adding-specific-unicode-emotes
                        message.pin();
                        message.react('1⃣');
                        message.react('2⃣');
                    })
                    return;

                case 4:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2] + "\n" + ":three: " + votemessage[3])
                    .then(function (message) {
                        message.pin();
                        message.react('1⃣');
                        message.react('2⃣');
                        message.react('3⃣');
                    })
                    return;

                case 5:
                    message.delete(1);
                    message.channel.send(":regional_indicator_q: " + votemessage[0] + "\n" + ":one: " + votemessage[1] + "\n" + ":two: " + votemessage[2] + "\n" + ":three: " + votemessage[3] + "\n"  +  ":four: " + votemessage[4])
                    .then(function (message) {
                        message.pin();
                        message.react('1⃣');
                        message.react('2⃣');
                        message.react('3⃣');
                        message.react('4⃣');
                    })
                    /*.catch(function (){
                        return console.catch();
                    });*/
                    return;

                default:
                    return message.channel.send("this is not a valid vote message. Check out the help @ https://meshstyles.github.io/unilandiscordbot/");
            }
        }

    }
    if(message.content == "oh no"){
        message.delete(1);
        return message.channel.send("https://media.discordapp.net/attachments/264416258953314304/485228640049561600/Dl9TnQGXcAAlFHB.png");
    }
    //single word
    switch(argssingle[0].toLocaleLowerCase()){
        //for single word commands
        case "no":
            return message.channel.send(":regional_indicator_n: :regional_indicator_o:  :regional_indicator_u: :exclamation: ");
        case `ping`:
            return message.channel.send("pong");
        case `boi`:
            return message.channel.send(":regional_indicator_b: :regional_indicator_o: :regional_indicator_i: :regional_indicator_i: :regional_indicator_i:");
        case `nibba`:
            return message.channel.send(":regional_indicator_n: :regional_indicator_i: :b: :b: :regional_indicator_a:");
        case `ay`:
            return message.channel.send(":a: :regional_indicator_y: :regional_indicator_y:    :regional_indicator_l: :regional_indicator_m: :regional_indicator_a: :regional_indicator_o:");
        case `yeet`:
            return message.channel.send(":regional_indicator_y: :regional_indicator_e: :regional_indicator_e: :regional_indicator_t: ");
        case `skeet`:
            return message.channel.send(":regional_indicator_s: :regional_indicator_k: :regional_indicator_e: :regional_indicator_e: :regional_indicator_t:");
        case `ban`:
            return message.channel.send(":b: :regional_indicator_a: :regional_indicator_n: ");
        case `oof`:
            return message.channel.send(":o2: :o2: :regional_indicator_f: ");
        case `y`:
            return message.channel.send(":regional_indicator_y:   :regional_indicator_n: :regional_indicator_u: :regional_indicator_t: ");
        case `haltstop`:
            return message.channel.send("https://i.imgur.com/kZRNDzP.gif");
        case `dickbutt`:
            return message.channel.send("https://i.imgur.com/Y7ajT50.gif?noredirect ");
        case `ready`:
            return message.channel.send("https://i.imgur.com/RiECI2K.gif?noredirect");
        case `diva`:
            return message.channel.send("http://www.clearancexl.co.uk/WebRoot/Store3/Shops/es136752/5860/491B/AE98/CEC8/8511/0A0F/111B/C8F3/snickers_bar_ml.jpg");
        case `speech`:
            message.delete(1);
            return message.channel.send("https://i.imgur.com/mn9rY3A.jpg");
        
    }

    //this code is less effecient than two seperate methods but easier to maintain
    if(argssingle[0] === leave || argssingle[0] === join ){
        var args1 = argssingle[1].toLocaleLowerCase();
        if(!message.member.roles.has(message.guild.roles.find("name", `${args1}`))){
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
            if(argssingle[0] === leave){leaver()}
            if(argssingle[0] === join) {joiner()}
        }
    }
    function joiner(){
        var roler = message.guild.roles.find("name", `${args1}`);
        message.reply(` Achievement Get! \" ${args1} \" `);
        return member.addRole(roler).catch(console.error);
    }
    function leaver(){
        var roler = message.guild.roles.find("name", `${args1}`);
        message.reply(`:crab: is gone from  \"${args1}\" :crab: `);
        return member.removeRole(roler).catch(console.error);
    }
    if(message.content.startsWith(leave)){
        var args1 = argssingle[1].toLocaleLowerCase();
       
    }

    //create a function that sends a mod an application

    //determine which chats are joinable like helper or network tester

    //
   
});
bot.login(botconfig.token);