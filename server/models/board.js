var Player = require('./player');

function Board(boardId) {
  this.id = boardId;
  this.activeWeatherEffects = [];
}

Board.prototype.determineStartingPlayer = function () {
  var random = Math.round(Math.random() * 100);
  return random > 50 ? 'playerOne' : 'playerTwo';
};

module.exports = Board;
