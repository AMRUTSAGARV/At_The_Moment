import React, { Component } from 'react';
import { Card, CardBody, Col, Row, } from 'reactstrap';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import * as Constants from '../../constants';

let currentUserId = localStorage.getItem('userID');



class MyTask extends Component {
  state = {
    input: "",
    submit: ""
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      input: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const text = this.state.input;
    this.setState({
      submit: text
    });
  };

  componentDidMount = () => {


    axios.post(Constants.serverURL + '/admin/updateTask?userID=' + currentUserId, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(function (response) {
        //handle success
        const persons = response.data;
        this.setState({ persons });
        console.log(response)
        // console.log("success")
      })
      .catch(function (response) {
        //handle error
        console.log(response)
        // console.log("sorry")
      });
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <div className="container">
                  <div className="news-info">
                    <Col xs={12}>
                      <div class="news-data">
                        <div className="task-update">
                          <div className="task-image">
                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="task-pic" />
                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="task-pic" />
                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="task-pic" />

                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="task-pic" />
                          </div>

                          <div className="task-work">
                            <h4>My Work</h4>

                            <p>Create a Poster for all fruits</p>
                          </div>
                          <hr className="mt-0" />

                          <div className="task-changes">
                            <p><strong>Changes</strong> &nbsp; Create a Poster for all fruits</p>
                          </div>
                          <hr className="mt-0" />

                          <form onSubmit={this.handleReverse}>
                            <div>
                              <label> {this.state.input}</label>
                            </div>
                            <div class="leave-reply">
                              <input
                                type="text"
                                value={this.state.input}
                                onChange={this.handleChange}
                                placeholder="Leave Reply"
                                className="text-center" />
                              <div className="my-task-submit">
                                <button>Submit</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MyTask;
