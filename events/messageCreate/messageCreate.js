const db = require('croxydb')

function randomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

module.exports = async (message, client, handler) => {
    if(!message.inGuild() || message.author.bot) return

        var random = randomXp(5,15)
        db.add(`${message.author.id}_xp`, random)
        message.channel.send(`${random}`)

};