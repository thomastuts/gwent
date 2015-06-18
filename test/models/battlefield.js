var fixtures = require('../fixtures');
var constants = require('../../server/constants');
var Battlefield = require('../../server/models/battlefield');

describe('Battlefield', function () {
  beforeEach(function () {
    this.battlefield = new Battlefield();
  });

  describe('Adding units', function () {
    beforeEach(function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_5);
      this.battlefield.addUnit('playerOne', fixtures.cards.ranged_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
    });

    it('should add a unit to their respective row', function () {
      this.battlefield.playerOne.rows.Melee.units.should.have.lengthOf(1);
      this.battlefield.playerOne.rows.Ranged.units.should.have.lengthOf(1);
      this.battlefield.playerOne.rows.Siege.units.should.have.lengthOf(1);
    });
  });

  describe('Calculating combat strengths', function () {
    beforeEach(function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_5);
      this.battlefield.addUnit('playerOne', fixtures.cards.ranged_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
    });

    it('should update the row score when a unit is added', function () {
      this.battlefield.playerOne.rows.Melee.score.should.equal(5);
      this.battlefield.playerOne.rows.Ranged.score.should.equal(3);
      this.battlefield.playerOne.rows.Siege.score.should.equal(3);
    });

    it('should update the total score when a unit is added', function () {
      this.battlefield.playerOne.totalScore.should.equal(11);
    });

    it('should calculate the actual strength of a unit and add it to a separate property', function () {
      this.battlefield.playerOne.rows.Melee.units[0].should.have.property('strength', 5);
      this.battlefield.playerOne.rows.Melee.units[0].should.have.property('actualStrength', 5);

      this.battlefield.addWeatherEffect(constants.FROST);

      this.battlefield.playerOne.rows.Melee.units[0].should.have.property('strength', 5);
      this.battlefield.playerOne.rows.Melee.units[0].should.have.property('actualStrength', 1);
    });
  });

  describe('Weather effects', function () {
    beforeEach(function () {
      this.battlefield.addWeatherEffect(constants.FROST);
      this.battlefield.addWeatherEffect(constants.FOG);
      this.battlefield.addWeatherEffect(constants.RAIN);
    });

    describe('Adding and removing weather effects', function () {
      it('should add weather effects to the battlefield', function () {
        this.battlefield.activeWeatherEffects.should.containEql(constants.FROST);
        this.battlefield.activeWeatherEffects.should.containEql(constants.FOG);
        this.battlefield.activeWeatherEffects.should.containEql(constants.RAIN);
      });

      it('should not add weather effects more than once', function () {
        this.battlefield.addWeatherEffect(constants.FROST);

        this.battlefield.activeWeatherEffects.filter(function (effect) {
          return effect === constants.FROST;
        }).should.have.lengthOf(1);
      });

      it('should remove weather effects', function () {
        this.battlefield.clearWeatherEffects();
        this.battlefield.activeWeatherEffects.should.have.lengthOf(0);
      });
    });

    describe('Weather affecting units', function () {
      var tests = [
        {
          row: constants.MELEE,
          unit: fixtures.cards.melee_5
        },
        {
          row: constants.RANGED,
          unit: fixtures.cards.ranged_3
        },
        {
          row: constants.SIEGE,
          unit: fixtures.cards.siege_3
        }
      ];

      tests.forEach(function (test) {
        it('should modify damage outputs for units in the ' + test.row + ' row', function () {
          this.battlefield.addUnit('playerOne', test.unit);
          this.battlefield.playerOne.rows[test.row].score.should.equal(1);
        });
      });
    });
  });

  describe('Morale Boost', function () {
    it('should apply the Morale Boost to all units except the unit itself', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.playerOne.rows.Siege.score.should.equal(5); // (3 + 1) + 1
    });

    it('should stack multiple Morale Boost abilities', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.playerOne.rows.Siege.score.should.equal(9); // (3 + 2) + (1 + 1) + (1 + 1)
    });

    it('should work through weather effects', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.addWeatherEffect(constants.RAIN);
      this.battlefield.playerOne.rows.Siege.score.should.equal(7); // (1 + 2) + (1 + 1) + (1 + 1)
    });

    it('should work in conjunction with Horn ability', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_3);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.addUnit('playerOne', fixtures.cards.siege_1_morale_boost);
      this.battlefield.addHornBuff('playerOne', 'Siege');
      this.battlefield.playerOne.rows.Siege.score.should.equal(18); // ((3 + 2) + (1 + 1) + (1 + 1)) * 2
    });
  });

  describe('Tight Bond', function () {
    it('should correctly update strength for the same units with Tight Bond', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.playerOne.rows.Melee.score.should.equal(16);
    });

    it('should additively add the Tight Bond bonus to units', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.playerOne.rows.Melee.score.should.equal(36);
    });

    it('should work in conjunction with Horn buff', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addHornBuff('playerOne', 'Melee');
      this.battlefield.playerOne.rows.Melee.score.should.equal(32);
    });

    it('should work through weather effects', function () {
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addUnit('playerOne', fixtures.cards.melee_4_tight_bond);
      this.battlefield.addWeatherEffect(constants.FROST);
      this.battlefield.playerOne.rows.Melee.score.should.equal(9);
    });
  });
});
