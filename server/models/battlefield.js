import _ from 'lodash';
import constants from '../constants';

const PLAYERS = [constants.PLAYER_ONE, constants.PLAYER_TWO];
const UNIT_TYPES = [constants.MELEE, constants.RANGED, constants.SIEGE];

let initialBattlefieldState = {
  totalScore: 0,
  rows: {}
};

UNIT_TYPES.forEach(function (unitType) {
  initialBattlefieldState.rows[unitType] = {
    score: 0,
    hornBuff: false,
    units: []
  };
});

class Battlefield {
  constructor() {
    this.activeWeatherEffects = [];

    this[constants.PLAYER_ONE] = _.cloneDeep(initialBattlefieldState);
    this[constants.PLAYER_TWO] = _.cloneDeep(initialBattlefieldState);
  }

  addWeatherEffect(card) {
    if (!_.contains(this.activeWeatherEffects, card)) {
      this.activeWeatherEffects.push(card);
    }
    this.updateRowStrengths();
  }

  isWeatherEffectActive(weatherType) {
    return this.activeWeatherEffects.indexOf(weatherType) > -1;
  }

  clearWeatherEffects() {
    this.activeWeatherEffects = [];
    this.updateRowStrengths();
  }

  addUnit(player, card) {
    this[player].rows[card.row].units.push(card);
    this.updateRowStrengths();
  }

  addHornBuff(player, row) {
    this[player].rows[row].hornBuff = true;
    this.updateRowStrengths();
  }

  /**
   * TODO: refactor this so it loops every unit and adds `actualStrength` prop which it then sums up to get total score.
   *
   * Things that modify a unit's `actualStrength`:
   *    - Morale boost ability
   *    - Tight bond ability
   *    - Commander's horn ability
   *    - Active weather effect
   */
  updateRowStrengths() {
    PLAYERS.forEach((player) => {
      UNIT_TYPES.forEach((unitType) => {
        let affectedWeatherType = constants.WEATHER_INFLUENCE[unitType.toUpperCase()];
        let isAffectedByWeather = this.isWeatherEffectActive(affectedWeatherType);
        let row = this[player].rows[unitType];

        if (isAffectedByWeather) {
          row.score = row.units.length;
        }
        else {
          if (row.units.length > 0) {
            row.score = _.chain(row.units)
              .pluck('strength')
              .reduce(function (total, strength) {
                return total + strength;
              })
              .value();
          }
        }

        if (row.hornBuff) {
          row.score = row.score * 2;
        }
      });
    });

    this.updateTotalScores();
  }

  updateTotalScores() {
    PLAYERS.forEach((player) => {
      let totalScore = 0;

      for (let unitType in this[player].rows) {
        totalScore += this[player].rows[unitType].score;
      }

      this[player].totalScore = totalScore;
    });
  }
}

export default Battlefield;
