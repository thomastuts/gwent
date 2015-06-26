'use strict';

import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import EVENTS from '../../../common/events';
import Socket from '../data/socket';

export default {
  createGame() {
    Socket.emit(EVENTS.CREATE_GAME, {}, function (data) {
      Dispatcher.dispatch({
        type: GameConstants.CREATE_GAME,
        data
      });
    });
  },

  joinGame(gameId) {
    Dispatcher.dispatch({
      type: GameConstants.JOIN_GAME,
      gameId: gameId
    });
  }
};
