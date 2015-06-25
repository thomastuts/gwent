'use strict';

import { EventEmitter } from 'events';
import _ from 'lodash';
import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';

const CHANGE_EVENT = 'event';

let GameStore = _.merge({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

GameStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case GameConstants.CREATE_GAME:
      console.log('STORE: created game');
      break;
    case GameConstants.JOIN_GAME:
      console.log('STORE: joined game');
      break;
  }
});

export default GameStore;
