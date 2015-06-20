var sinon = require('sinon');

var events = require('../../server/events');
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

  describe('Round end', function () {
    it('should emit an event when the round is over', function () {
      var spy = sinon.spy();
      this.board.on(events.ROUND_END, spy);

      this.board.playCard('playerOne', fixtures.cards.melee_5.slug);
      this.board.pass('playerTwo');
      this.board.pass('playerOne');

      spy.called.should.equal(true);
    });

    it('should set the turn to the winner of the round in preparation for the next round', function () {
      this.board.playCard('playerOne', fixtures.cards.melee_5.slug);
      this.board.pass('playerTwo');
      this.board.pass('playerOne');

      this.board.turn.should.equal('playerOne');
    });

    it('should set the turn to the next player in preparation for the next round in case of an outcome', function () {
      this.board.playCard('playerOne', fixtures.cards.siege_1_morale_boost.slug);
      this.board.pass('playerTwo');
      this.board.pass('playerOne');

      this.board.turn.should.equal('playerOne');
    });
  });

  describe('Game end', function () {
    it('should emit an event when the game is over', function () {
      var spy = sinon.spy();
      this.board.on(events.GAME_END, spy);

      this.board.playCard('playerOne', fixtures.cards.melee_5.slug);
      this.board.pass('playerTwo');
      this.board.pass('playerOne');

      this.board.playCard('playerOne', fixtures.cards.melee_4_tight_bond.slug);
      this.board.pass('playerTwo');
      this.board.pass('playerOne');

      spy.called.should.equal(true);
    });
  });
});
