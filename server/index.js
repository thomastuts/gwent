var Board = require('./models/board');
var Player = require('./models/player');

var playerOne = new Player({
  faction: 'monster',
  deck: [
    'ghoul',
    'ghoul',
    'nekker',
    'wyvern',
    'celaeno-harpy',
    'celaeno-harpy',
    'endrega',
    'vampire-garkain',
    'vampire-garkain',
    'botchling',
    'botchling',
    'botchling'
  ]
});
