import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import renderHTML from 'react-render-html';
import AppFooter from '../../Layout/AppFooter/';
import TableUser from '../Tables/TableUser';
import { EventEmitter } from '../../event';

import { Link } from "react-router-dom";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CustomInput, Table,CardHeader,
    CardTitle,
} from 'reactstrap';

class ViewUser extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            userdata: []
        }
        this.userid = history.state.state.params;
        console.log("userid", this.userid);
    }

    componentDidMount() {
        if (this.userid) {

            API.getUser({ id: this.userid })
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUser response===", findresponse);
                        this.setState({
                            userdata: findresponse.data.data
                        })
                        console.log("getUser response===", this.state.userdata);

                    } else {
                        console.log("err", err);
                        // Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    render() {
        return (
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Row>
                                <Col md="4">
                                    <Link to="/listuser"><Button className="mb-2 mr-2" color="primary">
                                        Go back
                                </Button></Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                    <CardHeader>
                                        <CardTitle className="font">User Detail:</CardTitle>
                                    </CardHeader>
                                        <CardBody>
                                           
                                            <Row>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>First_Name:</h5>
                                                        <p>{data.first_name}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>Last_Name:</h5>
                                                        <p>{data.last_name}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>E-Mail:</h5>
                                                        <p>{data.email}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            <br/>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>PhoneNumber:</h5>
                                                        <p>{data.mobile_number}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>Gender:</h5>
                                                        <p>{data.gender}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            <Col md="4">
                                                {
                                                    this.state.userdata.map((data,index) => 
                                                    <div key={index}>
                                                        <h5>User_Role:</h5>
                                                        <p>{data.user_role}</p>
                                                    </div>
                                                    )
                                                }
                                            </Col>
                                            </Row>
                                          
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewUser;