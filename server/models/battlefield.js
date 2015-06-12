function Battlefield() {
  this.activeWeatherEffects = [];

  this.playerOne = {
    Melee: {
      score: 0,
      commanderHorn: false,
      units: []
    },
    Ranged: {
      score: 0,
      commanderHorn: false,
      units: []
    },
    Siege: {
      score: 0,
      commanderHorn: false,
      units: []
    }
  };

  this.playerTwo = {
    Melee: {
      score: 0,
      commanderHorn: false,
      units: []
    },
    Ranged: {
      score: 0,
      commanderHorn: false,
      units: []
    },
    Siege: {
      score: 0,
      commanderHorn: false,
      units: []
    }
  };
}

Battlefield.prototype.addWeatherEffect = function (card) {
  // TODO: implement
};

Battlefield.prototype.clearWeatherEffects = function () {
  // TODO: implement
};

Battlefield.prototype.addUnit = function (player, card) {
  // TODO: implement
};

Battlefield.prototype.calculateRowStrengths = function () {
  // TODO: implement
};

module.exports = Battlefield;
