import React from 'react';
import Game from './components/game';

let socket = io.connect('http://localhost:9090');

React.render(
  <Game />,
  document.getElementById('app')
);

socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
