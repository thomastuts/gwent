var _ = require('lodash');

var cards = require('../data/cards');

var isDebug = process.env.NODE_ENV === 'debug';

var CARDS_IN_HAND = 10;

function Deck(deck) {
  // TODO: implement deck validation
  // TODO: add leader
  var self = this;

  this.faction = deck.faction;
  this.leader = deck.leader;
  this.cards = deck.cards.map(function (cardSlug) {
    var card = cards.getCard(cardSlug, self.faction);

    if (card.type === 'Unit') {
      card.strength = parseInt(card.strength);
    }

    return card;
  });

  this.hand = [];
  this.discards = [];

  if (!isDebug) {
    this.shuffleCards();
  }

  this.drawHand();
}

Deck.prototype.shuffleCards = function () {
  this.cards = _.shuffle(this.cards);
};

Deck.prototype.drawHand = function () {
  if (isDebug) {
    this.hand = this.cards.slice(0, CARDS_IN_HAND);
    this.cards = this.cards.slice(CARDS_IN_HAND, this.cards.length);
  }
  else {
    for (var i = 0; i < CARDS_IN_HAND; i++) {
      this.hand.push(this.drawRandomCard());
    }
  }
  this.sortHand();
};

Deck.prototype.findCardInHand = function (cardSlug) {
  return _.find(this.hand, {slug: cardSlug});
};

Deck.prototype.sortHand = function () {
  this.hand.sort();
};

Deck.prototype.discardCard = function (cardSlug) {
  var index = _.findIndex(this.hand, {slug: cardSlug});
  var card = this.hand[index];

  if (index > -1) {
    this.hand.splice(index, 1);
    this.discards.push(card);
  }
};

Deck.prototype.drawRandomCard = function () {
  var drawnCard = this.cards.pop();
  this.shuffleCards();
  return drawnCard;
};

module.exports = Deck;
