var Deck = require('./deck');

var STARTING_LIVES = 2;

function Player(options) {
  this.name = options.name || 'Stranger';
  this.deck = new Deck(options.deck);
  this.lives = STARTING_LIVES;
}

module.exports = Player;
