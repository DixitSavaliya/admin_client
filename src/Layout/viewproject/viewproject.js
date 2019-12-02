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

class ViewProject extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
            pdata: [],
            assignData: [],
            tasks: []
        }
        this.projectid = history.state.state.params;
        console.log("projectid", this.projectid);
    }

    componentDidMount() {
        if (this.projectid) {
            API.getProjectByIdData({ project_id: this.projectid })
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getProjectByIdData response===", findresponse);
                        this.setState({
                            newData: findresponse.data.data
                        })
                        if (this.state.newData.technology_id == "1") {
                            this.setState({
                                technologyName: "JAVA"
                            })
                        } else if (this.state.newData.technology_id == "2") {
                            this.setState({
                                technologyName: "PHP"
                            })
                        } else if (this.state.newData.technology_id == "3") {
                            this.setState({
                                technologyName: "JAVASCRIPT"
                            })
                        } else if (this.state.newData.technology_id == "4") {
                            this.setState({
                                technologyName: "ANGULAR-JS"
                            })
                        } else if (this.state.newData.technology_id == "5") {
                            this.setState({
                                technologyName: "REACT-JS"
                            })
                        }
                        console.log("newData", this.state.newData);
                        var data = [];
                        data.push(this.state.newData);
                        console.log("data", data);
                        this.setState({
                            pdata: this.state.pdata = data
                        })
                        console.log("data", this.state.pdata);

                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }

        API.getProjectsAssignData({ project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getProjectsAssignData", findresponse);
                    this.setState({
                        assignData: findresponse.data.data
                    })
                    console.log("getProjectsAssignData response===", this.state.assignData);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getTasksByProjectId({ project_id: this.projectid })
            .then((findresponse) => {
                console.log("getTasksByProjectId response===", findresponse);
                if (findresponse) {
                    this.setState({
                        tasks: findresponse.data.data
                    })
                    console.log("getTasksByProjectId response===", this.state.tasks);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
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
                            <Row>
                            <Col md="4">
                                <Link to="/listproject"><Button className="mb-2 mr-2" color="primary">
                                    Go back
                                </Button></Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle><b>List-Project Table:</b></CardTitle>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Discription</th>
                                                        <th>Budget</th>
                                                        <th>Hours</th>
                                                        <th>status</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <tr key={index}>
                                                                <td>{data.title}</td>
                                                                <td>{renderHTML(data.discription)}</td>
                                                                <td>{data.budget}  <i className="fas fa-dollar-sign"></i></td>
                                                                <td>{data.hours}</td>
                                                                <td>
                                                                    <div className="btn_size">
                                                                        {
                                                                            data.status == "active" ? (
                                                                                <span className="badge badge-success">{data.status}</span>
                                                                            ) : (
                                                                                    <span className="badge badge-danger">{data.status}</span>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle><b>List-Assign-Project-Users Table:</b></CardTitle>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Hours</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.assignData.map((data, index) =>
                                                            <tr key={index}>
                                                                <td>{data.name}</td>
                                                                <td>{data.hours}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle><b>List-Project-Task Table:</b></CardTitle>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Discription</th>
                                                        <th>Hours</th>
                                                        <th>status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.tasks.map((data, index) =>
                                                            <tr key={index}>
                                                                <td>{data.title}</td>
                                                                <td>{renderHTML(data.discription)}</td>
                                                                <td>{data.hours}</td>
                                                                <td>
                                                                    <div className="btn_size">
                                                                        {
                                                                            data.status == "active" ? (
                                                                                <span className="badge badge-success">{data.status}</span>
                                                                            ) : (
                                                                                    <span className="badge badge-danger">{data.status}</span>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </td>
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

export default ViewProject;