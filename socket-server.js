const http = require('http');
const server = http.createServer(function(req, res) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("API : ON");
});

const io = require('socket.io').listen(server);

const tokenManager = require('./Manager').getTokensManager();
const messageManager = require('./Manager').getMessagesManager(tokenManager,io);
const dataParser = require('./DataParser');

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  tokenManager.verify(token,(err,result) => {
    if(err){
      console.log("TokenManager Auth Error : " + err.message);
      socket.disconnect();
      next(err);
    }else{
      socket._id = result;
      console.log("TokenManager Auth OK : " + socket._id);
      next();
    }
  });
}).on('connection', function(socket) {

  socket.on('messaging', function (data) {

    messageManager.addPendingMessage(data,(err,result) => {
      if(err){
        console.error("MessagesManager Error : " + err);
      }else {
        console.log("MessagesManager " + result.messageID + "succesfully added to pending queue");
      }
    });

  });

  socket.on('disconnect', function () {

  });

});

server.listen(8080);
