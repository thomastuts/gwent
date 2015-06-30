'use strict';

import { Router } from 'director';

let router = Router({
  '/': function () {
    console.log('Root route');
  },
  '/game': function () {
    console.log('Game route');
  },
  '/deck-builder': function () {
    console.log('Deck builder route');
  }
});

router.init();

// Set initial hash route to root if none is set
window.location.hash = window.location.hash || '/';

export default {
  go: function (route) {
    window.location.hash = route;
  }
};
