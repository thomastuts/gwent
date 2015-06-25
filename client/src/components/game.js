'use strict';

import React from 'react';
import Lobby from './lobby';
import Board from './board';
import GameStore from '../store/game-store';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: GameStore.getActiveGame(),
      player: GameStore.getActivePlayer()
    };
  }

  componentDidMount() {
    GameStore.onChange(() => {
      this.setState({
        game: GameStore.getActiveGame(),
        player: GameStore.getActivePlayer()
      });
    });
  }

  render() {
    if (!this.state.game) {
      return (
        <Lobby />
      );
    }
    else {
      return (
        <Board />
      );
    }
  }
}

export default Game;
