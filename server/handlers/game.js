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
    success: true,
    gameId,
    deck: board.playerOne.deck
  });

  currentGameId++;
}

function _joinGame(socket, gameId, callback) {
  var game = games[gameId];

  if (game) {
    game.playerTwo = socket;

    game.board.setPlayerTwo({
      name: 'Opponent'
    });

    game.board.playerTwo.setDeck(PresetDeck);
    game.board.playerTwo.readyUp();
    socket.join(gameId);

    callback({
      success: true
    });
  }
  else {
    callback({
      success: false
    });
  }
}

export default function (io, socket) {
  socket.on(EVENTS.CREATE_GAME, function (data, callback) {
    _createGame(socket, callback);
  });

  socket.on(EVENTS.JOIN_GAME, function (data, callback) {
    _joinGame(socket, data.gameId, callback);
  });
};
