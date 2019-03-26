var http = require('http');
const jwt = require('jsonwebtoken');

var server = http.createServer(function(req, res) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("API : ON");
});

const io = require('socket.io').listen(server);

/*use(function(socket, next){
	  if (socket.handshake.query && socket.handshake.query.token){
	    jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
	      if(err) return next(console.log(new Error('Authentication error')));
	      socket.decoded = decoded;
	      next();
	    });
	  } else {
	      next(console.log(new Error('Authentication error')));
	  }
	})*/
	io.sockets.on('connection', function(socket) {
	    // Connection now authenticated to receive further events
		console.log("user connected")


	});

server.listen(8080);
