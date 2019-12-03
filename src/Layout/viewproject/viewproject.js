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
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle><b>List-Project:</b></CardTitle>
                                            <hr />
                                            <Row>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Title:</h5>
                                                                <p>{data.title}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Budget:</h5>
                                                                <p>{data.budget} <i className="fas fa-dollar-sign"></i></p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                      
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Status:</h5>
                                                                <div className="btn_size">
                                                                    {
                                                                        data.status == "active" ? (
                                                                            <span className="badge badge-success">{data.status}</span>
                                                                        ) : (
                                                                                <span className="badge badge-danger">{data.status}</span>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Hours:</h5>
                                                                <p>{data.hours}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <br />
                                                <Col md="12">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Discription:</h5>
                                                                <p>{renderHTML(data.discription)}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                            {/* <Table hover className="mb-0" bordered>
                                              
                                                {
                                                    this.state.pdata.map((data, index) =>
                                                        <tbody key={index}>
                                                            <tr>
                                                                <td><b>Title:</b></td>
                                                                <td>{data.title}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Discription:</b></td>
                                                                <td className="mg-0">{renderHTML(data.discription)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Budget:</b></td>
                                                                <td>{data.budget}  <i className="fas fa-dollar-sign"></i></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Hours:</b></td>
                                                                <td>{data.hours}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Status:</b></td>
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

                                                        </tbody>
                                                    )
                                                }
                                            </Table> */}
                                        </CardBody>
                                    </Card>
                                </Col>
                                {
                                    this.state.assignData.length ? (
                                        <Col md="6">
                                            <Card className="main-card mb-3">
                                                <CardBody>
                                                    <CardTitle><b>List-Assign-Project-Users Table:</b></CardTitle>
                                                
                                                    {/* {
                                                        this.state.assignData.map((data, index) =>
                                                            <div>
                                                                <Col md="6">
                                                                    <h5>Name:</h5>
                                                                    <p>{data.name}</p>
                                                                </Col>
                                                                <Col md="6">
                                                                    <h5>Hours:</h5>
                                                                    <p>{data.hours}</p>
                                                                </Col>
                                                            </div>
                                                        )
                                                    } */}

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
                                    ) : (
                                            null
                                        )
                                }
                            </Row>

                            {
                                this.state.tasks.length ? (
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
                                                                        <td className="mg-0">{renderHTML(data.discription)}</td>
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
                                ) : (
                                        null
                                    )
                            }

                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewProject;