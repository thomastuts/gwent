var PLAYER_ONE = 'playerOne';
var PLAYER_TWO = 'playerTwo';

var FACTION_MONSTER = 'monster';
var FACTION_NILFGAARD = 'nilfgaardian-empire';
var FACTION_NORTH = 'northern-realms';
var FACTION_ELVES = 'scoiatael';
var FACTION_NEUTRAL = 'neutral';

var MELEE = 'Melee';
var RANGED = 'Ranged';
var SIEGE = 'Siege';

var FROST = 'biting-frost';
var FOG = 'impenetrable-fog';
var RAIN = 'torrential-rain';

module.exports = {
  PLAYER_ONE: PLAYER_ONE,
  PLAYER_TWO: PLAYER_TWO,

  FACTIONS: [
    FACTION_MONSTER,
    FACTION_NILFGAARD,
    FACTION_NORTH,
    FACTION_ELVES,
    FACTION_NEUTRAL
  ],

  MELEE: MELEE,
  RANGED: RANGED,
  SIEGE: SIEGE,

  FROST: FROST,
  FOG: FOG,
  RAIN: RAIN,

  MELEE_AFFECTED_WEATHER: FROST,
  RANGED_AFFECTED_WEATHER: FOG,
  SIEGE_AFFECTED_WEATHER: RAIN
};
