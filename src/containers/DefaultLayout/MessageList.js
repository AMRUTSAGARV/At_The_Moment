import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import './MessageList.css'

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    messages: [],
  }


  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  

  render() {
    return (
      <div className="MessageList">
        {this.props.messages.map((message, i) => (
          <Message key={i} {...message}  />
        ))}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
               {/* typing.... */}
        </div>
      </div>
    )
  }
}

export default MessageList
