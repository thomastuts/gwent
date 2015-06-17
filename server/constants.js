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

  MELEE_AFFECTED_WEATHER: FROST,
  RANGED_AFFECTED_WEATHER: FOG,
  SIEGE_AFFECTED_WEATHER: RAIN
};
