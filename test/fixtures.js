var cards = require('../server/data/cards');

module.exports = {
  player: {
    name: 'Geralt'
  },
  cards: {
    ability_rain: cards.getCard('torrential-rain'),
    melee_5: cards.getCard('zoltan-chivay'),
    ranged_3: cards.getCard('puttkammer'),
    siege_3: cards.getCard('rotten-mangonel'),
    siege_1_morale_boost: cards.getCard('kaedweni-siege-expert')
  },
  deck: {
    faction: 'northern-realms',
    leader: 'foltest-lord-commander-of-the-north',
    cards: [
      'zoltan-chivay',
      'biting-frost',
      'ves',
      'siegfried-of-denesle',
      'prince-stennis',
      'blue-stripes-commando',
      'blue-stripes-commando',
      'blue-stripes-commando',

      'dethmold',
      'keira-metz',
      'sile-de-tansarville',
      'crinfrid-reavers-dragon-hunter',
      'crinfrid-reavers-dragon-hunter',
      'sabrina-gevissig',
      'sheldon-skaggs',

      'catapult',
      'trebuchet',
      'trebuchet',
      'ballista',
      'dun-banner-medic',
      'kaedweni-siege-expert',
      'kaedweni-siege-expert',
      'kaedweni-siege-expert',

      'decoy',
      'decoy',
      'commanders-horn',
      'commanders-horn',
      'commanders-horn',
      'impenetrable-fog',
      'impenetrable-fog',
      'torrential-rain',
      'clear-weather'
    ]
  }};
