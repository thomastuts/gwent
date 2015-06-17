import _ from 'lodash';
import constants from '../constants';
import { getCard } from '../data/cards';

const CARDS_IN_HAND = 10;

class Deck {
  constructor(deck) {
    this.faction = deck.faction;
    this.leader = deck.leader;
    this.hand = [];
    this.discards = [];

    this.cards = deck.cards.map(function (cardSlug) {
      return getCard(cardSlug);
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
      for (let i = 0; i < CARDS_IN_HAND; i++) {
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
    let index = _.findIndex(this.hand, {slug: cardSlug});
    let card = this.hand[index];

    if (index > -1) {
      this.hand.splice(index, 1);
      this.discards.push(card);
    }
  }

  drawRandomCard() {
    let drawnCard = this.cards.pop();
    this.shuffleCards();
    return drawnCard;
  }
}

export default Deck;
