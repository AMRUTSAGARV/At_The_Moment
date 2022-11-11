import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row,  } from 'reactstrap';
import {  Image } from 'react-bootstrap';
// import {  NavItem, Nav } from 'react-bootstrap';

// import axios from 'axios';


class Ftp extends Component {
 

  render() {

    return (
      <div className="animated fadeIn">
            <Card>
                <div className="container">
{/* 
                <CardHeader className="leaves-balanace">
                    <small className="leaves-data">Calender</small>
                </CardHeader> */}
                    <CardBody>
                        <div className="ftp-task">
                            <Row>
                                <Col xs="12" md="12" xl="12">
                                    <form class="md-form">
                                        <Row>
                                            <Col sm="3">
                                                <label for="FormControlSelect">File Upload</label>
                                                <div class="upload-btn-wrapper">
                                                    <button class="upload-file">Upload file</button>
                                                    <input type="file" name="myfile" />
                                                </div>
                                            </Col>
                                            <Col sm="3">
                                                <label for="FormControlSelect">File name</label>
                                                <div class="upload-btn-wrapper">
                                                    <input type="text"  />
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div class="text-area-data">
                                                    <input type="text" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>

                                    <div className="my-task-submit">
                                      <button>Submit</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>


                        <div className="ftp-data-info">
                                        <div className="ftp-month-data">
                                            <h4>Jan-2020</h4>
                                        <div className="ftp-image">
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />

                                        </div>                       
                                        </div>
                                        <div className="ftp-month-data">
                                            <h4>Dec-2019</h4>
                                        <div className="ftp-image">
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />

                                        </div>                       
                                        </div>
                                        <div className="ftp-month-data">
                                            <h4>Nov-2019</h4>
                                        <div className="ftp-image">
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />
                                            <Image src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" rectangular className="ftp-pic" />

                                        </div>                       
                                        </div>

                                    </div>
                    </CardBody>
              </div>
            </Card>
          
      </div>
    )
  }
}

export default Ftp;
