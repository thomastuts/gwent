var Deck = require('./deck');

const STARTING_LIVES = 2;

class Player {
  constructor(options) {
    this.name = options.name || 'Stranger';
    this.lives = STARTING_LIVES;
    this.ready = false;
    this.passed = false;
  }

  setDeck(deck) {
    this.deck = new Deck(deck);
  }

  readyUp() {
    this.ready = true;
  }
}

module.exports = Player;
