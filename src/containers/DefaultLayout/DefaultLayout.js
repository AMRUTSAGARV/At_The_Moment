import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { Image } from 'react-bootstrap';
import $ from 'jquery'
import TwilioChat from 'twilio-chat'


import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import * as Constants from '../../constants';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const ChatAside = React.lazy(() => import('./ChatAside'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    localStorage.clear()
    sessionStorage.clear()

    e.preventDefault()
    this.props.history.push('/login')
  }
  constructor() {
    super();
    this.state = {
      on: false,
      newsItems: [],
      messageList: [],
      data: [],
      userlist: [],
      currentUser: [],
      showBox: false,
      chatUsers: [],
      chatWindows: [],
      chatClient: null

    };

  }

  operation = (user) => {
    // Checking user is already in chatUsers
    for (var i = 0; i < this.state.chatUsers.length; i++) {
      let tempUser = this.state.chatUsers[i]
      if (tempUser.username === user.username) {
        return;
      }
    }
    let temp1 = [...this.state.chatUsers, user]
    this.setState({
      chatUsers: temp1
    });

    this.setState({ showBox: true }, () => {
      document.addEventListener('click', this.closeBox);

    });


  }

  closeChatBox = (user) => {
    console.log("chatuser called", user)
    // this.setState({ showBox: false });
    var array = this.state.chatUsers;
    var index = -1
    for (var i = 0; i < array.length; i++) {
      let tempUser = array[i]
      console.log("username check", tempUser.username, user.username);
      if (tempUser.username === user.username) {
        index = i;
        break;
      }
    }
    console.log("index called", index, array)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ chatUsers: array });
    }
  }

  componentDidMount = () => {
    this.getCurrentUser()
    this.getAllUsers();
  }

  componentWillUnmount = () => {
    console.log("component will unmount")
    // this.updateReachability(false)
  }

  initializeChat = () => {
    this.getChatToken()
      .then(this.createChatClient)
      .then((client) => {
        this.setState({
          chatClient: client
        })
        let user = client.user
        user.on('updated', event => {
          console.log("user reachability updated", event);
        });
      }
      )
    // .then(this.updateReachability(true))
  }

  getChatToken = () => {
    console.log("getChatToken called with user", this.state.currentUser)
    return new Promise((resolve, reject) => {

      $.getJSON(Constants.serverURL + '/token?identity=' + (this.state.currentUser.first_name + " " + this.state.currentUser.last_name), (response) => {
        console.log("get token response", response)
        resolve(response.token)
      }).fail(() => {
        reject(Error('Failed to connect.'))
      })

    })
  }
  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(token))
    })
  }


  //reachability is boolean true/false online/offline 
  // updateReachability = (reachability) => {
  //   let endpoint = ""
  //   if (reachability) {
  //     endpoint = "/enableReachability"
  //   } else {
  //     endpoint = "/disableReachability"
  //   }

  //   fetch(Constants.serverURL + endpoint, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   })
  //     .then((response) => {
  //       console.log("updateReachability response", response.json());
  //     })
  // }

  getCurrentUser() {
    // return new Promise((resolve, reject) => {
      let accessToken = localStorage.getItem('access_token');
      let currentUserId = localStorage.getItem('userID');
      console.log("getCurrentUser for userID", currentUserId)
      fetch(Constants.serverURL + '/user/getUser?userID=' + currentUserId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': accessToken,
          'Accept': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("getCurrentUser response", responseJson.userDetails[0]);
          this.setState({
            currentUser: responseJson.userDetails[0],
          });
          this.initializeChat()
          // resolve()
        })
        .catch((error) => {
          console.error(error);
          // reject(Error('Could not get current user.'))
        // });
    });
  }

  getAllUsers() {
    let accessToken = localStorage.getItem('access_token');
    let currentUserId = localStorage.getItem('userID');

    fetch(Constants.serverURL + '/user/getUserList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken,
        'Accept': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let users = responseJson.userList.filter(function (user) {
          return user.userID != currentUserId
        });
        // console.log("filtered user ", users)
        this.setState({
          userlist: users

        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    // Constructing side list view
    let usersListUI = this.state.userlist.map((user, index) => {
      return (
        <div className="profile-chat">
          <br></br>
          <div className="chat-data">
            <div className="data-info" id="sidebar-user-box">
              <Link id="addClass" onClick={() => this.operation(user)}>
                <Image src={user.imageURL} circle className="user-pic" />
                <span id="slider-username" className="data-user">{user.first_name} {user.last_name} </span>
                <span className="data-desg">{user.designation}</span>
              </Link>
            </div>
          </div>
        </div>
      );
    });

    // Construction of active chat windows
    let r = 50
    let w = 340
    let chatWindowUI = this.state.chatUsers.map((chatUser, index) => {
      r = r + w
      return (
        <div style={{ right: r, position: "fixed", width: { w } }}>
          <ChatAside chatUser={chatUser} currentUser={this.state.currentUser} chatClient={this.state.chatClient} onClose={(user) => this.closeChatBox(user)} >
          </ChatAside>
        </div>
      );

    });


    // Actual render begins here
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}>
                <div className="profile-header">

                  <div className="profile-text text-center">
                    <Image src={this.state.currentUser.imageURL} circle className="profile-pic" />
                    <div className="user-info">
                      <span className="user-name"> {this.state.currentUser.first_name} {this.state.currentUser.last_name}
                      </span><br></br>
                      <span className="user-desg">{this.state.currentUser.designation}</span> <br>
                      </br>

                    </div>
                  </div>

                  <div className="chat-box">
                    <div className="chat-info text-center">
                      <h5>Chat</h5>
                    </div>
                  </div>
                  <div className="profile-data">
                    <span>{usersListUI}</span>
                  </div>
                </div>

              </AppSidebarNav>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        <div>
          {this.state.showBox ? (
            <div>
              {chatWindowUI}
            </div>) : (null)}
        </div>

      </div>
    );
  }
}

export default DefaultLayout;
