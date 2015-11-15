
var React = require('react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');
var ThreadListItem = require('./ThreadListItem');

function getStateFromStores(){
    return {
        threads: ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrentID(),
        unreadCount: UnreadThreadStore.getCount(),
    };
}

var ThreadSection = React.createClass({
    getInitialState: function(){
        return getStateFromStores();
    },
    componentDidMount: function(){
        ThreadStore.addChangeListener(this._onChange);
        UnreadThreadStore.addChangeListener(this._onChange);
    },
    conponentWillUnmount: function(){
        ThreadStore.removeChangeListener(this._onChange);
        UnreadThreadStore.removeChangeListener(this._onChange);
    }
    render: function(){
        var threadListItems = this.state.threads.map(function(thread){
            return (
                <ThreadListItem
                            key={thread.id}
                            thread={thread}
                            currentID={this.state.currentThreadID} />
            );
        }, this);
        
        var unread = this.state.unreadCount === 0 ? null : <span>Unread threads: {this.state.unreadCount}</span>
        
        return (
            <div className="thread-section">
                <div className="thread-count">
                    {unread}
                </div>
                <ul className="thread-list">
                  {threadListItems}
                </ul>
            </div>
        );
    },
    
    _onChange: function(){
        this.setState(getStateFromStores());
    }
});

module.exports = ThreadSection;