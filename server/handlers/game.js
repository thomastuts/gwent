'use strict';

import EVENTS from '../../common/events';

let currentGameId = 1;
let games = {};

function _createGame(socket, callback) {
  let gameId = currentGameId;

  games[gameId] = {
    playerOne: socket
  };
  socket.join(gameId);
  callback({
    gameId
  });

  currentGameId++;
}

export default function (io, socket) {
  socket.on(EVENTS.CREATE_GAME, function (data, callback) {
    _createGame(socket, callback);
  });
};
