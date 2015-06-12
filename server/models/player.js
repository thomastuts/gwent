var Deck = require('./deck');

var STARTING_LIVES = 2;

function Player(options) {
  this.name = options.name || 'Stranger';
  this.lives = STARTING_LIVES;
  this.ready = false;
}

Player.prototype.setDeck = function (deck) {
  this.deck = new Deck(deck);
};

Player.prototype.readyUp = function () {
  this.ready = true;
};

Player.prototype.playCardFromHand = function (card) {

};

module.exports = Player;
