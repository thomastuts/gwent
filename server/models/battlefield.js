var _ = require('lodash');

var CONSTANTS = require('../constants');

var initialBattlefieldState = {
  totalScore: 0,
  rows: {}
};

var PLAYERS = [CONSTANTS.PLAYER_ONE, CONSTANTS.PLAYER_TWO];
var UNIT_TYPES = [CONSTANTS.MELEE, CONSTANTS.RANGED, CONSTANTS.SIEGE];

UNIT_TYPES.forEach(function (unitType) {
  initialBattlefieldState.rows[unitType] = {
    score: 0,
    hornBuff: false,
    units: []
  };
});

function Battlefield() {
  this.activeWeatherEffects = [];

  this[CONSTANTS.PLAYER_ONE] = _.cloneDeep(initialBattlefieldState);
  this[CONSTANTS.PLAYER_TWO] = _.cloneDeep(initialBattlefieldState);
}

Battlefield.prototype.addWeatherEffect = function (card) {
  if (!_.contains(this.activeWeatherEffects, card)) {
    this.activeWeatherEffects.push(card);
  }
  this.updateRowStrengths();
};

Battlefield.prototype.isWeatherEffectActive = function (weatherType) {
  return this.activeWeatherEffects.indexOf(weatherType) > -1;
};

Battlefield.prototype.clearWeatherEffects = function () {
  this.activeWeatherEffects = [];
  this.updateRowStrengths();
};

Battlefield.prototype.addUnit = function (player, card) {
  this[player].rows[card.row].units.push(card);
  this.updateRowStrengths();
};

Battlefield.prototype.addHornBuff = function (player, row) {
  this[player].rows[row].hornBuff = true;
  this.updateRowStrengths();
};

Battlefield.prototype.updateRowStrengths = function () {
  var self = this;

  PLAYERS.forEach(function (player) {
    UNIT_TYPES.forEach(function (unitType) {
      var affectedWeatherType = CONSTANTS[unitType.toUpperCase() + '_AFFECTED_WEATHER'];
      var isAffectedByWeather = self.isWeatherEffectActive(affectedWeatherType);
      var row = self[player].rows[unitType];

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
};

Battlefield.prototype.updateTotalScores = function () {
  var self = this;

  PLAYERS.forEach(function (player) {
    var totalScore = 0;

    for (var unitType in self[player].rows) {
      totalScore += self[player].rows[unitType].score;
    }

    self[player].totalScore = totalScore;
  });
};

module.exports = Battlefield;
