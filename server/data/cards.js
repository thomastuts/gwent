'use strict';

import _ from 'lodash';
import path from 'path';
import constants from '../constants';

let cardsByFaction = {};
let specialCards = require('../../data/cards/special.json');

constants.FACTIONS.forEach(function (faction) {
  cardsByFaction[faction] = require(path.join('../../data/cards', faction + '.json'));
});

export function getCard(cardSlug) {
  let factionCard;
  let specialCard;

  for (let faction in cardsByFaction) {
    factionCard = _.find(cardsByFaction[faction].cards, {slug: cardSlug});

    if (factionCard) {
      if (factionCard.type === 'Unit') {
        factionCard.strength = parseInt(factionCard.strength);
      }
      return factionCard;
    }
  }

  specialCard = _.find(specialCards.cards, {slug: cardSlug});

  return factionCard || specialCard;
}
