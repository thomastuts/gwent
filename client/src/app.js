let React = require('react');
let Lobby = require('./components/lobby');
let socket = io.connect('http://localhost:9090');

React.render(
  <Lobby />,
  document.getElementById('app')
);

socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
