'use strict';

import Deck from './deck';

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

  passTurn() {
    this.passed = true;
  }
}

export default Player;
