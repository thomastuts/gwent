var React = require('react');

class Lobby extends React.Component {
  createGame() {
    console.log('Creating game');
  }

  joinGame() {
    console.log('Joining game');
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
