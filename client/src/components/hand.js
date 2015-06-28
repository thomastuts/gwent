'use strict';

import React from 'react';
import Card from './card';

class Hand extends React.Component {
  render() {
    console.log(this.props.cards);
    // TODO: sort by type and strength
    let cards = this.props.cards.map(function (card) {
      return (
        <Card card={card} style="thumbnail" />
      );
    });
    return (
      <div className="player-hand">
        {cards}
      </div>
    );
  }
}

export default Hand;
