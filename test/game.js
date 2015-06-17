var Board = require('../server/models/board');
var presetDeck = require('./preset-deck');

describe.only('Full game', function () {
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

    // Both players should have a hand of 10 cards
    game.playerOne.deck.hand.should.have.lengthOf(10);
    game.playerTwo.deck.hand.should.have.lengthOf(10);

    // P1 plays Melee unit with a strength of 5
    game.playCard('playerOne', 'zoltan-chivay');
    game.playerOne.deck.hand.should.have.lengthOf(9);
    game.playerOne.deck.discards.should.have.lengthOf(1);
    game.playerOne.deck.discards[0].should.have.property('slug', 'zoltan-chivay');
    game.battlefield.playerOne.rows.Melee.units.should.have.lengthOf(1);
    game.battlefield.playerOne.totalScore.should.equal(5);

    // P2 plays Biting Frost
    game.playCard('playerTwo', 'biting-frost');
    game.battlefield.playerOne.totalScore.should.equal(1);

    // P1 plays Commander's Horn on Melee row
    game.playCard('playerOne', 'commanders-horn', 'Melee');
    game.battlefield.playerOne.totalScore.should.equal(2);

    // P2 plays Clear Weather
    game.playCard('playerTwo', 'clear-weather');
    game.battlefield.playerOne.totalScore.should.equal(10);
  });
});
