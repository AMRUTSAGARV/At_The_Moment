import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { NavItem } from 'react-bootstrap';
import * as Constants from '../../constants';
import {
    ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject,
} from '@syncfusion/ej2-react-schedule';
import axios from 'axios';




class Leaves extends Component {
    constructor() {
        super(...arguments);
        this.calendarId = '5105trob9dasha31vuqek6qgp0@group.calendar.google.com';
        this.publicKey = 'AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg';
        this.state = {
            remainingLeaves: [],
            // days: '',
        };

    }
    onDataBinding(e) {
        let items = e.result.items;
        let scheduleData = [];
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                let event = items[i];
                let when = event.start.dateTime;
                let start = event.start.dateTime;
                let end = event.end.dateTime;
                if (!when) {
                    when = event.start.date;
                    start = event.start.date;
                    end = event.end.date;
                }
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: new Date(start),
                    EndTime: new Date(end),
                    IsAllDay: !event.start.dateTime
                });
            }
        }
        e.result = scheduleData;
    }

    componentDidMount = () => {
        let currentUserId = localStorage.getItem('userID');
        let accessToken = localStorage.getItem('access_token');

        fetch(Constants.serverURL + '/user/getRemainingLeaves?userID=' + currentUserId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': accessToken,
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.setState({
                    remainingLeaves: responseJson.remainingLeaves,

                })

                let { startDate, endDate } = this.state;
                startDate = (this.state.startDate);
                endDate = (this.state.endDate);
                // console.log(startDate);
                // console.log(endDate);
                const amount = endDate.diff(startDate, 'days');
                // console.log(amount);
                this.setState({
                    days: amount

                });

                // console.log(responseJson.remainingLeaves);
                // console.log(this.state.remainingLeaves);

            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {

        let userRemaimgleaves = this.state.remainingLeaves.map((remainingLeaves, index) => {
            return (
                <div className="leave-request-full-data">
                    <Row>
                        <Col xs="12" md="12" xl="12">
                            <Row>
                                <Col sm="4">
                                    <div className="leaves-request-data">
                                        <p><span>{remainingLeaves.startDate}</span>-<span>{remainingLeaves.endDate}</span></p>
                                        <h6>{remainingLeaves.leaveType}</h6>
                                        {/* <h6>Waiting for John</h6>
                                <h6>Cancelled by anee on 28-01-20</h6> */}
                                    </div>
                                </Col>
                                <Col sm="3">
                                    <div className="leave-request-days">
                                        <h6>  {this.state.days} days</h6>
                                    </div>
                                </Col>
                                <Col sm="3">
                                    <div className="leaves-request-applied">
                                        <h6>{remainingLeaves.startDate}</h6>
                                    </div>
                                </Col>
                                <Col sm="2">
                                    <div className="leaves-request-status">
                                        <h6>{remainingLeaves.appStatus}</h6>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            );
        });

        //   let numberOfNightsBetweenDates = (startDate, endDate) => {
        //     let start = new Date(startDate) //clone
        //     let end = new Date(endDate) //clone
        //     let dayCount = 0

        //     while (end > start) {
        //       dayCount++
        //       start.setDate(start.getDate() + 1)
        //     }

        //     return dayCount
        //   }

        return (
            <div className="animated fadeIn">
                <Card>
                    <div className="container">

                        <CardHeader className="leaves-balanace">
                            <small className="leaves-data">Calender</small>
                        </CardHeader>
                        <CardBody>
                            <div className="google-calender">
                                <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='550px' readonly={false} eventSettings={{ dataSource: this.dataManger }} dataBinding={this.onDataBinding.bind(this)}>
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                </ScheduleComponent>
                            </div>

                        </CardBody>
                    </div>
                </Card>


                <Card>
                    <div className="container">

                        <CardHeader className="leaves-balanace">
                            <small className="leaves-data">My Leave Balances</small>
                        </CardHeader>
                        <CardBody>
                            <div className="leave-request-full-data">
                                <Row>
                                    <Col xs="12" md="12" xl="12">
                                        <Row>
                                            <Col sm="6">
                                                <div className="leaves-planning">
                                                    <h6>Casual leaves:</h6>
                                                    <h6>Next year:</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leave-days">
                                                    <h6>8 days</h6>
                                                    <h6>22 days</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leaves-applied">
                                                    <NavItem className="px-3">
                                                        <NavLink to="/LeavesForm" className="nav-link" >
                                                            <button className="btn-data">Apply Leave</button>
                                                        </NavLink>
                                                    </NavItem>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="leave-request-full-data">
                                <Row>
                                    <Col xs="12" md="12" xl="12">
                                        <Row>
                                            <Col sm="6">
                                                <div className="leaves-planning">
                                                    <h6>Casual leaves:</h6>
                                                    <h6>Next year:</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leave-days">
                                                    <h6>8 days</h6>
                                                    <h6>22 days</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leaves-applied">
                                                    <NavItem className="px-3">
                                                        <NavLink to="/LeavesForm" className="nav-link" >
                                                            <button className="btn-data">Apply Leave</button>
                                                        </NavLink>
                                                    </NavItem>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="leave-request-full-data">
                                <Row>
                                    <Col xs="12" md="12" xl="12">
                                        <Row>
                                            <Col sm="6">
                                                <div className="leaves-planning">
                                                    <h6>Casual leaves:</h6>
                                                    <h6>Next year:</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leave-days">
                                                    <h6>8 days</h6>
                                                    <h6>22 days</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leaves-applied">
                                                    <NavItem className="px-3">
                                                        <NavLink to="/LeavesForm" className="nav-link" >
                                                            <button className="btn-data">Apply Leave</button>
                                                        </NavLink>
                                                    </NavItem>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="leave-request-full-data">
                                <Row>
                                    <Col xs="12" md="12" xl="12">
                                        <Row>
                                            <Col sm="6">
                                                <div className="leaves-planning">
                                                    <h6>Casual leaves:</h6>
                                                    <h6>Next year:</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leave-days">
                                                    <h6>8 days</h6>
                                                    <h6>22 days</h6>
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <div className="leaves-applied">
                                                    <NavItem className="px-3">
                                                        <NavLink to="/LeavesForm" className="nav-link" >
                                                            <button className="btn-data">Apply Leave</button>
                                                        </NavLink>
                                                    </NavItem>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </div>
                </Card>
                <Card>
                    <div className="container">

                        <CardHeader className="leaves-balanace">
                            <small className="leaves-data">My Recent Leave Requests</small>
                        </CardHeader>
                        <CardBody>
                            {userRemaimgleaves}
                        </CardBody>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Leaves;
