const Discord = require('discord.js');
const client = new Discord.Client();
// const fetch = require('node-fetch');
const path = require('path');
const { isNumber } = require('util');
const ytdl = require('ytdl-core');
require('dotenv').config();

client.login(process.env.BOT_TOKEN)

//------------ VARIABLES ------------//
const PREFIX = '$';
const roasts = [
   " is as useless as the 'ueue' in the 'queue'",
   ", mirrors can't talk. Lucky for you, they can't laugh either",
   " is the reason the gene pool needs a lifeguard.",
   ", if I had a face like yours, I'd sue my parents",
   "'s only chance of getting laid is to crawl up a chicken's butt and wait.",
   ", some day you'll go far... and I hope you stay there.",
   " the Kyalané has visited us again",
   " must have been born on a highway cos' that's where most accidents happen.",
   ", if laughter is the best medicine, your face must be curing the world.",
   " is your ass jealous of the amount of shit that just came out of your mouth?",
   " I'd agree with you but then we'd both be wrong.",
   ", if I had a dollar for everytime you said something smart, I'd be broke.",
   ", when you were born, the doctor threw you out the window, but the window threw you back",   
]

// console.log(msg.member); --------> SHOWS DETAILS ABOUT THE MEMBER


//------ RUNNING THE AUTHENTICATION AND RUNNING THE BOT ------//
client.on('ready', () => {
   console.log('XYBER IS RUNNING WOOOHOOO');
   console.log(`Logged in as: ${client.user.tag}`);
});

//---------- SPAM COMMAND ----------//
client.on('message', async msg => {      
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, username, ...args] = 
         msg.content.trim().substring(PREFIX.length).split(/\s+/);
      
      // Spam Method
      if(CMD_NAME === 'spam') {                  
         var user = username.substring(3, username.length - 1);
         const member = msg.guild.members.cache.get(user);            
         
         //-------- IF ARGUEMENTS LENGTH IS 1 --------//
         if(args.length === 1) {
            for(var i = 0; i < parseInt(args[0]); i++) {
               msg.channel.send(`${member}`);
               if(i === 20) {
                  break;
               }
            }
         }
         //-------- IF ARGUEMENTS LENGTH > 1 --------//
          else {
            var text = '';
            for(var i = 0; i < args.length; i++) {
               text += args[i] + ' ';
            }

            for(var i = 0; i < 5; i++) {
               msg.channel.send(`${member} ${text}`);               
            }
         }
      }      
   }
});


//--------- PING COMMAND ---------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const CMD_NAME = msg.content.substring(1);

      if(CMD_NAME === 'ping') {
         msg.reply('pong!')
      }      
   }
});


//-------- ROAST COMMAND --------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, username] = msg.content.trim().substring(PREFIX.length).split(/\s+/);

      if(CMD_NAME === 'roast') {
         var user = username.substring(3, username.length - 1);
         const member = msg.guild.members.cache.get(user);

         msg.channel.send(`${member}${roasts[Math.floor(Math.random() * roasts.length)]}`)
      }
   }
});


//------- XYBER COMMAND -------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, xyber_command] = msg.content.trim().substring(PREFIX.length).split(/\s+/);

      if(CMD_NAME === 'xyber' && xyber_command === 'laugh') {  
         const { voice } = msg.member;
         
         if(!voice.channelID) {
            msg.reply('Please join a voice channel first');
         }
         
         var connection = await msg.member.voice.channel.join();
         connection.play(path.join(__dirname, 'assets/laugh.mp3'), {
            volume: 2.0
         });

         setTimeout(() => {
            msg.member.voice.channel.leave();
         }, 5000);
      }
   }
});


//------- SPARTA COMMAND -------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, sparta_command] = msg.content.trim().substring(PREFIX.length).split(/\s+/);

      // 1
      if(CMD_NAME === 'sparta' && sparta_command === 'sauce') {
         msg.channel.send("Yummy, Here's a spicy Sparta for you ( ͡≖ ͜ʖ ͡≖)\n", {
            files: ['https://scontent.fccu10-1.fna.fbcdn.net/v/t31.18172-8/1496023_455803201208595_2068773226_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=dn9woPaug4QAX90t-yt&_nc_oc=AQmnjUBiB1UfgaRO5D0NFfXaxbv4EmfikAAaPIAQLtXS49vWgo5m-m7Y9W6zLSzG6rc&_nc_ht=scontent.fccu10-1.fna&oh=1eb70e521307df0c8aae988c464ac447&oe=60A205AA']
         });
      }

      // 2
      if(CMD_NAME === 'sparta' && sparta_command === 'gali') {  
         const { voice } = msg.member;
         
         if(!voice.channelID) {
            msg.reply('Please join a voice channel first');
         }
         
         var connection = await msg.member.voice.channel.join();
         connection.play(path.join(__dirname, 'assets/sparta_gali.mp3'), {
            volume: 1.3
         });

         setTimeout(() => {
            msg.member.voice.channel.leave();
         }, 6000);
      }
   }
});