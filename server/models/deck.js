var _ = require('lodash');
var path = require('path');

var isDebug = process.env.NODE_ENV === 'debug';

var CARDS_IN_HAND = 10;
var FACTION_NAMES = [
  'monster',
  'nilfgaardian-empire',
  'northern-realms',
  'scoiatael',
  'neutral',
  'special'
];

var decksByFaction = {};

FACTION_NAMES.forEach(function (factionName) {
  decksByFaction[factionName] = require(path.join('../../data/cards', factionName + '.json'));
});

function getCard(cardName, faction) {
  var factionCard = _.find(decksByFaction[faction].cards, {slug: cardName});
  var neutralCard = _.find(decksByFaction.neutral.cards, {slug: cardName});
  var specialCard = _.find(decksByFaction.special.cards, {slug: cardName});

  return factionCard || neutralCard || specialCard;
}

function Deck(deck) {
  // TODO: implement deck validation
  // TODO: add leader
  var self = this;

  this.faction = deck.faction;
  this.leader = deck.leader;
  this.cards = deck.cards.map(function (cardSlug) {
    var card = getCard(cardSlug, self.faction);

    if (card.type === 'Unit') {
      card.strength = parseInt(card.strength);
    }

    return card;
  });

  this.hand = [];

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
