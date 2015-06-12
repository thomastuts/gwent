var Deck = require('./deck');

var STARTING_LIVES = 2;

function Player(options) {
  this.name = options.name || 'Stranger';
  this.lives = STARTING_LIVES;
}

Player.prototype.setDeck = function (deck) {
  this.deck = new Deck(deck);
};

module.exports = Player;
