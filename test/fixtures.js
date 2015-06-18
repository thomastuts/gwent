var cards = require('../server/data/cards');
var presetDeck = require('./preset-deck');
var constants = require('../server/constants');

module.exports = {
  player: {
    name: 'Geralt'
  },
  cards: {
    melee_5: cards.getCard('zoltan-chivay'),
    melee_4_tight_bond: cards.getCard('blue-stripes-commando'),
    ranged_3: cards.getCard('puttkammer'),
    siege_3: cards.getCard('rotten-mangonel'),
    siege_1_morale_boost: cards.getCard('kaedweni-siege-expert'),
    weather_frost: cards.getCard(constants.FROST),
    weather_fog: cards.getCard(constants.FOG),
    weather_rain: cards.getCard(constants.RAIN)
  },
  deck: presetDeck
};
