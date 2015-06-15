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

Board.prototype.playCard = function (player, cardSlug) {
  if (player === this.turn) {
    var card = this[player].deck.findCardInHand(cardSlug);

    if (card) {
      switch (card.type) {
        case 'Unit':
          this.battlefield.addUnit(player, card);
          break;
        case 'Weather':
          this.battlefield.addWeatherEffect(player, card.slug);
          break;
        case 'Decoy':

          break;
        case 'Scorch':

          break;
        case 'Horn':

          break;
      }

      // TODO: discard card from player hand
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
