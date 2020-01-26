const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'discordAppToken';

let phase = 1;
let iteration = 0;
let iterationCount = 0;

let signsEnum = {
    TOP : '↑',
    BOTTOM : '↓',
    RIGHT : '→',
	LEFT : '←'
};

let loopInterval;

bot.on('ready', () => {
console.log('Am online.');
});

bot.on('message', msg => {
	if(msg.content === "!start"){
		msg.reply("Sequence activated.");
	}
	else if(msg.content === "!testmsgrelay"){
		msg.reply("Answer1");
		msg.reply("Answer2");
		msg.reply("Answer3");
		msg.reply("Answer4");
		msg.reply("Answer5");
	}else if(msg.content === "!speedrun"){
		loopInterval = setInterval(() => {
			msg.channel.send(iterationCount == 4 ? signsEnum.TOP : '.');
			iterationCount = iterationCount == 4 ? 0 : iterationCount+1;
		}, 3000);
	}else if(msg.content === "!pause"){
		clearInterval(loopInterval);
	}
});

bot.login(token);
