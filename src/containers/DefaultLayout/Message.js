import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"
import './Message.css'
import Moment from 'react-moment'


class Message extends Component {

  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
    // timestamp: this.propTypes.toTimeString.isRequired
  }

  render() {
    let timeFormat = "DD/MM/YYYY hh:mm a"
    var moment = require('moment');
    var a = moment(this.props.timestamp);
    var b = moment();
    let difference = b.diff(a, 'days')
    if (difference <= 1 && a.date() == b.date()) {
      timeFormat = "hh:mm a"
    }
    const classes = classNames('Message', {
      log: !this.props.author,
      me: this.props.me
    })

    return (
      <div className={classes}>
        {/* {this.props.author && (
          <span className="author">{this.props.author}:</span>
        )} */}
        {this.props.body && (
          <span className="body">{this.props.body}</span>
        )
        }
        <br></br>
        {this.props.timestamp && (
          <Moment format={timeFormat}>
            {this.props.timestamp}
          </Moment>
        )
        }
      </div>
    )
  }
}

export default Message
