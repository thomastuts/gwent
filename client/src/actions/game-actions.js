'use strict';

import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import Socket from '../data/socket';

export default {
  createGame() {
    Dispatcher.dispatch({
      type: GameConstants.CREATE_GAME,
      gameId: 'todo'
    });
  },

  joinGame(gameId) {
    Dispatcher.dispatch({
      type: GameConstants.JOIN_GAME,
      gameId: gameId
    });
  }
};
