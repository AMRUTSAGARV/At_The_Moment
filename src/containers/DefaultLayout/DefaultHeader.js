import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { AppSidebarToggler } from '@coreui/react';
import * as Constants from '../../constants';



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    on: false,
    newsItems: [],
    messageList: [],
    data: [],
    userlist: [],
    currentUser: []
  }

  componentDidMount = () => {
    let accessToken = localStorage.getItem('access_token');
    let currentUserId = localStorage.getItem('userID');
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
        // console.log("getCurrentUser response", responseJson.userDetails[0]);
        this.setState({
          currentUser: responseJson.userDetails[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Link to="/home">
          <Image src="../../assets/img/avatars/home-logo.png" circle className="home-logo" style={{ width: 100, height: 54, marginLeft: 20, marginRight: 20 }} />
        </Link>

        {/* <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/home" className="nav-link" >Home</NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down" >
            <DropdownToggle nav>
              <NavItem className="d-md-down">
                <NavLink to="#" className="nav-link">Task</NavLink>
              </NavItem>
            </DropdownToggle>
            <DropdownMenu right style={{ left: '-10px', top: 30 }}>

              <DropdownItem><NavItem className="px-3">
                <Link to="/TaskUpdate" className="nav-link">Task Update</Link>
              </NavItem>
              </DropdownItem>
              <DropdownItem><NavItem className="px-3">
                <Link to="/MyTask" className="nav-link">My Task</Link>
              </NavItem></DropdownItem>
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* <NavItem className="px-3">
            <Link to="/MyTask" className="nav-link">My Task</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/TaskUpdate" className="nav-link">Task Update</Link>
          </NavItem> */}
          <NavItem className="px-3">
            <Link to="/Leaves" className="nav-link">Leaves</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/Ftp" className="nav-link">Ftp</Link>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/Chatdata" className="nav-link">Chatdata</Link>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <NavItem className="d-md-down">
                <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
              </NavItem>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Notifications</strong></DropdownItem>
              <DropdownItem></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={this.state.currentUser.imageURL} className="img-avatar" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem> */}
              <DropdownItem><i className="fa fa-envelope-o"></i> Ftp<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              {/* <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
              {/* <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem> */}
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
