const { GatewayIntentBits, Client, Partials, Collection } = require('discord.js')
const db = require('croxydb')
const config = require('./config')
const { CommandHandler } = require('djs-commander')
const path = require('path')
const prefix = config.prefix
const token = config.token
const color = require('colors')
const fs = require('fs')
db.setReadable(true)
db.setLanguage('tr')
const client = new Client({
    intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
      ],
      presence: {
        activities: [{
            name: "BOMBOS ALTYAPI FEYD YAPTI",
            type: 0
        }],
        status: 'online'
      }
})

new CommandHandler({
  client, 
  commandsPath: path.join(__dirname, 'slashCommands'), 
  eventsPath: path.join(__dirname, 'events')
});

const slashCommands = fs.readdirSync("./slashCommands").filter(file => file.endsWith('.js'))
for(file of slashCommands) {
    const commandName = file.split(".")[0]
    console.log(`${commandName} komutu aktif edildi.`.brightGreen)
}

client.commands = new Collection()

const commands = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))
for(file of commands) {
    const commandName = file.split(".")[0]
    const command = require(`./commands/${commandName}`)
    console.log(`${commandName} komutu aktif edildi.`.brightGreen)
    client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if(!command) return;
        command.run(client, message, args)
    }
})



client.login(token)
