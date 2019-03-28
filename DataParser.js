module.exports = {
  parseToMessage: function (sender,data) {
    return new Message(sender,data);
  },
};

function Message(sender,data){
  this.sender = sender._id;
  this.data = data;
  try {

    const parser = JSON.parse(data);
    this.parser = parser;
    this.target = parser.target;
    this.ID = parser.messageID;
    this.timestamp = parser.timestamp;
    this.content = parser.content;

  } catch (e) {
    throw new Error("Parsing Message Error");
  }
}

Message.prototype.sender = this.sender;
Message.prototype.target = this.target;
Message.prototype.ID = this.ID;
Message.prototype.timestamp = this.timestamp;

Message.prototype.content = this.content;

Message.prototype.data = this.data;
