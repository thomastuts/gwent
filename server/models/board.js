'use strict';

import logger from 'bragi';
import EventEmitter from 'events';

import constants from '../constants';
import events from '../events';
import Player from './player';
import Battlefield from './battlefield';

class Board extends EventEmitter {
  constructor(boardId) {
    super();

    this.id = boardId;
    this.round = 1;
    this.turn = constants.DEBUG ? constants.PLAYER_ONE : this.determineStartingPlayer();
    this.inProgress = false;
    this.battlefield = new Battlefield();
  }

  setPlayerOne(player) {
    this.playerOne = new Player(player);
  }

  setPlayerTwo(player) {
    this.playerTwo = new Player(player);
  }

  pass(player) {
    if (this.turn === player) {
      this[player].passTurn();

      let nextPlayer = player === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;

      /**
       * Move turn to next player if they have not passed yet. Otherwise, end the round.
       */
      if (!this[nextPlayer].passed) {
        this.turn = nextPlayer;
      }
      else {
        this.endRound();
      }
    }
    else {
      throw new Error('Playing out of turn');
    }
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
      let card = this[player].deck.findCardInHand(cardSlug);

      if (!card) {
        throw new Error('Player does not have this card');
      }
      else {
        logger.log(player, 'is playing a card:', card.type, card.row || '', card.name);

        if (card.type === constants.CARD_TYPE_UNIT) {
          this.battlefield.addUnit(player, card);
        }
        if (card.type === constants.CARD_TYPE_SPECIAL) {
          switch (card.ability) {
            case constants.ABILITY_WEATHER:
              if (card.slug === 'clear-weather') {
                this.battlefield.clearWeatherEffects();
              }
              else {
                this.battlefield.addWeatherEffect(card);
              }
              break;
            case constants.ABILITY_HORN:
              this.battlefield.addHornBuff(player, target);
              break;
          }
        }

        this[player].deck.discardCard(cardSlug);

        let nextPlayer = player === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;

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
      let playerOneReady = this.playerOne.ready && this.playerOne.deck !== undefined;
      let playerTwoReady = this.playerTwo.ready && this.playerTwo.deck !== undefined;
      return playerOneReady && playerTwoReady;
    }

    return false;
  }

  endRound() {
    if (this.playerOne.passed && this.playerTwo.passed) {
      let outcome = this.battlefield.getWinner();

      if (outcome === constants.OUTCOME_TIE && this.round === 2) {
        this.endGameInTie();
      }
      else if (outcome === constants.OUTCOME_TIE) {
        this.playerOne.lives--;
        this.playerTwo.lives--;
      }
      else {
        let loser = outcome === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;
        this[loser].lives--;
      }

      if (this.playerOne.lives === 0 || this.playerTwo.lives === 0) {
        let isTie = this.playerOne.lives === 0 && this.playerTwo.lives === 0;
        if (isTie) {
          this.endGame(constants.OUTCOME_TIE);
        }
        else {
          this.endGame(outcome);
        }
      }
      else {
        let nextTurn;

        if (outcome === constants.OUTCOME_TIE) {
          nextTurn = this.turn === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;
        }
        else {
          nextTurn = outcome;
        }

        this.turn = nextTurn;
        this.playerOne.passed = false;
        this.playerTwo.passed = false;
        this.round++;
        this.resetBoardForNextRound();
        this.emit(events.ROUND_END);
      }

      console.log('Score:', this.playerOne.lives, this.playerTwo.lives);
    }
  }

  endGame(outcome) {
    this.emit(events.GAME_END, outcome);
  }

  resetBoardForNextRound() {
    // Reset battlefield
    // Move all cards in playing field to player's discards
  }

  determineStartingPlayer() {
    let random = Math.round(Math.random() * 100);
    return random > 50 ? constants.PLAYER_ONE : constants.PLAYER_TWO;
  }
}

export default Board;
