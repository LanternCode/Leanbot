const Discord = require('discord.js');
const bot = new Discord.Client();

const token = '';

let signsEnum = {
    TOP : '↑',
    BOTTOM : '↓',
    RIGHT : '→',
	LEFT : '←'
};

let phases = [
        [
            signsEnum.LEFT, signsEnum.TOP, signsEnum.LEFT, signsEnum.RIGHT, signsEnum.TOP
        ],
        [
            signsEnum.LEFT, signsEnum.LEFT, signsEnum.RIGHT, signsEnum.LEFT, signsEnum.RIGHT
        ],
        [
            signsEnum.RIGHT, signsEnum.TOP, signsEnum.RIGHT, signsEnum.TOP, signsEnum.TOP
        ]
];

let phaseNumber = 0;
let phaseIterator = 0;
let iterationCount = 0;

let loopInterval;

bot.on('ready', () => {
console.log('Am online.');
});

bot.on('message', msg => {
	if(msg.content === "!leanbot start"){
        msg.channel.send("Leanbot started!");
		loopInterval = setInterval(() => {
			msg.channel.send(iterationCount == 4 ? phases[phaseNumber][phaseIterator] : '.'); //Send a '.' or an arrow

            phaseIterator = (iterationCount == 4) ? ((phaseIterator == 4) ? 0 : phaseIterator+1) : phaseIterator; //Which part of the phase are we in
			iterationCount = iterationCount == 4 ? 0 : iterationCount+1; //Are we to display a '.' or an arrow next time
		}, 3000);
	}else if(msg.content === "!leanbot pause"){ //remporarily pause the loop
		clearInterval(loopInterval);
        msg.channel.send("Leanbot paused.");
	}else if(msg.content === "!leanbot go"){ //increase phase by one
        if(phaseNumber == 2){
            msg.channel.send("Final sequence reached. Use '!leanbot stop' to reset all values.");
        }else{
            phaseNumber++;
            phaseIterator = 0; //start with a new, clear phase
            iterationCount = 0;
            msg.channel.send("Sequence escalated.");
        }
    }else if(msg.content === "!leanbot stop"){
        clearInterval(loopInterval); //reset the loop
        phaseNumber = 0; //clear all values managed by the loop
        phaseIterator = 0;
        iterationCount = 0;
        msg.channel.send("All values were reset.");
    }else if(msg.content === "!leanbot commands"){
        msg.channel.send("Current list of existing commands:");
        msg.channel.send("> !leanbot start - starts the sequence or resumes it");
        msg.channel.send("> !leanbot pause - pauses the sequence");
        msg.channel.send("> !leanbot stop - resets the sequence and all iterations");
        msg.channel.send("> !leanbot go - escalates the sequence by 1");
        msg.channel.send("> !leanbot commands - prints the list of available commands");
    }
});

bot.login(token);
