'use strict';

import React from 'react';
import Lobby from './lobby';
import Board from './board';
import GameStore from '../store/game-store';
import GameConstants from '../constants/game-constants';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: GameStore.getActiveGame(),
      status: GameStore.getStatus(),
      player: GameStore.getActivePlayer(),
      deck: GameStore.getDeck()
    };
  }

  componentDidMount() {
    GameStore.onChange(() => {
      this.setState({
        status: GameStore.getStatus(),
        game: GameStore.getActiveGame(),
        player: GameStore.getActivePlayer(),
        deck: GameStore.getDeck()
      });
    });
  }

  render() {
    if (!this.state.game || this.state.status !== GameConstants.GAME_STATE_PLAYING) {
      return (
        <Lobby status={this.state.status} />
      );
    }
    else {
      return (
        <Board deck={this.state.deck} />
      );
    }
  }
}

export default Game;
