import React, { Component } from 'react';
import { Card, CardBody, Col, Row, } from 'reactstrap';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import * as Constants from '../../constants';


window.onload = function () {
  document.getElementById("selectdate").onchange = function () {
    document.getElementById("selecttask").value = this.options[this.selectedIndex].getAttribute("data-sync");
  }
  document.getElementById("selectdate").onchange(); // trigger when loading
}

// function change() {
//   if(document.getElementById('selectdate').value=='{datatasks["assigned_date"]}')
//   document.getElementById("selecttask").value='{datatasks["taskID"]}';
// };

class TaskUpdate extends Component {
  state = {
    tasks: [],
    PickerSelectedVal: '0',
    image: '',
    content: '',
    file: null,
    currenttask: '',
    reason: '',
    selectedTaskID: '',
  }

  handleTaskselect(e) {
    this.setState({
      selectedTaskID: e.target.value
    })
  }
  componentDidMount = () => {
    let currentUserId = localStorage.getItem('userID');
    let accessToken = localStorage.getItem('access_token');

    fetch(Constants.serverURL + '/user/getRecentTasks?userID=' + currentUserId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken,
        'Accept': 'application/json; charset=UTF-8',

      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        this.setState({
          tasks: responseJson.recentTasks,
        });

      })
      .catch((error) => {
        // console.error(error);
      });
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    console.log("handle Image change", e.target.files[0])
    this.setState({
      image: e.target.files[0]
    })
  };


  submitform = (e) => {
    let currentUserId = localStorage.getItem('userID');
    let accessToken = localStorage.getItem('access_token');
    e.preventDefault();
    console.log(this.state);
    let urls = Constants.serverURL + '/user/postTaskStatus?userID=' + currentUserId;
    axios.post(urls, {
      headers: {
        'content-type': 'multipart/form-data, application/json',
        'Accept': 'application/json',
        'authorization': accessToken,
      },
      body: JSON.stringify({
        userID: currentUserId,
        taskID: this.state.selectedTaskID,
        status: this.state.PickerSelectedVal,
        user_files: this.state.image,
        user_comments: this.state.reason

      })
    })
      .then(res => {
        console.log("postTaskStatus", JSON.stringify({
          userID: currentUserId,
          taskID: 3,
          status: this.state.PickerSelectedVal,
          user_files: this.state.image,
          user_comments: this.state.reason

        }));
      })
      .catch(err => console.log(err))

  };

  handletextChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };



  handleFile(e) {
    console.log(e.target.files, 'image ')
    let file = e.target.files[0]
    this.setState({
      file: file
    })
  }

  //   handletextChange = (e) => {
  //     this.setState({
  //         [e.target.id]: e.target.value
  //     })
  // };

  render() {

    let persontaskdate = this.state.tasks.map((datatasks, index) => {
      return (
        <option value={datatasks["assigned_date"]} key={datatasks.assignedDate} data-sync={datatasks.description}>{datatasks.assignedDate}</option>
      );
    });

    let persontaskdescrip = this.state.tasks.map((datatasks, index) => {
      console.log("each datatask", datatasks)
      return (

        <option value={datatasks["taskID"]} key={datatasks.description}>{datatasks.description}</option>
      );
    });


    let persontaskstatusdata = this.state.tasks.map((datatasks, index) => {
      return (
        <div className="get-task-status">
          <Row>
            <Col xs="12" md="12" xl="12">
              <Row>
                <Col sm="2">
                  <div className="leaves-request-data">
                    <h6> {datatasks.assignedDate}</h6>
                  </div>
                </Col>
                <Col sm="2">
                  <div className="leave-request-days">
                    <h6>{datatasks.adminComments}</h6>
                  </div>
                </Col>
                <Col sm="2">
                  <div className="leaves-request-applied">
                    <h6>{datatasks.description}</h6>
                  </div>
                </Col>
                <Col sm="2">
                  <div className="leaves-request-status">
                    <h6>{datatasks.userComments}</h6>
                  </div>
                </Col>
                <Col sm="2">
                  <div className="leaves-request-status">
                    <h6>{datatasks.status} </h6>
                  </div>
                </Col>
                {/* <Col sm="2">
                  <div className="leaves-request-status">
                    <Image src={datatasks.user_files} rectangular className="work-pic" />
                  </div>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <div className="container">
                  <div className="assigned-data">
                    <Row>
                      <Col>
                        <Row>
                          <Col sm="6">
                            <div className="task-data">
                              <label>Date: </label>
                              <select id="selectdate" onChange={this.handleTaskselect.bind(this)} name="selectdate" style={{marginLeft:90}}>
                                <option>-- None --</option>
                                {persontaskdate}
                              </select>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="task-data">
                              <label>Industry Type: </label>
                              <select style={{ marginLeft: 69 }}>
                                <option>-- None --</option>
                                <option>Finance</option>
                                <option>EV Motors</option>
                                <option>Agriculture</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6">
                            <div className="task-data">
                              <label>Product/Service: </label>
                              <select id="selecttask" onChange={this.handleTaskselect.bind(this)} name="selecttask">
                              <option>-- None --</option>
                              {persontaskdescrip}
                              </select>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="task-data">
                              <label>Assigned Department: </label>
                              <select>
                              <option>-- None --</option>
                              <option>Assigned Works</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  <hr className="mt-0" />

                  <form onSubmit={this.submitform}>
                    <div className="task-info-data">
                      <Row>
                        <Col xs={12} sm={6} style={{ display: 'flex' }}>
                          <label for="FormControlSelect">Task Type</label>
                          <select class="form-control" id="PickerSelectedVal" selectedValue={this.state.PickerSelectedVal} onChange={this.handletextChange}>
                            <option value="0">My Task Status</option>
                            <option value="1">Completed Task</option>
                            <option value="4">Incompleted Task</option>
                            {/* <option>Work From Home</option>
                                <option>Paid Leaves</option>
                                <option>Unpaid Leaves</option> */}
                          </select>
                        </Col>
                        <Col xs={12} sm={6}>
                          {/* <div className="upload-btn-wrapper">
                          <button className="upload-button">Upload file</button>
                          <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                        </div> */}
                          <div>
                            <input type="file" id="image"
                              accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="task-des-info" style={{ display: 'flex' }}>
                      <label> Working Task</label><br></br>
                      <input type="text" id='reason' value={this.state.reason} onChange={this.handletextChange} required style={{ width: '90%' }} />
                    </div>
                    <div className="button-submit text-center">
                      <button className="btn-submit">Submit</button>
                    </div>
                  </form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <div className="container">
                  <div className="assigned-data">
                    <div className="assigned-work">
                      <h6>Work Progress</h6>
                    </div>
                  </div>
                  <hr className="mt-0" />
                  <div className="get-task-updates">
                    <Row>
                      <Col xs="12" md="12" xl="12">
                        <Row>
                          <Col sm="2">
                            <div className="get-task-updates-date">
                              <h6> Date</h6>
                            </div>
                          </Col>
                          <Col sm="2">
                            <div className="get-task-updates-data">
                              <h6>Admin Comments</h6>
                            </div>
                          </Col>
                          <Col sm="2">
                            <div className="get-task-updates-data">
                              <h6>Task Description</h6>
                            </div>
                          </Col>
                          <Col sm="2">
                            <div className="get-task-updates-data">
                              <h6>Task Comments</h6>
                            </div>
                          </Col>
                          <Col sm="2">
                            <div className="get-task-updates-data">
                              <h6>Task Status</h6>
                            </div>
                          </Col>
                          {/* <Col sm="2">
                  <div className="get-task-updates-data">
                    <Image src={datatasks.user_files} rectangular className="work-pic" />
                  </div>
                </Col> */}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                  {persontaskstatusdata}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TaskUpdate;
