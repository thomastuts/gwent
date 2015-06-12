var shuffle = require('lodash/collection/shuffle');
var path = require('path');

var CARDS_IN_HAND = 10;

var FACTION_NAMES = [
  'monster',
  'nilfgaardian-empire',
  'northern-realms',
  'scoiatael'
];

var cardsByFaction = {};

FACTION_NAMES.forEach(function (factionName) {
  cardsByFaction[factionName] = require(path.join('../../data/cards', factionName + '.json'));
});

function Deck(deck) {
  // TODO: implement deck validation
  this.faction = deck.faction;
  this.cards = deck.cards;
  this.hand = [];

  this.shuffleCards();
  this.drawHand();
}

Deck.prototype.shuffleCards = function () {
  this.cards = shuffle(this.cards);
};

Deck.prototype.drawHand = function () {
  for (var i = 0; i < CARDS_IN_HAND; i++) {
    this.hand.push(this.drawRandomCard());
    this.sortHand();
  }
};

Deck.prototype.sortHand = function () {
  this.hand.sort();
};

Deck.prototype.drawRandomCard = function () {
  var drawnCard = this.cards.pop();
  this.shuffleCards();
  return drawnCard;
};

Deck.prototype.drawRandomCard = function () {
  var drawnCard = this.cards.pop();
  this.shuffleCards();
  return drawnCard;
};

module.exports = Deck;
