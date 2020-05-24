import { Client } from 'discord.js';
import logger from 'winston';
import { config } from 'dotenv';

config();

const TOKEN = process.env.TOKEN;


logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console);
logger.level = 'debug';

logger.info(TOKEN);
var bot = new Client();
bot.login(TOKEN);

logger.info(bot);

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user?.username + ' - (' + bot.user?.id + ')');
});

bot.on('message', (data) => {
    if(data.author.id !== bot.user?.id){
        var message = data.content;
        if(message.substring(0,1) == '!') {
            var args = message.substring(1).split(' ');
            var cmd =  args[0];

            args = args.splice(1);
            switch(cmd){
                case '': 
                    data.reply("Precisa de ajuda?");
                    break;
                case 'intro': 
                    data.channel.send('Greetings! Welcome to the server!');
                    break;
            }
        }

    }
});
