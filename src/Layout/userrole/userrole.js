import React, { Fragment } from 'react';
import API from '../../service';
import TableHover from '../Tables/TableHover';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput } from 'reactstrap';
import { EventEmitter } from '../../event';
// import FormsCustomControls from './CustomControls';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';
import './userrole.css';
import Swal from 'sweetalert2';

class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            statuscheck1: false,
            statuscheck2: false,
            userrole: '',
            userroleerror: '',
            status: '',
            statuserror: '',
            isDeleted: false,
            modal: false,
            emit: false,
            user: [],
            roleId: '',
            searchData: '',
            delete: false
        }
        this.checkAllHandler = this.checkAllHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userRoleData = this.userRoleData.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.editUserRoleData = this.editUserRoleData.bind(this);
        this.searchUserRoleDataKeyUp = this.searchUserRoleDataKeyUp.bind(this);
        this.deleteAllUserRoleData = this.deleteAllUserRoleData.bind(this);
        this.data = localStorage.getItem('isFetch');

        EventEmitter.subscribe('userroledata', (data) => {
            console.log("userroledata=", data.data.data);
            this.setState({
                checked: true
            })
            if (data.data.data.status == "active") {
                this.setState({
                    userrole: data.data.data.name,
                    statuscheck1: true
                })
            } else if (data.data.data.status == "inactive") {
                this.setState({
                    userrole: data.data.data.name,
                    statuscheck2: true
                })
            }
        });

        EventEmitter.subscribe('roleId', (id) => {
            this.setState({
                roleId: id,
                emit: true
            })
        });

        EventEmitter.subscribe('checked', (value) => {
            this.setState({
                delete: this.state.delete = true
            })
        });

        EventEmitter.subscribe('check', (value) => {
            this.setState({
                delete: this.state.delete = false
            })
        });
    }

    handleChangeEvent(e) {
        console.log("value", e.target.value);
        EventEmitter.dispatch('selectvalue', e.target.value);
    }

    componentDidMount() {
        API.getUserRoleData()
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getUserRoleData response===", findresponse);
                    this.setState({
                        user: findresponse.data.data
                    })
                    console.log("user response===", this.state.user);
                    // this.setState({
                    //     userrole: findresponse.data.data.name,
                    //     status: findresponse.data.data.status
                    // })
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    deleteAllUserRoleData() {
        this.setState({
            user: this.state.user.length = 0,
            isDeleted: this.state.isDeleted = true
        });
        EventEmitter.dispatch('isDeleted', this.state.isDeleted);
        Swal.fire("UserRoleAllData Deleted Successfully!", "", "success");
        window.location.href = "/userrole";
        console.log("deleteAllUserRoleData", this.state.user, this.state.isDeleted);
    }

    /** validation of login form */
    validate = () => {
        let userroleerror = "";
        let statuserror = "";

        if (!this.state.userrole) {
            userroleerror = "please enter userrole";
        }

        if (!this.state.status) {
            statuserror = "please enter status";
        }

        if (userroleerror || statuserror) {
            this.setState({ userroleerror, statuserror });
            return false;
        }
        return true;
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    checkAllHandler(event) {
        console.log("data", event.target.checked);
        if (event.target.checked == true) {
            this.setState({
                checked: true
            })
        } else {
            this.setState({
                checked: false
            })
        }
    }

    handleChange(event) {
        if (event.target.checked == true) {
            this.setState({
                checked: true
            })
        } else {
            this.setState({
                checked: false
            })
        }
    }

    handleChangeRole(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeStatus(event) {
        console.log("evalue",event.target.value);
        this.setState({
            status: event.target.value
        })
    }

    userRoleData() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                userrole: '',
                userroleerror: '',
                status: '',
                statuserror: ''
            })
        };

        if (this.state.userrole && this.state.status) {
            const obj = {
                name: this.state.userrole,
                status: this.state.status
            }
            console.log("obj", obj)
            API.addUserRole(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("addUserRole response===", findresponse);
                        Swal.fire("UserRole Added Successfully!", "", "success");
                        // this.componentDidMount();
                        window.location.href = "/userrole";
                    } else {
                        // console.log("err", err);
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            Swal.fire("PLease Enter Field First!", "", "warning");
        }
    }

    editUserRoleData() {
        console.log("status check",this.state.userrole,this.state.status);
        this.setState({
            checked: false
        })
        const obj = {
            name: this.state.userrole,
            status: this.state.status,
            id: this.state.roleId
        }
        API.editUserRole(obj)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("addUserRole response===", findresponse);
                    Swal.fire("UserRole Updated Successfully!", "", "success");
                    //   this.componentDidMount();
                    window.location.href = "/userrole";
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    searchUserRoleDataKeyUp(e) {
        console.log("event search key", e.target.value);
        API.searchUserData({ searchkey: e.target.value })
            .then((findresponse) => {
                if (findresponse) {
                    console.log("searchUserData response===", findresponse);
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    console.log("searchData response===", this.state.searchData);
                    EventEmitter.dispatch('searchData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    render() {
        return (
            this.state.user ? (
                <Fragment>
                    <AppHeader />
                    <div className="app-main">
                        <AppSidebar />
                        <div className="app-main__outer">
                            <div className="app-main__inner">
                                <div>
                                    <Row>
                                        <Col md="4">
                                            <Card className="main-card mb-3">
                                                <CardBody>
                                                    <CardTitle>UserRole:</CardTitle>
                                                    <form>
                                                        <label className="grey-text">
                                                            Role Name:
                                            </label>
                                                        <input
                                                            type="text"
                                                            name="userrole"
                                                            className="form-control"
                                                            value={this.state.userrole}
                                                            onChange={this.handleChangeRole}
                                                        />
                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                            {this.state.userroleerror}
                                                        </div>
                                                        <br />
                                                        <label className="grey-text">
                                                            Status:
                                            </label>
                                                        <br />
                                                        <div className="margin-lt">
                                                            {
                                                                this.state.checked == false ? (
                                                                    <div>
                                                                        <CustomInput type="radio" id="exampleCustomRadio" value="active" name="status" onChange={this.handleChangeStatus}
                                                                            label="Active" inline />
                                                                        <CustomInput type="radio" id="exampleCustomRadio1" value="inactive" name="status" onChange={this.handleChangeStatus}
                                                                            label="InActive" inline />
                                                                    </div>
                                                                ) : (
                                                                        <div>
                                                                            <CustomInput type="radio" id="exampleCustomRadio" value="active" name="status" checked={this.state.statuscheck1} onChange={this.handleChangeStatus}
                                                                                label="Active" inline />
                                                                            <CustomInput type="radio" id="exampleCustomRadio1" value="inactive" name="status" checked={this.state.statuscheck2} onChange={this.handleChangeStatus}
                                                                                label="InActive" inline />
                                                                        </div>
                                                                    )
                                                            }

                                                            {/* <input type="radio" name="status" value="active" onChange={this.handleChangeStatus} /> Active */}
                                                            {/* <input type="radio" name="status" value="inactive" onChange={this.handleChangeStatus} /> InActive */}
                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                {this.state.statuserror}
                                                            </div>
                                                        </div>
                                                        <div className="text-center mt-4">
                                                            {
                                                                this.state.emit == true ? (
                                                                    <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.editUserRoleData}>Update</Button>
                                                                ) : (
                                                                        <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.userRoleData}>Save</Button>
                                                                    )
                                                            }

                                                        </div>
                                                    </form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md="8">
                                            <Card className="main-card mb-3">
                                                <CardBody>
                                                    <CardTitle>UserRole Table:</CardTitle>
                                                    <div>
                                                        <Row>
                                                            <Col md="2">
                                                                <div className="right">
                                                                    <Button className="mb-2 mr-2" color="warning" onClick={this.deleteAllUserRoleData} disabled={!this.state.delete}>
                                                                        Delete
                                                                </Button>
                                                                </div>
                                                            </Col>
                                                            <Col md="4">
                                                                <div>
                                                                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" onKeyUp={this.searchUserRoleDataKeyUp} />
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="left">
                                                                    <span>Records per page</span>
                                                                    <CustomInput type="select" id="exampleCustomSelect"
                                                                        name="customSelect" onChange={this.handleChangeEvent}>
                                                                        <option value="2">2</option>
                                                                        <option value="4">4</option>
                                                                    </CustomInput>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <br />
                                                    <TableHover data={this.state.user} />
                                                    {/* <MDBDataTable
                                                    striped
                                                    bordered
                                                    small
                                                    data={data}
                                                /> */}

                                                </CardBody>
                                            </Card>

                                        </Col>
                                    </Row>
                                    {/* <FormsCustomControls/> */}
                                </div>
                            </div>
                            <AppFooter />
                        </div>
                    </div>
                </Fragment>
            ) : (
                    <Fragment>
                        <AppHeader />
                        <div className="app-main">
                            <AppSidebar />
                            <div className="app-main__outer">
                                <div className="app-main__inner">
                                    <div>
                                        <Row>
                                            <Col md="4">
                                                <Card className="main-card mb-3">
                                                    <CardBody>
                                                        <CardTitle>UserRole:</CardTitle>
                                                        <form>
                                                            <label className="grey-text">
                                                                Role Name:
                                            </label>
                                                            <input
                                                                type="text"
                                                                name="userrole"
                                                                className="form-control"
                                                                value={this.state.userrole}
                                                                onChange={this.handleChangeRole}
                                                            />
                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                {this.state.userroleerror}
                                                            </div>
                                                            <br />
                                                            <label className="grey-text">
                                                                Status:
                                            </label>
                                                            <br />
                                                            <div className="margin-lt">
                                                                {
                                                                    this.state.checked == false ? (
                                                                        <div>
                                                                            <CustomInput type="radio" id="exampleCustomRadio" value="active" name="status" onChange={this.handleChangeStatus}
                                                                                label="Active" inline />
                                                                            <CustomInput type="radio" id="exampleCustomRadio1" value="inactive" name="status" onChange={this.handleChangeStatus}
                                                                                label="InActive" inline />
                                                                        </div>
                                                                    ) : (
                                                                            <div>
                                                                                <CustomInput type="radio" id="exampleCustomRadio" name="status" checked={this.state.statuscheck1} onChange={this.handleChangeStatus}
                                                                                    label="Active" inline />
                                                                                <CustomInput type="radio" id="exampleCustomRadio1" name="status" checked={this.state.statuscheck1} onChange={this.handleChangeStatus}
                                                                                    label="InActive" inline />
                                                                            </div>
                                                                        )
                                                                }

                                                                {/* <input type="radio" name="status" value="active" onChange={this.handleChangeStatus} /> Active */}
                                                                {/* <input type="radio" name="status" value="inactive" onChange={this.handleChangeStatus} /> InActive */}
                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                    {this.state.statuserror}
                                                                </div>
                                                            </div>
                                                            <div className="text-center mt-4">
                                                                {
                                                                    this.state.emit == true ? (
                                                                        <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.editUserRoleData}>Update</Button>
                                                                    ) : (
                                                                            <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.userRoleData}>Save</Button>
                                                                        )
                                                                }

                                                            </div>
                                                        </form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col md="8">
                                                <Card className="main-card mb-3">
                                                    <CardBody>
                                                        <CardTitle>UserRole Table:</CardTitle>
                                                        <div>
                                                            <Row>
                                                                <Col md="2">
                                                                    <div className="right">
                                                                        <Button className="mb-2 mr-2" color="warning" onClick={this.deleteAllUserRoleData}>
                                                                            Delete
                                                                </Button>
                                                                    </div>
                                                                </Col>
                                                                <Col md="4">
                                                                    <div>
                                                                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onKeyUp={this.searchUserRoleDataKeyUp} />
                                                                    </div>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="left">
                                                                        <span>Records per page</span>
                                                                        <CustomInput type="select" id="exampleCustomSelect"
                                                                            name="customSelect" onChange={this.handleChangeEvent}>
                                                                            <option value="2">2</option>
                                                                            <option value="4">4</option>
                                                                        </CustomInput>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <br />
                                                        <TableHover />
                                                        {/* <MDBDataTable
                                                    striped
                                                    bordered
                                                    small
                                                    data={data}
                                                /> */}

                                                    </CardBody>
                                                </Card>

                                            </Col>
                                        </Row>
                                        {/* <FormsCustomControls/> */}
                                    </div>
                                </div>
                                <AppFooter />
                            </div>
                        </div>
                    </Fragment>
                )

        );
    }
}


export default UserRole;