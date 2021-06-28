const Discord = require('discord.js');
const client = new Discord.Client();
// const fetch = require('node-fetch');
const path = require('path');
const ytdl = require('ytdl-core');
require('dotenv').config();
// import { Intents } from 'discord.js';
// let intents = new Intents(Intents.NON_PRIVILEGED);
// intents.add('GUILD_MEMBERS');

client.login(process.env.BOT_TOKEN);

//------------ VARIABLES ------------//
const PREFIX = '$';
const { roasts, spartaImages } = require('./modules/variables')

// console.log(msg.member); --------> SHOWS DETAILS ABOUT THE MEMBER


//------ RUNNING THE AUTHENTICATION AND RUNNING THE BOT ------//
client.on('ready', () => {
   console.log('XYBER IS RUNNING WOOOHOOO');
   console.log(`Logged in as: ${client.user.tag}`);
});



// ------------------------------------ //
// ----------ONE WORD COMMANDS--------- //
// ------------------------------------ //
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const CMD_NAME = msg.content.substring(1);

      //--------- PING COMMAND ---------//
      if(CMD_NAME === 'ping') {
         msg.reply('pong!')
      }

      if(CMD_NAME === 'help') {         

         const intro_embed = new Discord.MessageEmbed()
            .setImage('https://cdn.discordapp.com/avatars/831521597235265536/404710d5553f1b7b749006c9daf51fbe.png?size=256')
            .setTitle('I see you need some help')         
         
         const help_embed = new Discord.MessageEmbed()
            .setColor(0x5ab43e)
            .setTitle('Here\'s some help\nList Of Commands')            
            .setDescription(
               '1. `$ping` -> Use this command to ping the bot \
               \n2. `$roast <username>` -> Use this command to roast a user \
               \n3. `$spam <username> <number of spams>` -> Use this command to spam a user \
               \n4. `$xyber laugh` -> Use this command to make xyber laugh \
               \n5. `$sparta gali` -> Sparta ka gali sunna hai? \
               \n6. `$sparta sauce` -> Want to see a spicy sparta? ( ͡≖ ͜ʖ ͡≖)\
               \n7. `$rickroll <channel-id>` -> Start rickrolling people in the given channel id \
               \n8. `$dc <username>` -> Disconnect user from the channel you\'re in'
            )
            // .setDescription('')

            msg.channel.send(intro_embed);
            msg.channel.send(help_embed);   
      }
   }
});


client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const CMD_NAME = msg.content.substring(1);
      
      // Spam Method
      if(CMD_NAME === 'show') {
         msg.guild.members.cache.forEach(member => console.log(member.user.username));
         // console.log(x.cache.);
      }      
   }
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
               if(i === 30) {
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


//-------- MENTION + ONE WORD COMMAND --------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, username] = msg.content.trim().substring(PREFIX.length).split(/\s+/);      

      //-------- ROAST COMMAND --------//
      if(CMD_NAME === 'roast') {         
         var user = username.substring(3, username.length - 1);
         const member = msg.guild.members.cache.get(user);
         msg.channel.send(`${member}${roasts[Math.floor(Math.random() * roasts.length)]}`)
      }

      //-------- DISCONNECT COMMAND --------//
      if(CMD_NAME === 'dc') {
         var user = username.substring(3, username.length - 1);
         const member = msg.guild.members.cache.get(user);
         if(member.id !== '290353813989228554') {
            member.voice.kick();
         }
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
         msg.channel.send("Yummy, Here's a spicy Sparta for you (͠≖ ͜ʖ͠≖)👌\n", {
            files: [spartaImages[Math.floor(Math.random() * spartaImages.length)]]
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


//------- RICK ROLL COMMAND -------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, channel_id] = msg.content.trim().substring(PREFIX.length).split(/\s+/);
      const channel = client.channels.cache.get(`${channel_id}`);      

      if(CMD_NAME === 'rickroll') {         
         var connection = await channel.join();
         connection.play(ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=OfficialRickAstley', {
            filter: 'audioonly',
            volume: 1.0
         }));
      }

      // Leave the channel
      if(CMD_NAME === 'leave') {
         channel.leave();
      } 
   }
});


client.on('disconnect', function(event){
   console.log('DC');
})
