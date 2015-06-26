'use strict';

/**
 * These are the constants used for internal communication in the client (namely through the dispatcher and actions).
 * Some of these have overlap with the socket events, but we'll keep them separate for now.
 */

module.exports = {
  GAME_STATE_LOBBY: 'LOBBY',
  GAME_STATE_PLAYING: 'PLAYING',

  CREATE_GAME: 'CREATE_GAME',
  CREATE_GAME_SUCCESS: 'CREATE_GAME_SUCCESS',
  CREATE_GAME_FAIL: 'CREATE_GAME_FAIL',

  JOIN_GAME: 'JOIN_GAME',
  JOIN_GAME_SUCCESS: 'JOIN_GAME_SUCCESS',
  JOIN_GAME_FAIL: 'JOIN_GAME_FAIL'
};
