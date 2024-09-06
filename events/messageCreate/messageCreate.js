const db = require('croxydb')

function randomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

module.exports = async (message, client, handler) => {
    //LEVEL SISTEMI
    if(!message.inGuild() || message.author.bot) return
        db.add(`${message.author.id}_xp`, randomXp(5,15))

};
