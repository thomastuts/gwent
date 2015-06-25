'use strict';

const SOCKET_URL = 'http://localhost:9090';

let socket = io.connect(SOCKET_URL);

export default socket;
