import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import TableBordered from '../Tables/TableBordered';
import history from '../../history';
import { EventEmitter } from '../../event';
import { Link } from "react-router-dom";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CustomInput,
    CardHeader,
    CardTitle,
} from 'reactstrap';

class CreateUser extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            first_nameerror: '',
            last_name: '',
            last_nameerror: '',
            mobile_number: '',
            mobile_numbererror: '',
            email: '',
            emailerror: '',
            password: '',
            passworderror: '',
            user_role: '',
            user_roleerror: '',
            role: '',
            status: '',
            statuserror: '',
            statuscheck1: false,
            statuscheck2: false,
            userdata: [],
            Role: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeStatusName = this.handleChangeStatusName.bind(this);
        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount() {

        if (this.props.location.pathname.split('/')[2]) {

            API.getUser({ id: this.props.location.pathname.split('/')[2] })
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUser response===", findresponse);
                        this.setState({
                            userdata: findresponse.data.data
                        })
                        console.log("getUser response===", this.state.userdata);
                        EventEmitter.dispatch('userid', this.props.location.pathname.split('/')[2]);
                        if (this.state.userdata[0].gender == "male") {
                            this.setState({
                                first_name: this.state.userdata[0].first_name,
                                last_name: this.state.userdata[0].last_name,
                                email: this.state.userdata[0].email,
                                password: this.state.userdata[0].password,
                                mobile_number: this.state.userdata[0].mobile_number,
                                statuscheck1: this.state.statuscheck1 = true,
                                Role: this.state.userdata[0].user_role,
                                status: this.state.userdata[0].gender,
                                user_role: this.state.userdata[0].user_type,
                                role: this.state.userdata[0].user_role
                            })
                        } else {
                            this.setState({
                                first_name: this.state.userdata[0].first_name,
                                last_name: this.state.userdata[0].last_name,
                                email: this.state.userdata[0].email,
                                password: this.state.userdata[0].password,
                                mobile_number: this.state.userdata[0].mobile_number,
                                statuscheck2: this.state.statuscheck2 = true,
                                Role: this.state.userdata[0].user_role,
                                status: this.state.userdata[0].gender,
                                user_role: this.state.userdata[0].user_type,
                                role: this.state.userdata[0].user_role
                            })
                        }
                        // history.push('/listproject');
                    } else {
                        console.log("err", err);
                        // Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    /** onChange event  */
    handleChange(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeStatus(event) {
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: "male"
        })
        console.log("male", this.state.status);
    }

    handleChangeStatusName(event) {
        this.setState({
            statuscheck2: this.state.statuscheck2 = event.target.checked,
            status: "female"
        })
        console.log("female", this.state.status);
    }

    onUserSelect(event) {
        console.log("event", event);
        let userrole = event.target.options[event.target.selectedIndex].innerText;
        let _id = event.target.options[event.target.selectedIndex].value;
        console.log("id", _id);
        this.setState({
            user_role: this.state.user_role = _id,
            role: this.state.role = userrole
        })
    }

    /** validation of createproject form */
    validate = () => {
        let first_nameerror = "";
        let last_nameerror = "";
        let emailerror = "";
        let passworderror = "";
        let mobile_numbererror = "";
        let user_roleerror = "";
        let statuserror = "";

        if (!this.state.first_name) {
            first_nameerror = "please enter first_name";
        }

        if (!this.state.last_name) {
            last_nameerror = "please enter last_name";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "invalid email";
        }

        if (!this.state.password) {
            passworderror = "please enter password";
        }

        const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (!pattern.test(this.state.mobile_number)) {
            mobile_numbererror = "please enter mobile_number";
        }

        if (!this.state.user_role) {
            user_roleerror = "please enter user_role";
        }

        if (!this.state.status) {
            statuserror = "please enter status";
        }

        if (first_nameerror || last_nameerror || emailerror || passworderror || mobile_numbererror || user_roleerror || statuserror) {
            this.setState({ first_nameerror, last_nameerror, emailerror, passworderror, mobile_numbererror, user_roleerror, statuserror });
            return false;
        }
        return true;
    };

    /** validation of createproject form */
    validateUser = () => {
        let first_nameerror = "";
        let last_nameerror = "";
        let emailerror = "";
        let mobile_numbererror = "";
        let user_roleerror = "";
        let statuserror = "";

        if (!this.state.first_name) {
            first_nameerror = "please enter first_name";
        }

        if (!this.state.last_name) {
            last_nameerror = "please enter last_name";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "invalid email";
        }


        const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (!pattern.test(this.state.mobile_number)) {
            mobile_numbererror = "please enter mobile_number";
        }

        if (!this.state.user_role) {
            user_roleerror = "please enter user_role";
        }

        if (!this.state.status) {
            statuserror = "please enter status";
        }

        if (first_nameerror || last_nameerror || emailerror || mobile_numbererror || user_roleerror || statuserror) {
            this.setState({ first_nameerror, last_nameerror, emailerror, mobile_numbererror, user_roleerror, statuserror });
            return false;
        }
        return true;
    };


    createUser() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                first_name: '',
                first_nameerror: '',
                last_name: '',
                last_nameerror: '',
                mobile_number: '',
                mobile_numbererror: '',
                email: '',
                emailerror: '',
                password: '',
                passworderror: '',
                user_role: '',
                user_roleerror: '',
                status: '',
                statuserror: ''
            })

            if (this.state.first_name && this.state.last_name && this.state.mobile_number && this.state.email && this.state.password && this.state.user_role && this.state.status) {
                const obj = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    mobile_number: this.state.mobile_number,
                    email: this.state.email,
                    password: this.state.password,
                    user_type: this.state.user_role,
                    status: this.state.status,
                    Role: this.state.role
                }
                console.log("obj", obj);
                API.CreateUser(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("CreateUser response===", findresponse);
                            Swal.fire("User Created Successfully!", "", "success");
                            history.push('/listuser');
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };
    }

    editUser() {
        console.log("status", this.state.status);
        const isValid = this.validateUser();
        if (isValid) {
            console.log(this.state);
            this.setState({
                first_name: '',
                first_nameerror: '',
                last_name: '',
                last_nameerror: '',
                mobile_number: '',
                mobile_numbererror: '',
                email: '',
                emailerror: '',
                user_role: '',
                user_roleerror: '',
                status: '',
                statuserror: ''
            })
            console.log("status", this.state.status, this.state.user_role);

            if (this.state.first_name && this.state.last_name && this.state.mobile_number && this.state.email && this.state.user_role && this.state.status) {
                const obj = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    mobile_number: this.state.mobile_number,
                    email: this.state.email,
                    password: this.state.password,
                    user_type: this.state.user_role,
                    status: this.state.status,
                    Role: this.state.role,
                    id: this.state.userdata[0].id
                }
                console.log("obj", obj);
                API.EditUser(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("EditUser response===", findresponse);
                            Swal.fire("User Updated Successfully!", "", "success");
                            history.push('/listuser');
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };

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
                                {
                                    this.state.userdata[0] ? (
                                        <div>
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
                                                        {
                                                            this.state.userdata ? (
                                                                <CardHeader> <CardTitle className="font">Edit-User</CardTitle></CardHeader>
                                                            ) : (
                                                                    <CardHeader> <CardTitle className="font">Create-User</CardTitle></CardHeader>
                                                                )
                                                        }

                                                        <CardBody>
                                                            <Form>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>FirstName:</Label>
                                                                            <Input
                                                                                type="text"
                                                                                name="first_name"
                                                                                className="form-control"
                                                                                value={this.state.first_name}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.first_nameerror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>LastName:</Label>
                                                                            <Input
                                                                                type="text"
                                                                                name="last_name"
                                                                                className="form-control"
                                                                                value={this.state.last_name}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.last_nameerror}
                                                                            </div>
                                                                        </FormGroup>

                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>E-Mail:</Label>
                                                                            <Input
                                                                                type="email"
                                                                                name="email"
                                                                                className="form-control"
                                                                                value={this.state.email}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.emailerror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>Password:</Label>
                                                                            <Input
                                                                                type="password"
                                                                                name="password"
                                                                                className="form-control"
                                                                                // value={this.state.password}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            {/* <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.passworderror}
                                                                            </div> */}
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        {
                                                                            this.state.userdata ? (
                                                                                <FormGroup>
                                                                                    <Label for="exampleCustomSelect">Select UserRole:</Label>
                                                                                    <CustomInput
                                                                                        type="select"
                                                                                        id="exampleCustomSelect"
                                                                                        name="user_role"
                                                                                        // value={this.state.Role}
                                                                                        onChange={() => this.onUserSelect(event)}
                                                                                    >

                                                                                        <option value="">{this.state.Role}</option>
                                                                                        <option value="1">admin</option>
                                                                                        <option value="1">admin-Staff</option>
                                                                                        <option value="2">projectManager</option>
                                                                                        <option value="3">developer</option>
                                                                                        <option value="3">designer</option>
                                                                                        <option value="3">bDE</option>
                                                                                        <option value="3">tester</option>
                                                                                        <option value="3">data Scientist</option>
                                                                                        <option value="3">dBA</option>

                                                                                    </CustomInput>
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.user_roleerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            ) : (
                                                                                    <FormGroup>
                                                                                        <Label for="exampleCustomSelect">Select User:</Label>
                                                                                        <CustomInput
                                                                                            type="select"
                                                                                            id="exampleCustomSelect"
                                                                                            name="user_role"
                                                                                            // value={this.state.Role}
                                                                                            onChange={() => this.onUserSelect(event)}
                                                                                        >
                                                                                            <option value="">Select UserRole:</option>
                                                                                            <option value="1">admin</option>
                                                                                            <option value="1">admin-Staff</option>
                                                                                            <option value="2">projectManager</option>
                                                                                            <option value="3">developer</option>
                                                                                            <option value="3">designer</option>
                                                                                            <option value="3">bDE</option>
                                                                                            <option value="3">tester</option>
                                                                                            <option value="3">data Scientist</option>
                                                                                            <option value="3">dBA</option>

                                                                                        </CustomInput>
                                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                                            {this.state.user_roleerror}
                                                                                        </div>
                                                                                    </FormGroup>
                                                                                )
                                                                        }

                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>PhoneNumber:</Label>
                                                                            <Input
                                                                                type="number"
                                                                                name="mobile_number"
                                                                                className="form-control"
                                                                                value={this.state.mobile_number}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.mobile_numbererror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <FormGroup>
                                                                            <Label>Gender:</Label>
                                                                            <div>
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio"
                                                                                    name="gender"
                                                                                    value={this.state.status}
                                                                                    onChange={this.handleChangeStatus}
                                                                                    checked={this.state.statuscheck1}
                                                                                    label="Male" inline />
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio1"
                                                                                    value={this.state.status}
                                                                                    name="gender"
                                                                                    checked={this.state.statuscheck2}
                                                                                    onChange={this.handleChangeStatusName}
                                                                                    label="Female" inline />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.statuserror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                {
                                                                    this.state.userdata ? (
                                                                        <Button
                                                                            color="primary"
                                                                            className="mt-1"
                                                                            onClick={this.editUser}
                                                                        >
                                                                            Update
                                                                    </Button>
                                                                    ) : (
                                                                            <Button
                                                                                color="primary"
                                                                                className="mt-1"
                                                                                onClick={this.createUser}
                                                                            >
                                                                                Create
                                                                    </Button>
                                                                        )
                                                                }

                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : (
                                            <Row>
                                                <Col md="12">
                                                    <Card className="main-card mb-3">
                                                        <CardHeader> <CardTitle className="font">Create-User</CardTitle></CardHeader>
                                                        <CardBody>
                                                            <Form>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>FirstName:</Label>
                                                                            <Input
                                                                                type="text"
                                                                                name="first_name"
                                                                                className="form-control"
                                                                                value={this.state.first_name}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.first_nameerror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>LastName:</Label>
                                                                            <Input
                                                                                type="text"
                                                                                name="last_name"
                                                                                className="form-control"
                                                                                value={this.state.last_name}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.last_nameerror}
                                                                            </div>
                                                                        </FormGroup>

                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>E-Mail:</Label>
                                                                            <Input
                                                                                type="email"
                                                                                name="email"
                                                                                className="form-control"
                                                                                value={this.state.email}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.emailerror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>Password:</Label>
                                                                            <Input
                                                                                type="password"
                                                                                name="password"
                                                                                className="form-control"
                                                                                value={this.state.password}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.passworderror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        {
                                                                            this.state.userdata ? (
                                                                                <FormGroup>
                                                                                    <Label for="exampleCustomSelect">Select UserRole:</Label>
                                                                                    <CustomInput
                                                                                        type="select"
                                                                                        id="exampleCustomSelect"
                                                                                        name="user_role"
                                                                                        // value={this.state.Role}
                                                                                        onChange={() => this.onUserSelect(event)}
                                                                                    >

                                                                                        <option value="">{this.state.Role}</option>
                                                                                        <option value="1">admin</option>
                                                                                        <option value="1">admin-Staff</option>
                                                                                        <option value="2">projectManager</option>
                                                                                        <option value="3">developer</option>
                                                                                        <option value="3">designer</option>
                                                                                        <option value="3">bDE</option>
                                                                                        <option value="3">tester</option>
                                                                                        <option value="3">data Scientist</option>
                                                                                        <option value="3">dBA</option>

                                                                                    </CustomInput>
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.user_roleerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            ) : (
                                                                                    <FormGroup>
                                                                                        <Label for="exampleCustomSelect">Select User:</Label>
                                                                                        <CustomInput
                                                                                            type="select"
                                                                                            id="exampleCustomSelect"
                                                                                            name="user_role"
                                                                                            // value={this.state.Role}
                                                                                            onChange={() => this.onUserSelect(event)}
                                                                                        >
                                                                                            <option value="">Select UserRole:</option>
                                                                                            <option value="1">admin</option>
                                                                                            <option value="1">admin-Staff</option>
                                                                                            <option value="2">projectManager</option>
                                                                                            <option value="3">developer</option>
                                                                                            <option value="3">designer</option>
                                                                                            <option value="3">bDE</option>
                                                                                            <option value="3">tester</option>
                                                                                            <option value="3">data Scientist</option>
                                                                                            <option value="3">dBA</option>

                                                                                        </CustomInput>
                                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                                            {this.state.user_roleerror}
                                                                                        </div>
                                                                                    </FormGroup>
                                                                                )
                                                                        }

                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label>PhoneNumber:</Label>
                                                                            <Input
                                                                                type="number"
                                                                                name="mobile_number"
                                                                                className="form-control"
                                                                                value={this.state.mobile_number}
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.mobile_numbererror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="4">
                                                                        <FormGroup>
                                                                            <Label>Gender:</Label>
                                                                            <div>
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio"
                                                                                    name="gender"
                                                                                    value={this.state.status}
                                                                                    onChange={this.handleChangeStatus}
                                                                                    checked={this.state.statuscheck1}
                                                                                    label="Male" inline />
                                                                                <CustomInput
                                                                                    type="radio"
                                                                                    id="exampleCustomRadio1"
                                                                                    value={this.state.status}
                                                                                    name="gender"
                                                                                    checked={this.state.statuscheck2}
                                                                                    onChange={this.handleChangeStatusName}
                                                                                    label="Female" inline />
                                                                            </div>
                                                                            <div style={{ fontSize: 12, color: "red" }}>
                                                                                {this.state.statuserror}
                                                                            </div>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Button
                                                                    color="primary"
                                                                    className="mt-1"
                                                                    onClick={this.createUser}
                                                                >
                                                                    Create
                                                                    </Button>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                }
                            </div>
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateUser;