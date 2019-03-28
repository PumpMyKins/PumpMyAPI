module.exports = {
  parseToMessage: function (sender,data) {
    return new Message(sender,data);
  },
};

function Message(sender,data){
  this.sender = sender._id;
  this.data = data;
  this.parser = JSON.parse(data);
}

Message.prototype.sender = this.sender;
Message.prototype.target = this.parser.target;
Message.prototype.ID = this.parser.messageID;
Message.prototype.timestamp = this.parser.timestamp;

Message.prototype.content = this.parser.content;

Message.prototype.data = this.data;
