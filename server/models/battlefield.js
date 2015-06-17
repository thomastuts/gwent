import _ from 'lodash';
import constants from '../constants';

const PLAYERS = [constants.PLAYER_ONE, constants.PLAYER_TWO];
const UNIT_TYPES = [constants.MELEE, constants.RANGED, constants.SIEGE];

var initialBattlefieldState = {
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

  updateRowStrengths() {
    PLAYERS.forEach((player) => {
      UNIT_TYPES.forEach((unitType) => {
        var affectedWeatherType = constants[unitType.toUpperCase() + '_AFFECTED_WEATHER'];
        var isAffectedByWeather = this.isWeatherEffectActive(affectedWeatherType);
        var row = this[player].rows[unitType];

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

        // TODO: add morale boost calculation

        // TODO: add tight bond calculation

        if (row.hornBuff) {
          row.score = row.score * 2;
        }
      });
    });

    this.updateTotalScores();
  }

  updateTotalScores() {
    PLAYERS.forEach((player) => {
      var totalScore = 0;

      for (var unitType in this[player].rows) {
        totalScore += this[player].rows[unitType].score;
      }

      this[player].totalScore = totalScore;
    });
  }
}

module.exports = Battlefield;
