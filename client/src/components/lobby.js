import React from 'react';
import GameActions from '../actions/game-actions';
import GameStore from '../store/game-store';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
  }
  
  createGame() {
    GameActions.createGame();
  }

  joinGame() {
    GameActions.joinGame(1);
  }

  render() {
    return (
      <div>
        <h2>Lobby</h2>
        <button onClick={this.createGame}>Create game</button>
        <button onClick={this.joinGame}>Join game</button>
      </div>
    );
  }
}

export default Lobby;
