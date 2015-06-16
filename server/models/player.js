var Deck = require('./deck');

var STARTING_LIVES = 2;

function Player(options) {
  this.name = options.name || 'Stranger';
  this.lives = STARTING_LIVES;
  this.ready = false;
  this.passed = false;
}

Player.prototype.setDeck = function (deck) {
  this.deck = new Deck(deck);
};

Player.prototype.readyUp = function () {
  this.ready = true;
};

module.exports = Player;
