import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import { Button } from 'reactstrap';
import API from '../../service';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, Form, FormGroup, Label, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

class UserRoleToRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userrole: [],
            userright: [],
            userid: '',
            selectroledata: '',
            _maincheck: false,
            noData: false
        }
        this.handleMainChange = this.handleMainChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editUserRoleToRight = this.editUserRoleToRight.bind(this);
    }

    componentDidMount() {
        API.getUserRoleData()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        userrole: findresponse.data.data
                    })
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getUserRightData()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        userright: findresponse.data.data
                    })
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    checkMaster(data) {
        let count = 0;
        data.forEach(element => {
            if (element._read == true && element._write == true && element._delete == true && element._import == true && element._export == true) {
                console.log("inside all true")
                element._rowChecked = true;
                count++;
            } else {
                console.log("inside all false")
                element._rowChecked = false;
            }
        });
        if (count == data.length) {
            this.setState({
                _maincheck: true
            })
        } else {
            this.setState({
                _maincheck: false
            })
        }
        this.setState({
            selectroledata: data
        });
    }

    onItemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            userid: this.state.userid = _id
        })
        this.setState({
            selectroledata: []
        })
        if (this.state.userid) {
            this.setState({
                noData: this.state.noData = false
            })
            API.getUserRoleToRightData({ user_role_id: this.state.userid })
                .then((findresponse) => {
                    if (findresponse) {
                        let data = findresponse.data.data;
                        let newData = [];
                        data.forEach(element => {
                            element._read = element._read ? true : false;
                            element._write = element._write ? true : false;
                            element._delete = element._delete ? true : false;
                            element._import = element._import ? true : false;
                            element._export = element._export ? true : false;
                            newData.push(element);
                        });
                        let count = 0;
                        newData.forEach(element => {
                            if (element._read == true && element._write == true && element._delete == true && element._import == true && element._export == true) {
                                element._rowChecked = true;
                                count++;
                            } else {
                                element._rowChecked = false;
                            }
                        });
                        this.setState({
                            selectroledata: data
                        })
                        if (count == data.length) {
                            this.setState({
                                _maincheck: true
                            })
                        } else {
                            this.setState({
                                _maincheck: false
                            })
                        }
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            this.setState({
                noData: this.state.noData = true
            })
        }
    }

    handleMainChange(e) {
        let _val = e.target.checked;
        this.state.selectroledata.forEach(element => {
            element._rowChecked = _val
            element._read = (_val == true ? true : false)
            element._write = (_val == true ? true : false)
            element._delete = (_val == true ? true : false)
            element._import = (_val == true ? true : false)
            element._export = (_val == true ? true : false)
        });
        this.setState({
            selectroledata: this.state.selectroledata
        })
        this.setState({
            _maincheck: _val
        })
    }

    handleChange(item, type, e) {
        let _id = item.id;
        let _type = type;
        let ind = this.state.selectroledata.findIndex((x) => x.id == _id);
        let data = this.state.selectroledata;
        if (ind > -1) {
            if (_type != '_read' && _type != '_write' && _type != '_delete' && _type != '_import' && _type != '_export') {
                let newState = !item._rowChecked;
                data[ind]._rowChecked = newState;
                if (!newState) {
                    data[ind]._read = false;
                    data[ind]._write = false;
                    data[ind]._delete = false;
                    data[ind]._import = false;
                    data[ind]._export = false;
                } else {
                    data[ind]._read = true;
                    data[ind]._write = true;
                    data[ind]._delete = true;
                    data[ind]._import = true;
                    data[ind]._export = true;
                }
            } else {
                let newState = !item[_type]
                data[ind][_type] = newState
            }
            this.setState({
                selectroledata: data
            });
        }
        this.checkMaster(data);
    }

    editUserRoleToRight() {
        const obj = {
            user_role_id: this.state.userid,
            data: this.state.selectroledata
        }
        API.updateUserRightToRoleData(obj)
            .then((findresponse) => {
                if (findresponse) {
                    Swal.fire("Rights Assign Successfully!", "", "success");
                    this.componentDidMount();
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
                                <Col md="4">
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleCustomSelect"><b>Select Role To Manage The All Rights:</b></Label>
                                            <CustomInput
                                                type="select"
                                                id="exampleCustomSelect"
                                                name="customSelect"
                                                onChange={() => this.onItemSelect(event)}>
                                                <option value="">Select UserRole:</option>
                                                {
                                                    this.state.userrole.map((data, index) =>
                                                        <option key={data.id} value={data.id}>{data.name}</option>
                                                    )
                                                }
                                            </CustomInput>
                                        </FormGroup>
                                    </Form>
                                    {
                                        this.state.selectroledata && !this.state.noData ? (
                                            <Button className="mb-2 mr-2" color="primary" onClick={this.editUserRoleToRight}>
                                                Assign Rights
                                             </Button>
                                        ) : (
                                                null
                                            )
                                    }
                                </Col>
                                {
                                    this.state.selectroledata && !this.state.noData ? (
                                        <Col md="8">
                                            <Card className="main-card mb-3">
                                                <CardBody>
                                                    <CardTitle><b>User-Role-To-Right Table:</b></CardTitle>
                                                    <Table hover className="mb-0" bordered>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <CustomInput
                                                                        name="name"
                                                                        value="value"
                                                                        type="checkbox"
                                                                        id="exampleCustomCheckbox"
                                                                        onChange={this.handleMainChange}
                                                                        checked={this.state._maincheck}
                                                                    />
                                                                </th>
                                                                <th>Right</th>
                                                                <th>Read</th>
                                                                <th>Write</th>
                                                                <th>Delete</th>
                                                                <th>Import</th>
                                                                <th>Export</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.selectroledata ? (
                                                                    this.state.selectroledata.map((data, index) =>
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name={data.module}
                                                                                    value={this.state.selectroledata[index]['_rowChecked'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id}
                                                                                    onChange={(e) => this.handleChange(data, 'row', e)}
                                                                                    checked={this.state.selectroledata[index]['_rowChecked'] == true}
                                                                                />
                                                                            </td>
                                                                            <td><span>{data.name}</span></td>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name="_read"
                                                                                    value={this.state.selectroledata[index]['_read'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id + '_read'}
                                                                                    data_type="_read"
                                                                                    onChange={(e) => this.handleChange(data, '_read', e)}
                                                                                    checked={this.state.selectroledata[index]['_read'] == true}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name="_write"
                                                                                    value={this.state.selectroledata[index]['_write'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id + '_write'}
                                                                                    data_type="_write"
                                                                                    onChange={(e) => this.handleChange(data, '_write', e)}
                                                                                    checked={this.state.selectroledata[index]['_write'] == true}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name="_delete"
                                                                                    value={this.state.selectroledata[index]['_delete'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id + '_delete'}
                                                                                    data_type="_delete"
                                                                                    onChange={(e) => this.handleChange(data, '_delete', e)}
                                                                                    checked={this.state.selectroledata[index]['_delete'] == true}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name="_import"
                                                                                    value={this.state.selectroledata[index]['_import'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id + '_import'}
                                                                                    data_type="_import"
                                                                                    onChange={(e) => this.handleChange(data, '_import', e)}
                                                                                    checked={this.state.selectroledata[index]['_import'] == true}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <CustomInput
                                                                                    name="_export"
                                                                                    value={this.state.selectroledata[index]['_export'] == true ? 1 : 0}
                                                                                    type="checkbox"
                                                                                    id={data.id + '_export'}
                                                                                    data_type="_export"
                                                                                    onChange={(e) => this.handleChange(data, '_export', e)}
                                                                                    checked={this.state.selectroledata[index]['_export'] == true}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                ) : (
                                                                        null
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
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserRoleToRight;