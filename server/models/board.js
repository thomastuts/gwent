var Player = require('./player');
var Battlefield = require('./battlefield');

function Board(boardId) {
  this.id = boardId;
  this.battlefield = new Battlefield();
}

Board.prototype.determineStartingPlayer = function () {
  var random = Math.round(Math.random() * 100);
  return random > 50 ? 'playerOne' : 'playerTwo';
};

module.exports = Board;
