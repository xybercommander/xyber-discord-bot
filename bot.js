// const config = require('./config.json')
// console.log(config.token);   

const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.BOT_TOKEN)
const PREFIX = '$';

//------ RUNNING THE AUTHENTICATION AND RUNNING THE BOT ------//
client.on('ready', () => {
   console.log('XYBER IS RUNNING WOOOHOOO');
   console.log(`Logged in as: ${client.user.tag}`);
});

client.on('message', async msg => {      
   if(msg.content.startsWith(PREFIX)) {
      const [CMD_NAME, username, num] = 
         msg.content.trim().substring(PREFIX.length).split(/\s+/);
      
      // Spam Method
      if(CMD_NAME === 'spam') {         
         // if(username.length === 0 || num.length === 0) 
         //    return msg.reply('Please provide an id and a number like: $spam <username> <number>');
         var user = username.substring(3, username.length - 1);
         const member = msg.guild.members.cache.get(user);   
         // console.log(msg.content);
         // msg.channel.send(`${member}`);      
         const number = parseInt(num)
         for(var i = 0; i < number; i++) {
            msg.channel.send(`${member} whaddup?`);
            if(i === 20) {
               break;
            }
         }
      }      
   }
});

//--------- COMMAND ONLY MESSAGES ---------//
client.on('message', async msg => {
   if(msg.content.startsWith(PREFIX)) {
      const CMD_NAME = msg.content.substring(1);

      if(CMD_NAME === 'ping') {
         msg.reply('pong!')
      }      
   }
});
