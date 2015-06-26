'use strict';

import EVENTS from '../../common/events';
import Board from '../models/board';
import PresetDeck from '../../test/preset-deck';

let currentGameId = 1;
let games = {};

function _createGame(socket, callback) {
  let gameId = currentGameId;
  var board = new Board(currentGameId);

  board.setPlayerOne({
    name: 'Geralt'
  });

  board.playerOne.setDeck(PresetDeck);
  board.playerOne.readyUp();

  games[gameId] = {
    board: board,
    playerOne: socket
  };

  socket.join(gameId);
  callback({
    gameId,
    deck: board.playerOne.deck
  });

  currentGameId++;
}

export default function (io, socket) {
  socket.on(EVENTS.CREATE_GAME, function (data, callback) {
    _createGame(socket, callback);
  });
};
