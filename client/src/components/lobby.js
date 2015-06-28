import React from 'react';
import GameActions from '../actions/game-actions';
import GameStore from '../store/game-store';

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Geralt'
    };
  }
  
  createGame = () => {
    GameActions.createGame();
  };

  joinGame = () => {
    GameActions.joinGame(1);
  };

  setName = (evt) => {
    this.setState({
      name: evt.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Lobby</h2>
        <div>
          <input type="text" value={this.state.name} onChange={this.setName}/>
        </div>
        <div>
          <button onClick={this.createGame}>Create game</button>
        </div>
        <div>
          <button onClick={this.joinGame}>Join game</button>
        </div>
      </div>
    );
  }
}

export default Lobby;
