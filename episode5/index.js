const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const fs = require("fs");
const config = require("./config.json");

client.login(config.token);
client.config = config;

fs.readdir("./events", (err, files) => {
    if (err) return console.log(err);
    files.forEach(files => {
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands", (err, files) => {
    if (err) return console.log(err);
    files.forEach(files => {
        const props = require(`./commands/${file}`);
        const commandsName = file.split(".")[0];
        client.commands.set(commandsName, props)
    });
});
