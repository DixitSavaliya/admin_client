import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import TableHover from '../Tables/TableHover';
import API from '../../service';
import Swal from 'sweetalert2';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { MDBInput, MDBFormInline } from 'mdbreact';
import { MDBDataTable } from 'mdbreact';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import FormsCustomControls from './CustomControls';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,CustomInput
} from 'reactstrap';
// import {Button} from 'reactstrap';
import '../userrole/userrole.css';

class UserRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:false,
            userright:'',
            status:'',
            module:''
        }
        this.checkAllHandler = this.checkAllHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userRightData = this.userRightData.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    checkAllHandler(event) {
        console.log("data",event.target.checked);
        if(event.target.checked == true) {
            this.setState({
                checked:true
            })
        } else {
            this.setState({
                checked:false
            })
        }
        // var checkbox = document.getElementsByName('select');
        // if(event.target.checked) {
        //     for (var i in checkbox) {
        //         if(checkbox[i].checked == false) {
        //             checkbox[i].checked == true;
        //         }
        //     }
        // } else {
        //     for (var i in checkbox) {
        //         if(checkbox[i].checked == true) {
        //             checkbox[i].checked == false;
        //         }
        //     }
        // }
    }

    handleChange(event) {
         console.log("data",event.target.checked);
        if(event.target.checked == true) {
            this.setState({
                checked:true
            })
        } else {
            this.setState({
                checked:false
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
        console.log("event",event.target.value)
        this.setState({
            status:event.target.value
        })
    }

    userRightData() {
        console.log("data",this.state.userright,this.state.module,this.state.status);
        const obj = {
            name: this.state.userright,
            module:this.state.module,
            status: this.state.status
        }
        API.addUserRight(obj)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("addUserRight response===", findresponse);
                    Swal.fire("UserRight Added Successfully!", "", "success");
                    // this.componentDidMount();
                    // window.location.href = "/userrole";
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }


    render() {

        return (
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
                                                    Right Name:
                                    </label>
                                                <input
                                                    type="text"
                                                    name="userright"
                                                    className="form-control"
                                                    value={this.state.userright}
                                                    onChange={this.handleChangeRole}
                                                />
                                                {/* <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.userroleerror}
                                                </div> */}
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
                                                {/* <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.userroleerror}
                                                </div> */}
                                                <br/>
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
                                                                    <CustomInput type="radio" id="exampleCustomRadio1" name="status" checked={this.state.statuscheck2} onChange={this.handleChangeStatus}
                                                                        label="InActive" inline />
                                                                </div>
                                                            )
                                                    }

                                                    {/* <input type="radio" name="status" value="active" onChange={this.handleChangeStatus} /> Active */}
                                                    {/* <input type="radio" name="status" value="inactive" onChange={this.handleChangeStatus} /> InActive */}
                                                    {/* <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.statuserror}
                                                    </div> */}
                                                </div>
                                                <div className="text-center mt-4">
                                                    {
                                                        this.state.emit == true ? (
                                                            <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.editUserRoleData}>Update</Button>
                                                        ) : (
                                                                <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.userRightData}>Save</Button>
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
                                            {/* <TableHover/> */}
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
        );
    }
}


export default UserRight;