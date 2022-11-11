import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import * as Constants from '../../constants';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Moment from 'react-moment';





class LeavesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            PickerSelectedVal: '',
            reason: '',
            totalDaysCount: ''

        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

    }

    getDateFormat = (dateToConvert) => {

        return dateToConvert.getFullYear() + '-' + parseInt(dateToConvert.getMonth() + 1) + "-" + dateToConvert.getDate();
    }

    submitform = (e) => {
        let startDate = this.getDateFormat(this.state.startDate)
        let endDate = this.getDateFormat(this.state.endDate)
        console.log("date", startDate, endDate)

        let currentUserId = localStorage.getItem('userID');
        let accessToken = localStorage.getItem('access_token');
        e.preventDefault();

        let urls = Constants.serverURL + '/user/applyLeaves?userID=' + currentUserId;
        axios.post(urls, {
            headers: {
                'content-type': 'multipart/form-data, application/json',
                'Accept': 'application/json',
                'authorization': accessToken,
            },
            body: JSON.stringify({
                userID: currentUserId,
                leave_type: this.state.PickerSelectedVal,
                start_date: startDate,
                end_date: endDate,
                reason: this.state.reason

            })
        })
            .then(res => {
                console.log("postTaskStatus", JSON.stringify({
                    leave_type: this.state.PickerSelectedVal,
                    start_date: this.state.startDate,
                    end_date: this.state.endDate,
                    reason: this.state.reason

                }));
            })
            .catch(err => console.log(err))

    };

    handleChangeStart = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeEnd = date => {

        this.setState({
            endDate: date
        });
    };
    handletextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };



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
                let leaves = responseJson.remainingLeaves
                console.log("leaves",leaves)
                let latestLeave = leaves[0]
                console.log("latestLeave", latestLeave)
                this.setState({
                    totalDaysCount : latestLeave.totalLeaves
                    
                })

            })
            .catch((error) => {
                console.error(error);
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
                                    <div className="leaves-data-form">
                                        <form onSubmit={this.submitform}>
                                            <div className="task-leaves-info">
                                                <Row>
                                                    <Col xs={12} sm={6}>
                                                        <label for="FormControlSelect">Leaves Type</label>
                                                        <select class="form-control" id="PickerSelectedVal" selectedValue={this.state.PickerSelectedVal} onChange={this.handletextChange}>
                                                            <option value="1">Sick Leave</option>
                                                            <option value="2">Casual Leaves</option>
                                                            {/* <option>Work From Home</option>
                                                            <option>Paid Leaves</option>
                                                            <option>Unpaid Leaves</option> */}
                                                        </select>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <label for="FormControlSelect">Current Balance</label> <br></br>
                                                        <p><span >{this.state.totalDaysCount}</span></p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="task-leaves-info">
                                                <Row>
                                                    <Col xs={12} sm={6}>
                                                        <label for="FormControlCalender" className="label-data">Leave Starting From</label>
                                                        <div class='input-group date' id='datetimepicker2'>
                                                            {/* <input type="date"  onChange={this.handleChangeStart} value={this.state.startDate} format="yyyy-MM-dd"/> */}
                                                            {/* <input type="text" name="input" placeholder="YYYY-MM-DD" required pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" title="Enter a date in this format YYYY/MM/DD"/> */}

                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChangeStart}
                                                                dateFormat="yyyy-MM-dd"

                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <label for="FormControlCalender" className="label-data"> Leave Ending On</label>
                                                        <div class='input-group date' id='datetimepicker2'>
                                                            {/* <input type="date"  onChange={this.handleChangeEnd} value={this.state.endDate}/> */}
                                                            <DatePicker
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChangeEnd}
                                                                dateFormat="yyyy-MM-dd"
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {/* <div className="task-leaves-info">
                                                    <Row>
                                                        <Col xs={12} sm={6}>
                                                            <label for="FormControladdress" className="label-data"> Contact Address</label><br></br>
                                                            <textarea></textarea>
                                                        </Col>
                                                        <Col xs={12} sm={6}>
                                                            <label for="FormControlphone" className="label-data"> Phone No</label><br></br>
                                                            <input type="text" />
                                                        </Col>
                                                    </Row>
                                                </div> */}
                                            <div className="task-leaves-info">
                                                <Row>
                                                    <Col xs={12} sm={6}>
                                                        <label for="FormControladdress" className="label-data"> Reason For Leave </label><br></br>
                                                        <input type="text" style={{ marginLeft: 0, height: 50, marginBottom: 20, width: 200 }} id='reason' value={this.state.reason} onChange={this.handletextChange} required />

                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="button-submit text-center">
                                                <button className="btn-submit">Submit</button>
                                            </div>
                                        </form>
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

export default LeavesForm;