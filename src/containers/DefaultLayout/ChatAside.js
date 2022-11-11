import React, { Component } from 'react';
import MessageList from './MessageList';




class ChatAside extends Component {
  constructor() {
    super()
    this.state = {
      shownToggle: true,
      messages: [],
      username: null,
      channel: null,
      channelName1: null,
      channelName2: null,
      client: null,
      isTyping: false
    }

    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {
    this.setState({
      shownToggle: !this.state.shownToggle
    });

  }

  componentDidMount = () => {
    this.checkChannel(this.props.chatClient)
      .then(this.joinChannel)
      .then(this.getMessages)
      .then((fetchedMessages) => {
        let constructedObjects = fetchedMessages.map((eachmessage) => { return { body: eachmessage.body, author: eachmessage.author, me: eachmessage.author === this.state.username, timestamp: eachmessage.timestamp } })

        this.setState({
          messages: [...this.state.messages, ...constructedObjects]
        })
      })
      .then(this.configureChannelEvents)
      .catch((error) => {
        console.log("Error", error.message)
      })
  }

  checkChannel = (chatClient) => {
    this.setState({
      client: chatClient,
      channelName1: this.props.currentUser.username + this.props.chatUser.username,
      channelName2: this.props.chatUser.username + this.props.currentUser.username,
      username: (this.props.currentUser.first_name + " " + this.props.currentUser.last_name)
    })

    console.log("chatClient", chatClient);
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        console.log("getSubscribedChannels response");
        chatClient.getChannelByUniqueName(this.state.channelName1).then((channel) => {
          console.log("getChannelByUniqueName first");
          resolve(channel)
        }).catch(() => {
          chatClient.getChannelByUniqueName(this.state.channelName2).then((channel) => {
            console.log("getChannelByUniqueName second");
            resolve(channel)
          }).catch(() => {
            this.createGeneralChannel(chatClient)
          })
        })
      }).catch(() => reject(Error('Could not get channel list.')))
    })
  }

  joinChannel = (channel) => {
    return new Promise((resolve, reject) => {
      this.setState({ channel: channel })
      channel.join().then(() => {
        // this.addMessage({ body: 'Joined channel.. you can send messages' })
        window.addEventListener('beforeunload', () => channel.leave())
        resolve(channel)
      }).catch(() => reject(Error('Could not join general channel.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    console.log("createGeneralChannel called");
    return new Promise((resolve, reject) => {
      chatClient.createChannel({ uniqueName: this.state.channelName1, friendlyName: this.props.chatUser.first_name + " " + this.props.currentUser.first_name, type: 'private' })
        .then(() => {
          setTimeout(() => {
            this.checkChannel(chatClient)
            console.log("checkChannel", this.checkChannel)
          }, 1000);
        })
        .catch(() => reject(Error('Could not create general channel.')))
    })
  }

  getMessages = (channel) => {

    return new Promise((resolve, reject) => {
      channel.getMessages().then(function (response) {
        let allMessages = response.items
        console.log("allmessagess", allMessages)
        resolve(allMessages)
      })
        .catch(() => reject(Error('Could not get messages.')))
    });
  }

  addMessage = (message) => {
    console.log("message", message);
    const messageData = { ...message, me: message.author === this.state.username }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
  }

  

  handleNewMessage = () => {
    if (this.state.channel) {
      this.state.channel.sendMessage(this.input.value)
      this.input.value = ""
    }
  }



  configureChannelEvents = () => {
    let channel = this.state.channel
    channel.on('messageAdded', ({ author, body}) => {
      console.log("messageAdded")
      var moment = require('moment');
      let timestamp = moment().format();
      console.log("timestamp created", timestamp)
      this.addMessage({ author, body, timestamp: timestamp })
    })
   

    channel.on('memberJoined', (member) => {
      console.log("Member joined", member ) 
      this.addMessage({ body: `${member.identity} has joined the channel.` })
    })

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` })

    })

    //set up the listener for the typing started Channel event
    channel.on('typingStarted', function (member) {
      console.log("typingStarted");
      this.setState({
        isTyping:true
      })
    }.bind(this));

    //set  the listener for the typing ended Channel event
    channel.on('typingEnded', function (member) {
      console.log("typing ended")
      this.setState({
        isTyping: false
      })
    }.bind(this));

    let chatClient = this.state.client
    chatClient.on('channelAdded', function (channel) {
      console.log('Channel added: ' + channel.friendlyName);
    });
    // A channel is no longer visible to the Client
    chatClient.on('channelRemoved', function (channel) {
      console.log('Channel removed: ' + channel.friendlyName);
    });
    // A channel's attributes or metadata have changed.
    chatClient.on('channelUpdated', function (channel) {
      console.log('Channel updates: ' + channel.sid);
    });

    let user = chatClient.user;
    user.on('updated', event => this.handleUserUpdate(event.user, event.updateReasons));

  }


  //This method calls when user goes online/offline
  handleUserUpdate = (user, updateReasons) => {
    
      console.log("handleUserReachability", user, updateReasons)
    
  }


  inputFieldTextChanged(e) {
    if (e.keyCode === 13) { //return key
     // send 
    } else {
      let channel = this.state.channel
      channel.typing();
    }
  } 

  render() {
    var hidden = {
      display: this.state.shownToggle ? "block" : "none"
    }
    return (
      <div>
        <div className="msg_box" ref={(node) => (this.node = node)}  >
          <div onClick={this.toggle.bind(this)} className="msg_head">
            <div className="modal-body" >
              <h6> {this.props.chatUser.first_name}</h6>
            </div>
            <div className="close" onClick={() => this.props.onClose(this.props.chatUser)} style={{ color: 'white' }}>X</div>
          </div>
          <div style={hidden} className="msg_wrap"  >
            <div className="msg_body">
              <MessageList messages={this.state.messages} >  
              </MessageList>
              {this.state.isTyping ? (
                <p className="messagetyping">
                 {this.props.chatUser.first_name} is typing...
                </p>): (null)}
            </div>
          </div>
          <div class="panel-footer" rel="chatbox">
            <div className="input-group" >
              <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Write your message here..." onKeyDown={this.inputFieldTextChanged.bind(this)} ref={(node) => (this.input = node)}  />

              <span class="input-group-btn">
                <button class="btn btn-primary btn-sm" id="btn-chat" onClick={this.handleNewMessage} style={{ paddingTop: 7, paddingBottom: 7 }} >Send</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatAside;
