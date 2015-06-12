require('should');
var fixtures = require('../fixtures');
var Player = require('../../server/models/player');

describe('Player creation', function () {
  it('should add a default name if the player gives no name', function () {
    var player = new Player({
      deck: fixtures.deck
    });

    player.should.have.property('name', 'Stranger');
  });

  it('should add the player name if it is defined', function () {
    var player = new Player({
      name: fixtures.player.name,
      deck: fixtures.deck
    });

    player.should.have.property('name', fixtures.player.name);
  });

  it('should set the starting lives', function () {
    var player = new Player({
      name: fixtures.player.name,
      deck: fixtures.deck
    });

    player.lives.should.be.greaterThan(0);
  });

  it('should add a deck', function () {
    var player = new Player({
      name: 'Geralt',
      deck: fixtures.deck
    });

    player.should.have.property('deck');
  });
});
