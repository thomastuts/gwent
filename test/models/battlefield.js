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
    });

    it('should add a unit to their respective row', function () {
      this.battlefield.playerOne.rows.Melee.units.should.have.lengthOf(1);
    });

    it('should update the row score when a unit is added', function () {
      this.battlefield.playerOne.rows.Melee.score.should.equal(5);
    });

    it('should update the total score when a unit is added', function () {
      this.battlefield.playerOne.totalScore.should.equal(5);
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
});
