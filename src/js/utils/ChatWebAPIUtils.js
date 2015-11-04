
var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
module.exports = {
    getAllMessages: function(){
        var rawMessages = JSON.parse(localStorage.getItem('messages'));
        
        ChatServerActionCreators.receiveAll(rawMessages);
    },
    createMessage: function(message, threadName){
        var rawMessages = JSON.parse(localStorage.getItem('messages'));
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var threadID = message.threadID || ('t_' + Date.now());
        var createdMessage = {
            id: id,
            threadID: threadID,
            threadName: threadName,
            authorName: message.authorName,
            text: message.text,
            timestamp: timestamp
        };
        
        rawMessages.push(createdMessage);
        
        localStorage.setItem('messages', JSON.stringify(rawMessages));
        
        setTimeout(function(){
            ChatServerActionCreators.receiveCreatedMessage(createdMessage);
        }, 0);
        
        console.log(localStorage);
    },
};