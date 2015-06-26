'use strict';

import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import EVENTS from '../../../common/events';
import Socket from '../data/socket';

export default {
  createGame() {
    Dispatcher.dispatch({
      type: GameConstants.CREATE_GAME
    });

    Socket.emit(EVENTS.CREATE_GAME, {}, function (data) {
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

  joinGame(gameId) {
    Dispatcher.dispatch({
      type: GameConstants.JOIN_GAME,
      gameId: gameId
    });
  }
};
