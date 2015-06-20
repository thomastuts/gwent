var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(9090);

app.get('/', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'client/index.html'));
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
