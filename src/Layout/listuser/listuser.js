import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
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
    CustomInput,
    CardTitle,
    CardHeader,
} from 'reactstrap';

class ListUser extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            user:[],
            searchData:''
        }
        this.searchUserDataKeyUp = this.searchUserDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);

    }

    componentDidMount() {
        API.GetUser()
        .then((findresponse) => {
            if (findresponse) {
                console.log("GetUser response===", findresponse);
                this.setState({
                    user:this.state.user = findresponse.data.data
                })
                console.log("GetUser response===", this.state.user);
            } else {
                console.log("err", err);
                // Swal.fire("Something went wrong!", "", "warning");
            }
        }).catch((err) => {
            Swal.fire("Something went wrong!", "", "warning");
        });
    }

    searchUserDataKeyUp(e) {
        API.searchUserData({ searchkey: e.target.value})
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    console.log("searchUserData=====", this.state.searchData);
                    EventEmitter.dispatch('searchUserData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('selectvalue', e.target.value);
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
                                        <CardHeader><CardTitle className="font">Users:</CardTitle></CardHeader> 
                                        <CardBody>
                                            <div>
                                                <Row>
                                                    <Col md="2">
                                                        <div className="right">
                                                            <Link to="/createuser"><Button className="mb-2 mr-2" color="primary">
                                                                Add
                                                            </Button></Link>
                                                        </div>
                                                    </Col>
                                                    <Col md="5">
                                                        <div>
                                                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onKeyUp={this.searchUserDataKeyUp} />
                                                        </div>
                                                    </Col>
                                                    <Col md="5">
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
                                            <TableUser data={this.state.user} />
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

export default ListUser;