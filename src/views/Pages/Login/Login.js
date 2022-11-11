import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

import * as Constants from '../../../constants';


class Login extends Component {

  state = {
    on: false,
    newsItems: [],
    messageList: [],
    username: '',
    password: '',
    rememberMe: false,
    showError: false,
    isPasswordShown: false,
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  togglePasswordVisibility = () => {
    const {isPasswordShown} = this.state;
    this.setState(
      {
        isPasswordShown: !isPasswordShown
      }
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    let url = Constants.serverURL + '/login';
    axios.post(url, {
      headers: {
        'content-type': 'multipart/form-data, application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {

        let responseJson = res.data
        // console.log("login response", responseJson)
        let token = responseJson['token']
        let userID = responseJson['userID']
        if (token != null) {
          localStorage.clear()
          localStorage.setItem("access_token", 'Bearer ' + token)
          localStorage.setItem("userID", userID)

          this.props.history.push('/Home')
        } else {
          // show error 
          this.setState({
showError: true
          })
          // console.log("wrong credentials")
        }
      })
      .catch(err => console.log(err))
  };
  render() {
    const { isPasswordShown} = this.state
    return (
      <div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form className="md-form" onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input type="username" id='username' value={this.state.username} onChange={this.handleChange} required placeholder="username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input type={(isPasswordShown) ? "text" : "password"} id='password' value={this.state.password} onChange={this.handleChange} required placeholder="password" />
                          <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}onClick ={this.togglePasswordVisibility}></i>
                        </InputGroup>
                      {this.state.showError ? <WrongCredentials /> : null}
                        <Row>
                          <Col xs="6">

                            <div className="login">
                              <button>Login</button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    {/* <Image src="../../assets/img/avatars/background-image .jpeg" circle className="backgrounf-image" style={{ height: 200}} /> */}

                    <CardBody className="text-center">
                      <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

class WrongCredentials extends Component {
  render() {
    return (<div className="wrongCredentials">
      <p style={{ color: "red" }}>Invalid username or password</p>
    </div>);
  }
}

export default Login;
