import React, { Component } from 'react';
// import { NavLink, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
    
class Calender extends Component {

state = {
    showModal: false
  }

  handleClose = () =>{

    this.setState({
        showModal: true
                  })
  }
  handleClose = () =>{
    this.setState({
        handleShow: false
                  })
  
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Card>
                    <div className="container">

                        <CardHeader className="leaves-balanace">
                            <small className="leaves-data">Emails</small>
                        </CardHeader>
                        <CardBody>
                            <div className="mail-box">
                                <Progress className="sm-side">
                                <div className="user-head">
                          <a className="inbox-avatar" href="javascript:;">
                              <img  width="64" hieght="60" src="http://bootsnipp.com/img/avatars/ebeb306fd7ec11ab68cbcaa34282158bd80361a7.jpg" />
                          </a>
                          <div className="user-name">
                              <h5><a href="#">Alireza Zare</a></h5>
                              <span><a href="#">Info.Ali.Pci@Gmail.com</a></span>
                          </div>
                          <a className="mail-dropdown pull-right" href="javascript:;">
                              <i class="fa fa-chevron-down"></i>
                          </a>
                      </div>
                      <div className="inbox-body">
                
                          </div>

                                </Progress>
                            </div>
                        </CardBody>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Calender;
