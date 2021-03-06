module.exports = {
  getTokensManager: function () {
    return new TokensManager();
  },
  getMessagesManager: function (t) {
    return new MessagesManager(t);
  }
};

/*
*
* TokensManager
*
*/

function TokensManager(){
  let map = new Map();
  /////////////////////////////////////
  // Add token

  map.set('token1','travertine-proxy-pmc');
  map.set('token2','pumpmybot-discord');

  /////////////////////////////////////
  this.tokens = map;
}

TokensManager.prototype.verify = function (token,callback) {

  if(!token || !this.tokens.has(token)) return callback(new Error("Invalid Token"));

  return callback(null,this.tokens.get(token));
};

/*
*
* MessagesManager
*
*/

function MessagesManager(man,io){

  this.tokensManager = man;
  this.io = io;
  this.messages = new Map();

}

MessagesManager.prototype.getPendingMessages = function (target) {

  return null;

};

MessagesManager.prototype.addPendingMessage = function (msg,callback) {

};
