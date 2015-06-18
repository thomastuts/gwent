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
    if (!this.isWeatherEffectActive(card.slug)) {
      this.activeWeatherEffects.push(card);
    }
    this.updateRowStrengths();
  }

  isWeatherEffectActive(weatherType) {
    return _.find(this.activeWeatherEffects, { slug: weatherType });
  }

  clearWeatherEffects() {
    this.activeWeatherEffects = [];
    this.updateRowStrengths();
  }

  addUnit(player, card) {
    var unit = _.cloneDeep(card);
    unit.actualStrength = unit.strength;
    this[player].rows[card.row].units.push(unit);
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
        let row = this[player].rows[unitType];
        let affectedWeatherType = constants.WEATHER_INFLUENCE[unitType.toUpperCase()];
        let isAffectedByWeather = this.isWeatherEffectActive(affectedWeatherType);
        let amountOfMoraleBoosts = row.units.filter((unit) => {
          return unit.ability === constants.ABILITY_MORALE
        }).length;

        for (let unit of row.units) {
          unit.actualStrength = isAffectedByWeather ? 1 : unit.strength;

          let amountOfTightBondUnits = row.units.filter((unitToFilter) => {
            return unitToFilter.ability === constants.ABILITY_TIGHT_BOND && unitToFilter.slug === unit.slug
          }).length;

          if (amountOfTightBondUnits > 1) {
            unit.actualStrength = unit.actualStrength * amountOfTightBondUnits;
          }

          if (amountOfMoraleBoosts) {
            let strengthToAdd = amountOfMoraleBoosts;

            if (unit.ability === constants.ABILITY_MORALE) {
              strengthToAdd = amountOfMoraleBoosts - 1;
            }

            unit.actualStrength += strengthToAdd;
          }

          if (row.hornBuff) {
            unit.actualStrength = unit.actualStrength * 2;
          }
        }

        var totalRowScore = _.chain(row.units)
          .pluck('actualStrength')
          .reduce(function (total, strength) {
            return total + strength;
          })
          .value();

        row.score = totalRowScore || 0;
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
