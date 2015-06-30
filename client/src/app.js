import React from 'react';
import Game from './components/game';
import Router from './routes';

setTimeout(function () {
  Router.go('/game');
}, 2000);

React.render(
  <Game />,
  document.getElementById('app')
);
