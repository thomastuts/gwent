var Player = require('./player');
var Battlefield = require('./battlefield');

function Board(boardId, debug) {
  this.id = boardId;
  this.startingPlayer = debug ? 'playerOne' : this.determineStartingPlayer();
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
    console.log('Game started, starting player:', this.startingPlayer);
  }
  else {
    throw new Error('Game cannot start yet');
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
