import _ from 'lodash';
import constants from '../constants';
import cards from '../data/cards';

const CARDS_IN_HAND = 10;

class Deck {
  constructor(deck) {
    this.faction = deck.faction;
    this.leader = deck.leader;
    this.hand = [];
    this.discards = [];

    this.cards = deck.cards.map(function (cardSlug) {
      var card = cards.getCard(cardSlug);
      if (card.type === 'Unit') {
        card.strength = parseInt(card.strength);
      }
      return card;
    });

    if (!constants.DEBUG) {
      this.shuffleCards();
    }

    this.drawHand();
  }

  shuffleCards() {
    this.cards = _.shuffle(this.cards);
  }

  drawHand() {
    if (constants.DEBUG) {
      this.hand = this.cards.slice(0, CARDS_IN_HAND);
      this.cards = this.cards.slice(CARDS_IN_HAND, this.cards.length);
    }
    else {
      for (var i = 0; i < CARDS_IN_HAND; i++) {
        this.hand.push(this.drawRandomCard());
      }
    }
    this.sortHand();
  }

  findCardInHand(cardSlug) {
    return _.find(this.hand, {slug: cardSlug});
  }

  sortHand() {
    this.hand.sort();
  }

  discardCard(cardSlug) {
    var index = _.findIndex(this.hand, {slug: cardSlug});
    var card = this.hand[index];

    if (index > -1) {
      this.hand.splice(index, 1);
      this.discards.push(card);
    }
  }

  drawRandomCard() {
    var drawnCard = this.cards.pop();
    this.shuffleCards();
    return drawnCard;
  }
}

module.exports = Deck;
