var logger = require('bragi');

var CONSTANTS = require('../constants');
var Player = require('./player');
var Battlefield = require('./battlefield');

// TODO: implement auth on socket to avoid other player playing actions for you

var isDebug = process.env.NODE_ENV === 'debug';

function Board(boardId) {
  this.id = boardId;
  this.turn = isDebug ? 'playerOne' : this.determineStartingPlayer();
  this.inProgress = false;
  this.battlefield = new Battlefield();
}

Board.prototype.setPlayerOne = function (player) {
  this.playerOne = new Player(player);
};

Board.prototype.setPlayerTwo = function (player) {
  this.playerTwo = new Player(player);
};

Board.prototype.startGame = function () {
  if (this.canGameStart()) {
    this.round = 1;
    this.inProgress = true;
    console.log('Game started, starting player:', this.turn);
  }
  else {
    throw new Error('Game cannot start yet');
  }
};

Board.prototype.playCard = function (player, cardSlug, target) {
  if (player === this.turn && !this[player].passed) {
    var card = this[player].deck.findCardInHand(cardSlug);
    logger.log(player, 'is playing a card:', card.type, card.row || '', card.name);

    if (card) {
      if (card.type === 'Unit') {
        this.battlefield.addUnit(player, card);
      }
      if (card.type === 'Special') {
        switch (card.ability) {
          case 'Weather':
            console.log('Adding weather card');
            this.battlefield.addWeatherEffect(card.slug);
            break;
          case 'Horn':
            this.battlefield.addHornBuff(player, target);
            break;
        }
      }
      this[player].deck.discardCard(cardSlug);
      // TODO: if no cards left, auto-pass for player

      var nextPlayer = player === CONSTANTS.PLAYER_ONE ? CONSTANTS.PLAYER_TWO : CONSTANTS.PLAYER_ONE;

      /**
       * Move turn to next player if they have not passed yet.
       */
      if (!this[nextPlayer].passed) {
        this.turn = nextPlayer;
      }
    }
  }
  else {
    throw new Error('Playing out of turn');
  }
};

Board.prototype.canGameStart = function () {
  if (this.playerOne && this.playerTwo) {
    var playerOneReady = this.playerOne.ready && this.playerOne.deck !== undefined;
    var playerTwoReady = this.playerTwo.ready && this.playerTwo.deck !== undefined;
    return playerOneReady && playerTwoReady;
  }

  return false;
};

Board.prototype.determineStartingPlayer = function () {
  var random = Math.round(Math.random() * 100);
  return random > 50 ? 'playerOne' : 'playerTwo';
};

module.exports = Board;
