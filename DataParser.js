module.exports = {
  getTokensManager: function (data) {
    return new Message(data);
  },
};

function Message(data){
  this.parser = JSON.parse(data);
}

Message.prototype.target = this.parser.target;
Message.prototype.ID = this.parser.messageID;
Message.prototype.timestamp = this.parser.timestamp;

Message.prototype.content = this.parser.content;
