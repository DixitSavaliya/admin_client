import React, { Fragment } from 'react';
import Popup from './model';
import './popup.css';
import API from '../../../service';
import { EventEmitter } from '../../../event';
import history from '../../../history';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';
import {
    toast,
    Bounce
} from 'react-toastify';
import { HashRouter, Link, Route } from "react-router-dom";
import {
    faCalendarAlt,
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            showPopup: false,
            selectedFile: null,
            firstname:'',
            lastname:''
        };

        this.id = localStorage.getItem('userid');
        this.Logout = this.Logout.bind(this);
        this.path = "http://localhost/server/upload/";
        this.profilepic = localStorage.getItem('profilepic');

        EventEmitter.subscribe('profile', (event) => {
            console.log("profilepic=", event);
            localStorage.setItem('profilepic', event);
        });
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    componentDidMount() {
        /** Get Profile */
        API.getProfile({ id: this.id })
            .then((findresponse) => {
                console.log("getProfile response===", findresponse);
                this.setState({
                    selectedFile: findresponse.data.data.filename,
                    firstname:findresponse.data.data.first_name,
                    lastname:findresponse.data.data.last_name
                });
                localStorage.setItem('first_name', this.state.firstname);
                localStorage.setItem('last_name', this.state.lastname);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    Logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('profilepic');
        localStorage.removeItem('value');
        localStorage.removeItem('projectid');
        window.location.href = "/login";
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={this.path + localStorage.getItem('profilepic')} alt="" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            {/* <NavItem className="nav-item-header">
                                                Activity
                                            </NavItem> */}
                                            {/* <NavItem>
                                                <NavLink>
                                                    Chat
                                                </NavLink>
                                            </NavItem> */}
                                           
                                            {/* <NavItem className="nav-item-header">
                                                My Account
                                            </NavItem> */}
                                            <NavItem className="profile">
                                                <Link to="/myprofile">
                                                    My Profile
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={this.togglePopup.bind(this)}>Change Password</NavLink>
                                            </NavItem>
                                            {/* <NavItem>
                                                <NavLink>
                                                    Messages
                                                </NavLink>
                                            </NavItem> */}
                                            <NavItem>
                                                <NavLink onClick={this.Logout}>
                                                    Logout
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                    {this.state.showPopup ?
                                        <Popup
                                            text='Click "Close Button" to hide popup'
                                            closePopup={this.togglePopup.bind(this)}
                                        />
                                        : null
                                    }
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    Alina Mclourd
                                </div>
                                <div className="widget-subheading">
                                    VP People Manager
                                </div>
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                    id="Tooltip-1">
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt} />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;