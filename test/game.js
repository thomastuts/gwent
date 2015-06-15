require('should');
process.env.NODE_ENV = 'debug';

var Board = require('../server/models/board');
var presetDeck = require('./preset-deck');

describe('Full game', function () {
  it('should follow Gwent rules and mechanics', function () {
    var game = new Board(1);

    game.setPlayerOne({
      name: 'Geralt'
    });

    game.playerOne.setDeck(presetDeck);
    game.playerOne.readyUp();

    game.setPlayerTwo({
      name: 'Innkeeper'
    });

    game.playerTwo.setDeck(presetDeck);
    game.playerTwo.readyUp();

    game.startGame();

    // P1 plays Melee unit with a strength of 5
    game.playCard('playerOne', 'zoltan-chivay');
    game.battlefield.playerOne.rows.Melee.units.should.have.lengthOf(1);
    game.battlefield.playerOne.totalScore.should.equal(5);

    // P2 plays Biting Frost
    game.playCard('playerTwo', 'biting-frost');
    game.battlefield.playerOne.totalScore.should.equal(1);
  });
});
