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
      console.error("TokenManager Auth Error : " + err.message);
      socket.disconnect();
      next(err);
    }else{
      socket._id = result;
      console.log("TokenManager Auth OK : " + socket._id);
      next();
    }
  });
}).on('connection', function(socket) {

  // send pending message
  const messages = messageManager.getPendingMessages(socket._id);
  if(!messages || messages.length == 0){
    console.log("MessagesManager : Nothing to send to " + socket._id);
  }else{
    console.log("MessagesManager : " + messages.length + " to send to " + socket._id);
    messages.forEach(function(message) {
      socket.emit('messaging',message.data);
      console.log("Pending message from " + message.sender + "has been sent");
    });
  }

  socket.on('messaging', function (data) {

    var msg = null;
    try {
      msg = dataParser.parseToMessage(socket,data);
    } catch (e) {
      console.error("Parsing Message Error " + socket._id + "\n" + e);
      return;
    }

    const sockets = io.sockets.connected;
    if(sockets[msg.target]){
      console.log("MessagesManager " + msg.ID + "succesfully sended to " + msg.target);
      sockets[msg.target].emit('messaging',msg.data);
    }else{
      console.log("MessagesManager " + msg.ID + " added to pending queue");
      //messageManager.addPendingMessage
    }

  });

});

server.listen(8080);
