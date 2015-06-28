'use strict';

import React from 'react';

class Card extends React.Component {
  render() {
    console.log(this.props);
    let image = 'img/' + this.props.card.slug + '.jpg';
    let classes = ['card', this.props.style || 'thumbnail'].join(' ');
    let cardStyle = {
      backgroundImage: 'url(' + image + ')'
    };

    return (
      <div className={classes} style={cardStyle}></div>
    );
  }
}

export default Card;
