'use strict';

import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import EVENTS from '../../../common/events';
import Socket from '../data/socket';

var gameActions = {
  createGame(playerName) {
    Dispatcher.dispatch({
      type: GameConstants.CREATE_GAME
    });

    Socket.emit(EVENTS.CREATE_GAME, {playerName}, function (data) {
      if (data.success) {
        Dispatcher.dispatch({
          type: GameConstants.CREATE_GAME_SUCCESS,
          data
        });
      }
      else {
        Dispatcher.dispatch({
          type: GameConstants.CREATE_GAME_FAIL
        });
      }
    });
  },

  joinGame(gameId, playerName) {
    console.log('Joining game', gameId);
    Socket.emit(EVENTS.JOIN_GAME, {gameId, playerName}, function (data) {
      if (data.success) {
        console.log('Join game success');
        Dispatcher.dispatch({
          type: GameConstants.JOIN_GAME_SUCCESS,
          gameId: gameId
        });
      }
      else {
        Dispatcher.dispatch({
          type: GameConstants.JOIN_GAME_FAIL,
          gameId: gameId
        });
      }
    });
  },

  opponentJoined(opponent) {
    console.log('Opponent joined:', opponent);
    Dispatcher.dispatch({
      type: GameConstants.OPPONENT_JOINED,
      opponent
    });
  }
};

Socket.on(EVENTS.OPPONENT_JOINED, function (data) {
  gameActions.opponentJoined(data);
});

export default gameActions;
