import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import TableResponsive from '../Tables/TableResponsive';
import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput
} from 'reactstrap';
import '../userrole/userrole.css';

class UserRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            userright: '',
            userrighterror: '',
            status: '',
            statuserror: '',
            module: '',
            moduleerror: '',
            userdata: []
        }
        this.checkAllHandler = this.checkAllHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.deleteAllUserRightData = this.deleteAllUserRightData.bind(this);
        this.userRightData = this.userRightData.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.editUserRightData = this.editUserRightData.bind(this);
        this.searchUserRightDataKeyUp = this.searchUserRightDataKeyUp.bind(this);

        EventEmitter.subscribe('userrightdata', (data) => {
            console.log("userrightdata=", data.data.data);
            this.setState({
                checked: true
            })
            if (data.data.data.status == "active") {
                this.setState({
                    userright: data.data.data.name,
                    module: data.data.data.module,
                    statuscheck1: this.state.statuscheck1 = true,
                    status: this.state.status = "active"
                })
            } else if (data.data.data.status == "inactive") {
                this.setState({
                    userright: data.data.data.name,
                    module: data.data.data.module,
                    statuscheck2: this.state.statuscheck1 = true,
                    status: this.state.status = "inactive"
                })
            }
        });

        EventEmitter.subscribe('roleid', (id) => {
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

    componentDidMount() {
        API.getUserRightData()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        userdata: findresponse.data.data
                    })
                    console.log("user response===", this.state.userdata);
                    EventEmitter.dispatch('userrightdataget', this.state.userdata);
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    checkAllHandler(event) {
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

    handleChangeEvent(e) {
        EventEmitter.dispatch('selectval', e.target.value);
    }

    handleChangeRole(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeStatus(event) {
        this.setState({
            status: event.target.value
        })
    }


    /** validation of login form */
    validate = () => {
        let userrighterror = "";
        let statuserror = "";
        let moduleerror = "";

        if (!this.state.userright) {
            userrighterror = "please enter userright name";
        }

        if (!this.state.module) {
            moduleerror = "please enter module name";
        }

        if (!this.state.status) {
            statuserror = "please select status";
        }

        if (userrighterror || statuserror || moduleerror) {
            this.setState({ userrighterror, statuserror, moduleerror });
            return false;
        }
        return true;
    };

    userRightData() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userright: '',
                userrighterror: '',
                status: '',
                statuserror: '',
                module: '',
                moduleerror: ''
            })

            if (this.state.userright && this.state.status && this.state.module) {
                const obj = {
                    name: this.state.userright,
                    module: this.state.module,
                    status: this.state.status
                }
                API.addUserRight(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            Swal.fire("UserRight Added Successfully!", "", "success");
                            this.componentDidMount();
                        } else {
                            // console.log("err", err);
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter filed first!", "", "warning");
            }
        };
    }

    editUserRightData() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                userright: '',
                userrighterror: '',
                status: '',
                statuserror: '',
                module: '',
                moduleerror: ''
            })
            if (this.state.userright && this.state.status && this.state.module && this.state.roleId) {
                this.setState({
                    checked: false
                })
                const obj = {
                    name: this.state.userright,
                    status: this.state.status,
                    module: this.state.module,
                    id: this.state.roleId
                }
                API.editUserRight(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            Swal.fire("UserRight Updated Successfully!", "", "success");
                            this.componentDidMount();

                        } else {
                            // console.log("err", err);
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter filed first!", "", "warning");
            }
        };

    }

    deleteAllUserRightData() {
        this.setState({
            userdata: this.state.userdata.length = 0,
            isDeleted: this.state.isDeleted = true
        });
        EventEmitter.dispatch('isDeletedKey', this.state.isDeleted);
        Swal.fire("UserRightAllData Deleted Successfully!", "", "success");
        window.location.href = "/userright";
    }

    searchUserRightDataKeyUp(e) {
        API.searchUserRightData({ searchkey: e.target.value })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    EventEmitter.dispatch('searchUserData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    render() {

        return (
            <div>
                {
                    this.state.userdata ? (
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
                                                            <CardTitle><b>User-Right:</b></CardTitle>
                                                            <form>
                                                                <label className="grey-text">
                                                                    Right Name:
                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="userright"
                                                                    className="form-control"
                                                                    value={this.state.userright}
                                                                    onChange={this.handleChangeRole}
                                                                />
                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                    {this.state.userrighterror}
                                                                </div>
                                                                <br />
                                                                <label className="grey-text">
                                                                    Module Name:
                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="module"
                                                                    className="form-control"
                                                                    value={this.state.module}
                                                                    onChange={this.handleChangeRole}
                                                                />
                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                    {this.state.moduleerror}
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
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio"
                                                                                    value="active"
                                                                                    name="status"
                                                                                    onChange={this.handleChangeStatus}
                                                                                    label="Active" inline
                                                                                />
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio1"
                                                                                    value="inactive"
                                                                                    name="status"
                                                                                    onChange={this.handleChangeStatus}
                                                                                    label="InActive" inline
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                                <div>
                                                                                    <CustomInput
                                                                                        type="radio"
                                                                                        id="exampleCustomRadio"
                                                                                        name="status"
                                                                                        checked={this.state.statuscheck1}
                                                                                        onChange={this.handleChangeStatus}
                                                                                        label="Active"
                                                                                        inline
                                                                                    />
                                                                                    <CustomInput
                                                                                        type="radio"
                                                                                        id="exampleCustomRadio1"
                                                                                        name="status"
                                                                                        checked={this.state.statuscheck2}
                                                                                        onChange={this.handleChangeStatus}
                                                                                        label="InActive" inline />
                                                                                </div>
                                                                            )
                                                                    }
                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                        {this.state.statuserror}
                                                                    </div>
                                                                </div>
                                                                <div className="text-center mt-4">
                                                                    {
                                                                        this.state.emit == true ? (
                                                                            <Button
                                                                                className="mb-2 mr-2"
                                                                                color="primary"
                                                                                type="button"
                                                                                onClick={this.editUserRightData}
                                                                            >
                                                                                Update
                                                                            </Button>
                                                                        ) : (
                                                                                <Button
                                                                                    className="mb-2 mr-2"
                                                                                    color="primary"
                                                                                    type="button"
                                                                                    onClick={this.userRightData}
                                                                                >
                                                                                    Save
                                                                                </Button>
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
                                                            <CardTitle><b>User-Right Table:</b></CardTitle>
                                                            <div>
                                                                <Row>
                                                                    <Col md="2">
                                                                        <div className="right">
                                                                            <Button
                                                                                className="mb-2 mr-2"
                                                                                color="warning"
                                                                                onClick={this.deleteAllUserRightData}
                                                                                disabled={!this.state.delete}>
                                                                                Delete
                                                                    </Button>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="4">
                                                                        <div>
                                                                            <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                placeholder="Search"
                                                                                aria-label="Search"
                                                                                onKeyUp={this.searchUserRightDataKeyUp}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <div className="left">
                                                                            <span>Records per page</span>
                                                                            <CustomInput
                                                                                type="select"
                                                                                id="exampleCustomSelect"
                                                                                name="customSelect"
                                                                                onChange={this.handleChangeEvent}
                                                                            >
                                                                                <option value="2">2</option>
                                                                                <option value="4">4</option>
                                                                            </CustomInput>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <br />
                                                            <TableResponsive sendData={this.state.userdata} />
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
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
                                                                <CardTitle>User-Right:</CardTitle>
                                                                <form>
                                                                    <label className="grey-text">
                                                                        Right Name:
                                                </label>
                                                                    <input
                                                                        type="text"
                                                                        name="userright"
                                                                        className="form-control"
                                                                        value={this.state.userright}
                                                                        onChange={this.handleChangeRole}
                                                                    />
                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                        {this.state.userrighterror}
                                                                    </div>
                                                                    <br />
                                                                    <label className="grey-text">
                                                                        Module Name:
                                                </label>
                                                                    <input
                                                                        type="text"
                                                                        name="module"
                                                                        className="form-control"
                                                                        value={this.state.module}
                                                                        onChange={this.handleChangeRole}
                                                                    />
                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                        {this.state.moduleerror}
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
                                                                                    <CustomInput
                                                                                        type="radio"
                                                                                        id="exampleCustomRadio" v
                                                                                        alue="active"
                                                                                        name="status"
                                                                                        onChange={this.handleChangeStatus}
                                                                                        label="Active"
                                                                                        inline
                                                                                    />
                                                                                    <CustomInput
                                                                                        type="radio"
                                                                                        id="exampleCustomRadio1"
                                                                                        value="inactive"
                                                                                        name="status"
                                                                                        onChange={this.handleChangeStatus}
                                                                                        label="InActive"
                                                                                        inline
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                    <div>
                                                                                        <CustomInput
                                                                                            type="radio"
                                                                                            id="exampleCustomRadio"
                                                                                            name="status"
                                                                                            checked={this.state.statuscheck1} onChange={this.handleChangeStatus}
                                                                                            label="Active"
                                                                                            inline
                                                                                        />
                                                                                        <CustomInput
                                                                                            type="radio"
                                                                                            id="exampleCustomRadio1"
                                                                                            name="status"
                                                                                            checked={this.state.statuscheck2} onChange={this.handleChangeStatus}
                                                                                            label="InActive"
                                                                                            inline
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                        }
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.statuserror}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-center mt-4">
                                                                        {
                                                                            this.state.emit == true ? (
                                                                                <Button
                                                                                    className="mb-2 mr-2"
                                                                                    color="primary"
                                                                                    type="button"
                                                                                    onClick={this.editUserRightData}
                                                                                >
                                                                                    Update
                                                                                </Button>
                                                                            ) : (
                                                                                    <Button
                                                                                        className="mb-2 mr-2"
                                                                                        color="primary"
                                                                                        type="button"
                                                                                        onClick={this.userRightData}
                                                                                    >
                                                                                        Save
                                                                                    </Button>
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
                                                                <CardTitle>User-Right Table:</CardTitle>
                                                                <div>
                                                                    <Row>
                                                                        <Col md="2">
                                                                            <div className="right">
                                                                                <Button
                                                                                    className="mb-2 mr-2"
                                                                                    color="warning"
                                                                                    onClick={this.deleteAllUserRoleData}
                                                                                    disabled={!this.state.delete}
                                                                                >
                                                                                    Delete
                                                                    </Button>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="4">
                                                                            <div>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    placeholder="Search"
                                                                                    aria-label="Search"
                                                                                    onKeyUp={this.searchUserRoleDataKeyUp}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="6">
                                                                            <div className="left">
                                                                                <span>Records per page</span>
                                                                                <CustomInput
                                                                                    type="select"
                                                                                    id="exampleCustomSelect"
                                                                                    name="customSelect"
                                                                                    onChange={this.handleChangeEvent}
                                                                                >
                                                                                    <option value="2">2</option>
                                                                                    <option value="4">4</option>
                                                                                </CustomInput>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <br />
                                                                <TableResponsive />
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <AppFooter />
                                    </div>
                                </div>
                            </Fragment>
                        )
                }
            </div>

        );
    }
}


export default UserRight;