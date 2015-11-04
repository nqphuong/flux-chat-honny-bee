
var ChatApp = require('./components/ChatApp');
var React = require('react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

ChatExampleData.init();
ChatWebAPIUtils.getAllMessages();

React.render(
    <ChatApp />, document.getElementById('react')
);