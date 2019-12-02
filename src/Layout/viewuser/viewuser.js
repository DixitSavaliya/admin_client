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
    CustomInput, Table,
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
                                        <CardBody>
                                            <CardTitle><b>List-Users Table:</b></CardTitle>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>First_Name</th>
                                                        <th>Last_Name</th>
                                                        <th>E-Mail</th>
                                                        <th>Phone-Number</th>
                                                        <th>Gender</th>
                                                        <th>User_Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.userdata.map((data, index) =>
                                                            <tr key={index}>
                                                                <td>{data.first_name}</td>
                                                                <td>{data.last_name}</td>
                                                                <td>{data.email}</td>
                                                                <td>{data.mobile_number}</td>
                                                                <td>{data.gender}</td>
                                                                <td>{data.user_role}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
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