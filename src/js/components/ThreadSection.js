
var React = require('react');
var ThreadStore = require('../stores/ThreadStore');
var ThreadListItem = require('./ThreadListItem');

function getStateFromStores(){
    return {
        threads: ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrentID(),
        
    };
}

var ThreadSection = React.createClass({
    getInitialState: function(){
        return getStateFromStores();
    },
    componentDidMount: function(){
        ThreadStore.addChangeListener(this._onChange);
    },
    render: function(){
        var threadListItems = this.state.threads.map(function(thread){
            return (
                <ThreadListItem
                            key={thread.id}
                            thread={thread}
                            currentID={this.state.currentThreadID} />
            );
        }, this);
        return (
            <div className="thread-section">
                <div className="thread-count">
                  
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