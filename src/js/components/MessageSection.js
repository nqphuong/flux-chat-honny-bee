
var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var MessageListItem = require('./MessageListItem');
var MessageComposer = require('./MessageComposer');

function getStateFromStores(){
    return {
        messages: MessageStore.getAllForCurrentThread(),
        thread: ThreadStore.getCurrent()
    }
}

var MessageSection = React.createClass({
    getInitialState: function(){
        return getStateFromStores();
    },
    componentDidMount: function(){
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange);
        ThreadStore.addChangeListener(this._onChange);
    },
    componentWillMount: function(){
        MessageStore.removeChangeListener(this._onChange);
        ThreadStore.removeChangeListener(this._onChange);
    },
    componentDidUpdate: function(){},
    
    render: function(){
        console.log(this.state.messages);
        var messageListItems = this.state.messages.map(function(message){
            return (
                <MessageListItem key={message.id} message={message} />
            );
        });
        return(
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">
                    {messageListItems}
                </ul>
                <MessageComposer threadID={this.state.thread.id} />
            </div>
        );
    },
    
    _scrollToBottom: function() {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },
    
    _onChange: function(){
        this.setState(getStateFromStores());
    },
});

module.exports = MessageSection;