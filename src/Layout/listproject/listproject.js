import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import TableBordered from '../Tables/TableBordered';
import { EventEmitter } from '../../event';
import { Link } from "react-router-dom";

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CustomInput,
    CardTitle,
} from 'reactstrap';

class ListProject extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            searchData: ''
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.searchUserRoleDataKeyUp = this.searchUserRoleDataKeyUp.bind(this);

    }

    componentDidMount() {
        API.getAllProjects()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        projects: findresponse.data.data
                    })
                    console.log("projects response===", this.state.projects);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('selectvalue', e.target.value);
    }

    searchUserRoleDataKeyUp(e) {
        console.log("e", e.target.value);
        API.searchProjectData({ searchkey: e.target.value })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    console.log("searchdata", this.state.searchData);
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
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle><b>List-Projects Table:</b></CardTitle>
                                            <div>
                                                <Row>
                                                    <Col md="3">
                                                        <div className="right">
                                                            <Link to="/createproject"><Button className="mb-2 mr-2" color="primary">
                                                                Add
                                                            </Button></Link>
                                                        </div>
                                                    </Col>
                                                    <Col md="5">
                                                        <div>
                                                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onKeyUp={this.searchUserRoleDataKeyUp} />
                                                        </div>
                                                    </Col>
                                                    <Col md="4">
                                                        <div className="lt">
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
                                            <TableBordered data={this.state.projects} />
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

export default ListProject;