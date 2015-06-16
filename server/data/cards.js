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
  getCard: function (cardSlug, faction) {
    var factionCard = _.find(cardsByFaction[faction].cards, {slug: cardSlug});
    var neutralCard = _.find(cardsByFaction.neutral.cards, {slug: cardSlug});
    var specialCard = _.find(specialCards.cards, {slug: cardSlug});

    return factionCard || neutralCard || specialCard;
  }
};
