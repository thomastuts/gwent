'use strict';

import { EventEmitter } from 'events';
import _ from 'lodash';
import Dispatcher from '../dispatcher/app-dispatcher';
import GameConstants from '../constants/game-constants';
import Glossary from '../../../common/glossary';

const CHANGE_EVENT = 'event';

let _gameState = GameConstants.GAME_STATE_LOBBY;
let _game = null;
let _deck = null;
let _player = null;
let _opponent = null;

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
  },

  getDeck() {
    return _deck;
  },

  getStatus() {
    return _gameState;
  }
});

GameStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case GameConstants.CREATE_GAME_SUCCESS:
      _game = action.data.gameId;
      _deck = action.data.deck;
      _player = Glossary.PLAYER_ONE;
      _gameState = GameConstants.GAME_STATE_WAITING;
      console.log('Created game:', _game);
      GameStore.emitChange();
      break;
    case GameConstants.JOIN_GAME_FAIL:
      console.log('Oh no error');
      GameStore.emitChange();
      break;
    case GameConstants.JOIN_GAME_SUCCESS:
      _game = action.gameId;
      _player = Glossary.PLAYER_TWO;
      _gameState = GameConstants.GAME_STATE_PLAYING;
      GameStore.emitChange();
      break;
    case GameConstants.OPPONENT_JOINED:
      _opponent = action.opponent;
      _gameState = GameConstants.GAME_STATE_PLAYING;
      GameStore.emitChange();
      break;
  }
});

export default GameStore;
