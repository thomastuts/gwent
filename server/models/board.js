var logger = require('bragi');

const IS_DEBUG = process.env.NODE_ENV === 'debug';
const constants = require('../constants');
var Player = require('./player');
var Battlefield = require('./battlefield');

// TODO: implement auth on socket to avoid other player playing actions for you

class Board {
  constructor(boardId) {
    this.id = boardId;
    this.turn = IS_DEBUG ? constants.PLAYER_ONE : this.determineStartingPlayer();
    this.inProgress = false;
    this.battlefield = new Battlefield();
  }

  setPlayerOne(player) {
    this.playerOne = new Player(player);
  }

  setPlayerTwo(player) {
    this.playerTwo = new Player(player);
  }

  startGame() {
    if (this.canGameStart()) {
      this.round = 1;
      this.inProgress = true;
      console.log('Game started, starting player:', this.turn);
    }
    else {
      throw new Error('Game cannot start yet');
    }
  }

  playCard(player, cardSlug, target) {
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
              if (card.slug === 'clear-weather') {
                this.battlefield.clearWeatherEffects();
              }
              else {
                this.battlefield.addWeatherEffect(card.slug);
              }
              break;
            case 'Horn':
              this.battlefield.addHornBuff(player, target);
              break;
          }
        }

        this[player].deck.discardCard(cardSlug);

        var nextPlayer = player === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;

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
  }

  canGameStart() {
    if (this.playerOne && this.playerTwo) {
      var playerOneReady = this.playerOne.ready && this.playerOne.deck !== undefined;
      var playerTwoReady = this.playerTwo.ready && this.playerTwo.deck !== undefined;
      return playerOneReady && playerTwoReady;
    }

    return false;
  }

  determineStartingPlayer() {
    var random = Math.round(Math.random() * 100);
    return random > 50 ? 'playerOne' : 'playerTwo';
  }
}

module.exports = Board;
