let socket = io.connect('http://localhost:9090');

socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
