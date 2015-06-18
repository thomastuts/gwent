const DEBUG = process.env.NODE_ENV === 'debug';

const PLAYER_ONE = 'playerOne';
const PLAYER_TWO = 'playerTwo';

const FACTION_MONSTER = 'monster';
const FACTION_NILFGAARD = 'nilfgaardian-empire';
const FACTION_NORTH = 'northern-realms';
const FACTION_ELVES = 'scoiatael';
const FACTION_NEUTRAL = 'neutral';

const MELEE = 'Melee';
const RANGED = 'Ranged';
const SIEGE = 'Siege';

const ABILITY_MORALE = 'Morale Boost';
const ABILITY_TIGHT_BOND = 'Tight Bond';
const ABILITY_HORN = 'Horn';
const ABILITY_WEATHER = 'Weather';

const CARD_TYPE_UNIT = 'Unit';
const CARD_TYPE_SPECIAL = 'Special';

const FROST = 'biting-frost';
const FOG = 'impenetrable-fog';
const RAIN = 'torrential-rain';

export default {
  DEBUG,

  PLAYER_ONE,
  PLAYER_TWO,

  FACTIONS: [
    FACTION_MONSTER,
    FACTION_NILFGAARD,
    FACTION_NORTH,
    FACTION_ELVES,
    FACTION_NEUTRAL
  ],

  MELEE,
  RANGED,
  SIEGE,

  FROST,
  FOG,
  RAIN,

  WEATHER_INFLUENCE: {
    MELEE: FROST,
    RANGED: FOG,
    SIEGE: RAIN
  },

  ABILITY_MORALE,
  ABILITY_TIGHT_BOND,
  ABILITY_HORN,
  ABILITY_WEATHER,

  CARD_TYPE_UNIT,
  CARD_TYPE_SPECIAL
};
