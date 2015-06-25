'use strict';

import { EventEmitter } from 'events';
import _ from 'lodash';
import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import Glossary from '../../../common/glossary';

const CHANGE_EVENT = 'event';

let _game = null;
let _player = null;

let GameStore = _.merge({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getActiveGame() {
    return _game;
  },

  getActivePlayer() {
    return _player;
  }
});

GameStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case GameConstants.CREATE_GAME:
      _game = action.gameId;
      _player = Glossary.PLAYER_ONE;
      GameStore.emitChange();
      break;
    case GameConstants.JOIN_GAME:
      _game = action.gameId;
      _player = Glossary.PLAYER_TWO;
      GameStore.emitChange();
      break;
  }
});

export default GameStore;
