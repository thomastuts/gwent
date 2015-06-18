import logger from 'bragi';
import constants from '../constants';
import Player from './player';
import Battlefield from './battlefield';

// TODO: implement auth on socket to avoid other player playing actions for you

class Board {
  constructor(boardId) {
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
        var loser = outcome === constants.PLAYER_ONE ? constants.PLAYER_TWO : constants.PLAYER_ONE;
        this[loser].lives--;
      }

      if (this.playerOne.lives === 0 || this.playerTwo.lives === 0) {
        let isTie = this.playerOne.lives === 0 && this.playerTwo.lives === 0;
        if (isTie) {
          endGame(constants.OUTCOME_TIE);
        }
        else {
          endGame(outcome);
        }
      }
      else {
        this.round++;
        this.resetBoardForNextRound();
      }

      console.log('Score:', this.playerOne.lives, this.playerTwo.lives);
    }
  }

  resetBoardForNextRound() {
    // Reset battlefield
    // Move all cards in playing field to player's discards
  }

  endGame(outcome) {
    if (outcome === constants.OUTCOME_TIE) {

    }
    else {
      console.log('The game has ended, ' + outcome + ' is the winner!');
    }
  }

  determineStartingPlayer() {
    let random = Math.round(Math.random() * 100);
    return random > 50 ? constants.PLAYER_ONE : constants.PLAYER_TWO;
  }
}

export default Board;
