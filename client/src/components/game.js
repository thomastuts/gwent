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
      player: GameStore.getActivePlayer(),
      deck: GameStore.getDeck()
    };
  }

  componentDidMount() {
    GameStore.onChange(() => {
      this.setState({
        game: GameStore.getActiveGame(),
        player: GameStore.getActivePlayer(),
        deck: GameStore.getDeck()
      });
    });
  }

  render() {
    console.log(this.state.game);
    if (!this.state.game) {
      return (
        <Lobby />
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
