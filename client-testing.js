const io = require('socket.io-client');
const jwt = require('jsonwebtoken');

token = jwt.encode(payload, SECRET_KEY, algorithm='HS256');
console.log(token);
