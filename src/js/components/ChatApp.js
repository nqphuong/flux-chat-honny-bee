
var MessageSection = require('./MessageSection');
var ThreadSection = require('./ThreadSection');
var React = require('react');

var ChatApp = React.createClass({
    render: function(){
        return(
            <div className="chatapp">
                <MessageSection />
                <ThreadSection />
            </div>
        );
    }
});

module.exports = ChatApp;