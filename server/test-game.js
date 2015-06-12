var Board = require('./models/board');
var presetDeck = require('./preset-deck');

var game = new Board(1, true);

game.setPlayerOne({
  name: 'Geralt'
});

game.playerOne.setDeck(presetDeck);
game.playerOne.readyUp();

game.setPlayerTwo({
  name: 'Innkeeper'
});

game.playerTwo.setDeck(presetDeck);
game.playerTwo.readyUp();

game.startGame();

game.playCard('playerOne', 'zoltan-chivay');
console.log(game.battlefield.playerOne);

game.playCard('playerOne', 'biting-frost');
console.log(game.battlefield.playerOne);
