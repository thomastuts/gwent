'use strict';

import http from 'http';
import path from 'path';
import express from 'express';
import socket from 'socket.io';

import GameHandler from './handlers/game';

let app = express();
let server = http.Server(app);
let io = socket(server);

server.listen(9090);

app.get('/', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'client/index.html'));
});

io.on('connection', function (socket) {
  GameHandler(io, socket);
});
