var fixtures = require('../fixtures');
var Board = require('../../server/models/board');

describe('Board', function () {

  beforeEach(function () {
    this.board = new Board();

    this.board.setPlayerOne({
      name: 'Geralt'
    });

    this.board.playerOne.setDeck(fixtures.deck);
    this.board.playerOne.readyUp();

    this.board.setPlayerTwo({
      name: 'Innkeeper'
    });

    this.board.playerTwo.setDeck(fixtures.deck);
    this.board.playerTwo.readyUp();

    this.board.startGame();
  });

  describe('Playing cards', function () {
    it('should throw an error if a player tries to play out of turn', function () {
      var board = this.board;

      (function () {
        board.playCard('playerTwo', fixtures.cards.melee_5.slug);
      }).should.throw('Playing out of turn');
    });

    it('should throw an error if a player tries to play a card that is not in their hand', function () {
      var board = this.board;

      this.board.playCard('playerOne', fixtures.cards.melee_5.slug);
      this.board.playCard('playerTwo', fixtures.cards.melee_5.slug);

      (function () {
        board.playCard('playerOne', fixtures.cards.melee_5.slug);
      }).should.throw('Player does not have this card');
    });
  });
});
