const Discord = require('discord.js');
const client = new Discord.Client();
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


//------ RUNNING THE AUTHENTICATION AND RUNNING THE BOT ------//
client.on('ready', () => {
   console.log('XYBER IS RUNNING WOOOHOOO');
   console.log(`Logged in as: ${client.user.tag}`);
});

//---------- SPAM COMMAND ----------//
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
         for(var i = 0; i < parseInt(num); i++) {
            msg.channel.send(`${member} whaddup?`);
            if(i === 20) {
               break;
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
