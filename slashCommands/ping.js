const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping kodu'),
    run: ({ interaction }) => {
        interaction.reply('pong')
    }
}