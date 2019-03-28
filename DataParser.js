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

    if(!parser.target){
      throw new Error("target not found");
    }
    this.target = parser.target;

    if(!parser.messageID){
      throw new Error("messageID not found");
    }
    this.ID = parser.messageID;

    if(!parser.timestamp){
      throw new Error("timestamp not found");
    }
    this.timestamp = parser.timestamp;

    if(!parser.content){
      throw new Error("content not found");
    }
    this.content = parser.content;

  } catch (e) {
    throw new Error("Parsing Message (" + e.message + ")");
  }
}

Message.prototype.sender = this.sender;
Message.prototype.target = this.target;
Message.prototype.ID = this.ID;
Message.prototype.timestamp = this.timestamp;

Message.prototype.content = this.content;

Message.prototype.data = this.data;
