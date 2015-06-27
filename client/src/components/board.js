'use strict';

import React from 'react';

class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="player-area">
          <div className="player opponent">
            Opponent
          </div>
          <div className="weather-effects">
            Weather effects
          </div>
          <div className="player self">
            Geralt
          </div>
        </div>
        <div className="battlefield">
          <div className="area opponent">
            <div className="row siege">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row ranged">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row melee">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
          </div>
          <div className="area self">
            <div className="row siege">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row ranged">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row melee">
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
