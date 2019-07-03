const { Client, Util } = require('discord.js');
const {prefix} = require("./config.json");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const opus = require("node-opus");
const gyp = require("node-gyp");
const Discord = require("discord.js");
const pkg = require("./package.json");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

const client = new Client({ disableEveryone: false });
 
const youtube = new YouTube(process.env.YT_API);
 
const queue = new Map();

client.on('warn', console.warn);
 
client.on('error', console.error);
 
client.on('ready', () => console.log(`${client.user.tag} Yo this ready!`));
 
client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
 
client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on("MessageReactionAdd", function(users) {
	if (message.content === "+verify") {
	  users.addRole("510450786958966794)
});

client.on("MessageReactionRemove", function(users) {
	if (message.content === "+verify") {
	  users.removeRole("596004862597136400")
});

client.on("message", (message) => {
  if (message.content.includes("https://discord.gg")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("Anda tidak boleh share link discord!")
  }
  if (message.content.includes("http://discord.gg")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("Anda tidak boleh share link discord!")
  }
});

client.on("guildMemberAdd", (member) => {
  let joinchannel = client.channels.get("510446349943308290")
  joinchannel.send(`Selamat datang **${member}** di Hexagon Discord, patuhi peraturan yang berlaku!`)
});

client.on("guildMemberRemove", (member) => {
  let leavechannel = client.channels.get("510446349943308290")
  leavechannel.send(`Selamat tinggal **${member.user.username}**, jangan lupa mabar!`)
});
 
client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
   
      //function randomStatus() {
    //let status = [`iskuat.zapto.org`, `Ketik +help`, `ISKUAT OFFICIAL`]
    //let rstatus = Math.floor(Math.random() * status.length);
    //client.user.setActivity(status[rstatus], {type: 'STREAMING'});

    //}; setInterval(randomStatus, 15000)
    client.user.setGame("Tidak memutar music!")
  
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(prefix.length)
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.slice(1).join(' ');
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    msg.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    msg.channel.send(sayMessage);
  }

  
    if(command === "kick") {
    if(!msg.member.roles.some(r=>["🔑STAFF"].includes(r.name)) )
      return msg.reply("Tidak ada perizinan");
    
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if(!member)
      return msg.reply("member tidak ditemukan");
    if(!member.kickable) 
      return msg.reply("mangkat dia lebih tinggi tidak bisa dikick");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Tidak ada alasan yg tepat";

    msg.author.send(`Anda sudah dikeluarkan dari Hexagon Discord karena ${reason}`)

    await member.kick(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't kick because of : ${error}`));
    msg.reply(`${member.user.tag} telah dikeluarkan oleh ${msg.author.tag} karena ${reason}`);

    }
  
  if(command === "warn"){
    
  if(!msg.member.roles.some(r=>["🔑STAFF"].includes(r.name)) )
    return msg.reply("Tidak ada perizinan");
  let wUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0])
  if(!wUser) return msg.reply("Member tidak ditemukan");
  let reason = args.slice(1).join(' ');

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  msg.channel.send(`${wUser} telah diwarned oleh ${msg.author} karena: ${reason}, jumlah warns ${warns[wUser.id].warns}`)

  if(warns[wUser.id].warns == 3){
    let muterole = msg.guild.roles.find(`name`, "Muted");
    if(!muterole) return msg.reply("Role Muted tidak ada");

    let mutetime = "3600s";
    await(wUser.addRole(muterole.id));
    msg.channel.send(`<@${wUser.id}> terkena **MUTE** selama ${mutetime}, karena telah mendapatkan 3x warned`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      msg.reply(`<@${wUser.id}> telah bebas dari **MUTE**`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 4){
    let freezerole = msg.guild.roles.find(`name`, "Freeze");
    if(!freezerole) return msg.reply("Role Freeze tidak ada");

    let freezetime = "3600s";
    await(wUser.addRole(freezerole.id));
    msg.channel.send(`<@${wUser.id}> terkena **FREEZE** selama ${freezetime}, karena telah mendapatkan 4x warned`);

    setTimeout(function(){
      wUser.removeRole(freezerole.id)
      msg.reply(`<@${wUser.id}> telah bebas dari **FREEZE**`)
    }, ms(freezetime))
  }

}
  
      if(command === "ban") {
    if(!msg.member.roles.some(r=>["🔑STAFF"].includes(r.name)) )
      return msg.reply("tidak memiliki perizinan");
    
    let member = msg.mentions.members.first();
    if(!member)
      return msg.reply("member tidak ditemukan");
    if(!member.bannable) 
      return msg.reply("Pasngkat dia lebih tinggi tidak bisa dibanned");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't ban because of : ${error}`));
    msg.reply(`${member.user.tag} telah banned ${msg.author.tag} karena: ${reason}`);
  }
     
    if (command === "help") {
    let help = new Discord.RichEmbed()
    .setTitle("HELP")
    .setColor("#e56b00")
    .addField("Music", `PLAY - **Playing music with you**!\nSTOP - **Stoping music for you**!\nPAUSE - **Pause your music**!\nRESUME - **Resume your music**!`)
    .addField("Moderation", `BAN - **Banned users**!\nKICK - **Kick users**\nMUTE - **Mute Users**\nWARN - **Warning users**\nCLEAR - **Clear messages**\nSAY - **Say announcement**`)
    .addField("Fun", `Comming soon!`)
    .setFooter(`${client.user.username}, If a problem occours, contact!`)
    msg.channel.send(help)
    }
  
      if (command === "rank") {
    let rankembed = new Discord.RichEmbed()
    .setDescription(`***DAFTAR RANK***\n**FREE RANK**\n*VOTER* : Voter 10 kali untuk server Hexagon\n*YOUTUBER* : Harus mempunyai 500+ subscriber\n*BESTBUILD* : Bangun rumah paling bagus\n*IRON* : Dengan membayar 10jt Hexagon Money\n*GOLD* : Dengan membayar 30jt Hexagon Money
    ***PREMIUM RANK***\n*DIAMOND* : Membayar 10k Pulsa\n*EMERALD* : Membayar 20k Pulsa\n*BEDROCK* : Membayar 35k Pulsa`)
    .setColor("GREEN")
    .setFooter("Ingin tahu apa saja yang bisa dilakukan dengan rank diatas? ketik +rankpermission")
    msg.channel.send(rankembed)
  }

  if(command == "rankpermission") {
    let embed10 = new Discord.RichEmbed()
    .setDescription(`***PERMISSION***\n*VOTER* : Fly, Kit Voter\n*YOUTUBER* : Fly, Kit Youtuber\n*BESTBUILD* : Gamemode, Fly, Kit BestBuild\n*IRON* : Fly, Kit Iron\n*GOLD* : Fly, Size, Kit Gold\n*DIAMOND* : Fly, Size, Kit Diamond\n*EMERALD* : Fly, Size, Player head, Kit Emerald\n*BEDROCK* : Fly, Size, Player head, Gamemode, Slapper, Teleport`)
    .setColor("GREEN")
    .setFooter("Untuk pembelian rank bisa hubungi RanggaGaming14/MasApip")
    msg.channel.send(embed10)
  }
 
    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var embed = new Discord.RichEmbed()
                                .setTitle("LAGU PILIHAN")
                                .setDescription(`${videos.map(video2 => `**${++index}** \`${video2.title}\` `).join('\n')}`)
                            .setColor("RANDOM")
                                .setFooter("Ketik nomor lagu yang anda pilih!")
 
                                 msg.channel.send(embed).then(msg => {msg.delete(10000)});
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var embed = new Discord.RichEmbed()
                                .setTitle("LAGU PILIHAN!")
                                .setDescription(`${videos.map(video2 => `**${++index}** \`${video2.title}\` `).join('\n')}`)
                                .setColor("RANDOM")
                                .setFooter("Ketik nomor music yang akan anda pilih!")
 
                                 msg.channel.send(embed).then(msg => {msg.delete(10000)});
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('Anda terlalu lama memilih, membatalkan pemilihan');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'stop') {
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        var embed = new Discord.RichEmbed()
                                .setTitle("")
                                .setDescription(`Mengeluarkan bot dari voice channel, music telah dihentikan`)
                                .setColor("GREEN")
                                serverQueue.textChannel.send(embed);
        client.user.setGame("Tidak memutar music!")
        return undefined;
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
                        var embed = new Discord.RichEmbed()
                                .setTitle("MUSIC!")
                                .setDescription(`Menghentikan music, +resume untuk melanjutkan`)
                                .setColor("RANDOM")
                                 msg.channel.send(embed)
           client.user.setGame("Menghentikan music!")
        }
        return msg.channel.send('There is nothing playing.');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
                    var embed = new Discord.RichEmbed()
                                .setTitle("MUSIC!")
                                .setDescription(`Melanjutkan music`)
                            .setColor("RANDOM")
                                 msg.channel.send(embed)
          client.user.setGame(`Melanjutkan music!`)
        }
        return msg.channel.send('There is nothing playing.');
    } else if (command === "skip") {
      	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to stop the music!');
	      if (!serverQueue) return msg.channel.send('There is no song that I could skip!');
	      serverQueue.connection.dispatcher.end();
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        var embed = new Discord.RichEmbed()
                                .setTitle("MUSIC!")
                                .setDescription(`Music: **${song.title}** telah ditambahkan ke daftar`)
                                .setColor("GREEN")
                                serverQueue.textChannel.send(embed);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
            client.user.setGame(`Tidak memutar lagu`)
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
 
                 var embed = new Discord.RichEmbed()
                                .setTitle("LAGU PILIHAN!")
                                .setDescription(`🎵 \`Memutar music:\` **${song.title}**`)
                                .setColor("GREEN")
                                serverQueue.textChannel.send(embed);
  client.user.setGame(`Memutar music: Song${song.title}`)
}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

client.login(process.env.TOKEN);
 
