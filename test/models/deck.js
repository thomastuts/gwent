var fixtures = require('../fixtures');
var Deck = require('../../server/models/deck');

describe('Deck creation', function () {
  beforeEach(function () {
    this.deck = new Deck(fixtures.deck);
  });

  it('should store the deck faction', function () {
    this.deck.should.have.property('faction', fixtures.deck.faction);
  });

  it('should add the given cards to the deck', function () {
    this.deck.cards.should.not.be.empty;
  });

  it('should draw a hand from the deck', function () {
    this.deck.hand.length.should.equal(10);
    this.deck.cards.length.should.not.equal(fixtures.deck.cards.length);
  });
});
