'use strict';

import React from 'react';

class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="player-area">
          <div className="player opponent">
            <div className="leader">
              <img src="http://placekitten.com/101/142" alt=""/>
              <div className="ability">X</div>
            </div>
            <div className="info">
              <div className="faction">
                <div className="icon">X</div>
              </div>
              <div className="player-data">
                <div className="name">Opponent</div>
                <div className="faction-name">Nilfgaardian Empire</div>
                <div className="resources">
                  <div className="hand">7 X</div>
                  <div className="lives">
                    <div className="health active">O</div>
                    <div className="health active">O</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weather-effects">
            Weather effects
          </div>
          <div className="player opponent">
            <div className="leader">
              <img src="http://placekitten.com/101/142" alt=""/>
              <div className="ability">X</div>
            </div>
            <div className="info">
              <div className="faction">
                <div className="icon">X</div>
              </div>
              <div className="player-data">
                <div className="name">Geralt</div>
                <div className="faction-name">Northern Realms</div>
                <div className="resources">
                  <div className="hand">7 X</div>
                  <div className="lives">
                    <div className="health active">O</div>
                    <div className="health active">O</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="battlefield">
          <div className="area opponent">
            <div className="row siege">
              <div className="score">5</div>
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row ranged">
              <div className="score">5</div>
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row melee">
              <div className="score">5</div>
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
          </div>
          <div className="area self">
            <div className="row siege">
              <div className="score">5</div>
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row ranged">
              <div className="score">5</div>
              <div className="horn-buff"></div>
              <div className="units"></div>
            </div>
            <div className="row melee">
              <div className="score">5</div>
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
