const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
    member.guild.channels.find("name", "hello-new-members").send(member.toString() + " welcome please join the meety feature with !f2 join if you need help dm a mod or type !help");
});

bot.on("ready", async() => {
    console.log(`We released the Kraken`)
    bot.user.setActivity("type -help for help")
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm" && !message.author.bot){
        return message.reply("Check the Help pages on https://meshstyles.github.io/unilandiscordbot/");
    };
    let prefix = botconfig.prefix;
    let alexa = "alexa";
    let join = "join ";
    let leave = "leave ";
    let member = message.member;
    var argssingle = message.content.split(" ");
    if(message.content.startsWith(prefix)){
        //prefix commands
        var args = message.content.substring(prefix.length).split(" ");
            //bot uptime calc
        let botuptime = bot.uptime;
        botuptime = botuptime*0.001;
        switch(message.content.toLocaleLowerCase()){
            case `${prefix}help`:
                message.delete(1);
                return message.author.send(" -botinfo = to get info to bot, -serverinfo = to get info to server, ping = to get a pong; and _more_ cool things");
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
    if(message.content == "oh no"){
        message.delete(1);
        return message.channel.send("https://media.discordapp.net/attachments/264416258953314304/485228640049561600/Dl9TnQGXcAAlFHB.png");
    }
    switch(argssingle[0].toLocaleLowerCase()){
        //for single word commands
        case "no":
            return message.channel.send("*no u !*");
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
        case `reggie`:
            return message.channel.send("https://files.gamebanana.com/img/ico/sprays/555c87e7008ad.png ");
        case `ready`:
            return message.channel.send("https://i.imgur.com/RiECI2K.gif?noredirect");
        case `diva`:
            return message.channel.send("http://www.clearancexl.co.uk/WebRoot/Store3/Shops/es136752/5860/491B/AE98/CEC8/8511/0A0F/111B/C8F3/snickers_bar_ml.jpg");
        case `speech`:
            message.delete(1);
            return message.channel.send("https://i.imgur.com/mn9rY3A.jpg");
        
    }
    function joiner(){
        var roler = message.guild.roles.find("name", `${args1}`);
        message.reply(` just joined ${args1}`);
        return member.addRole(roler).catch(console.error);
    }
    if(message.content.startsWith(join)){
        var args1 = argssingle[1].toLocaleLowerCase();
        if(!message.member.roles.has(message.guild.roles.find("name", `${args1}`))){
            //TODO use the Meety code here bc
        }
    }
    function leaver(){
        var roler = message.guild.roles.find("name", `${args1}`);
        message.reply(`isn't available for ${args1}`);
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