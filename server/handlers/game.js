'use strict';

import EVENTS from '../../common/events';
import Board from '../models/board';
import PresetDeck from '../../test/preset-deck';

let currentGameId = 1;
let games = {};

function _createGame(socket, data, callback) {
  let gameId = currentGameId;
  var board = new Board(currentGameId);

  board.setPlayerOne({
    name: data.playerName
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

function _joinGame(socket, data, callback) {
  var game = games[data.gameId];

  if (game) {
    game.playerTwo = socket;

    game.board.setPlayerTwo({
      name: data.playerName
    });

    game.board.playerTwo.setDeck(PresetDeck);
    game.board.playerTwo.readyUp();
    socket.join(gameId);

    game.playerOne.emit(EVENTS.OPPONENT_JOINED, {
      name: game.board.playerTwo.name,
      lives: game.board.playerTwo.lives
    });

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
    _createGame(socket, data, callback);
  });

  socket.on(EVENTS.JOIN_GAME, function (data, callback) {
    _joinGame(socket, data, callback);
  });
};
