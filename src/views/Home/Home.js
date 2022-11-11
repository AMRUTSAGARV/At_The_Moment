import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';


class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      on: false,
      newsItems: [],
      messageList: [],
      data: [],
      loading: true,
      person: null

    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  operation = () => {
    this.setState({
      on: !this.state.on
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <br></br>
                <Row>
                  <Col xs="12" md="8" xl="8">
                    <div>
                      <div className="news-info-data">
                        {/* <div>
        <div>{this.state.person.name.title}</div>
        <div>{this.state.person.name.first}</div>
        <div>{this.state.person.name.last}</div>
        <img src={this.state.person.picture.large} />
      </div> */}
                        <div className="progress-group mb-4">
                          <div className="progress-group-prepend">
                            <div className="avatar">
                              <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            </div>
                          </div>
                          <div className="progress-group-bars">
                            <div><p>Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                            </div>
                            {/* <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" md="4" xl="4">
                    <Row>
                      <Col sm="12">
                        <div className="Notice-borad-data">
                          <small className="text-muted">Notice Borad</small>
                          <div className="chart-wrapper">
                            <p>Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.  Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                            <p>Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.  Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>

                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                    <Row>
                      <Col sm="12">
                        <div className="quotations-data">
                          <small className="text-muted">Thought of the day</small>
                          <div className="chart-wrapper">
                            <h6>22/01/2020</h6>
                            <blockquote>
                              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat lacinia eleifend."</p>
                              <footer>-Charles <cite title="Source Title">website</cite></footer>
                            </blockquote>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Home;
