'use strict';

var _ = require('lodash');
var path = require('path');

var constants = require('../constants');

var cardsByFaction = {};
var specialCards = require('../../data/cards/special.json');

constants.FACTIONS.forEach(function (faction) {
  cardsByFaction[faction] = require(path.join('../../data/cards', faction + '.json'));
});

module.exports = {
  getCard: function (cardSlug) {
    var factionCard;
    var specialCard;

    for (var faction in cardsByFaction) {
      factionCard = _.find(cardsByFaction[faction].cards, {slug: cardSlug});

      if (factionCard) {
        return factionCard;
      }
    }

    specialCard = _.find(specialCards.cards, {slug: cardSlug});

    return factionCard || specialCard;
  }
};
