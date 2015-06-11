'use strict';

var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var path = require('path');
var request = require('request');

var html = fs.readFileSync('./data/gosu-cards.html', 'utf8');
var $ = cheerio.load(html);

var deckMetadata = {
  0: {
    name: 'Northern Realms',
    slug: 'northern-realms'
  },
  1: {
    name: 'Nilfgaardian Empire',
    slug: 'nilfgaardian-empire'
  },
  2: {
    name: 'Scoia’tael',
    slug: 'scoiatael'
  },
  3: {
    name: 'Monster',
    slug: 'monster'
  },
  4: {
    name: 'Neutral',
    slug: 'neutral'
  },
  5: {
    name: 'Special',
    slug: 'special'
  }
};

var decks = [];

$('table').each(function (index) {
  var rows = $(this).find('tr');
  var deckInfo = deckMetadata[index];
  console.log('Building ' + deckInfo.name + ' deck with ' + rows.length + ' cards');
  var deck = {
    name: deckInfo.name,
    slug: deckInfo.slug,
    cards: []
  };

  rows.each(function () {
    var data = $(this).find('td');
    var cardData = {};

    cardData.name = data.eq(0).text();
    cardData.picture = data.eq(1).find('img').attr('src');
    cardData.type = data.eq(3).text();
    var ability = data.eq(4).text().replace(/\//g, '');

    if (ability) {
      cardData.ability = ability;
    }

    if (cardData.type !== 'Leader') {
      cardData.strength = data.eq(2).text();
    }

    if (cardData.name) {
      deck.cards.push(cardData);
    }
  });

  decks.push(deck);
});

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

decks.forEach(function (deck) {
  var jsonPath = path.join('./data/cards', deck.slug + '.json');

  async.each(deck.cards, function (card, cardCb) {
    var cardSlug = slugify(card.name);
    var picturePath = path.join('./data/img', deck.slug, cardSlug + '.jpg');

    if (card.picture) {
      request(card.picture, {encoding: 'binary'}, function (error, response, body) {
        delete card.picture;

        fs.writeFile(picturePath, body, 'binary', function (err) {
          if (err) {
            throw err;
          }
          cardCb();
        });
      });
    }
    else {
      console.log(card.name, 'has no picture');
      cardCb();
    }
  }, function () {
    fs.writeFileSync(jsonPath, JSON.stringify(deck, null, 2), 'utf8');
    console.log('Done creating deck:', deck.name);
  });
});
