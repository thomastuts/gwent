'use strict';

import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';

export default {
  createGame() {
    console.log('Created game');
    Dispatcher.dispatch({
      type: GameConstants.CREATE_GAME,
      gameId: 'todo'
    });
  },

  joinGame(gameId) {
    console.log('Joined game');
    Dispatcher.dispatch({
      type: GameConstants.JOIN_GAME,
      gameId: gameId
    });
  }
};
