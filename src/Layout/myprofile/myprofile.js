import React, { Fragment } from 'react';
import API from '../../service';
import './myprofile.css';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import Swal from 'sweetalert2';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, Form, FormGroup, Label, Table, Input, Button, CardHeader
} from 'reactstrap';

class MyProfile extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            firstnameerror: '',
            lastname: '',
            lastnameerror: '',
            email: '',
            emailerror: '',
            mobile_number: '',
            mobile_numbererror: '',
            selectedFile: null
        }
        this.id = localStorage.getItem('userid');
        this.path = "http://localhost:3505/";
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    /** Intailly call */
    componentDidMount() {
        /** Get Profile */
        API.getProfile({ id: this.id })
            .then((findresponse) => {
                console.log("getProfile response===", findresponse);
                this.setState({
                    firstname: findresponse.data.data.first_name,
                    lastname: findresponse.data.data.last_name,
                    email: findresponse.data.data.email,
                    selectedFile: findresponse.data.data.filename,
                    mobile_number: findresponse.data.data.mobile_number
                });
                localStorage.setItem('first_name', this.state.firstname);
                localStorage.setItem('last_name', this.state.last_name);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onChangeHandler(event) {
        this.setState({
            selectedFile: event.target.files[0].name,
            loaded: 0,
        })
        let data = new FormData();
        data.append('filename', event.target.files[0]);
        data.append('id', this.id);

        API.uploadImage(data)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("uploadimage response===", findresponse);
                    this.setState({
                        selectedFile: findresponse.data.data
                    })
                } else {
                    console.log("err", err);
                }
            }).catch((err) => {
                console.log("err", err);
            });
    }

    validate = () => {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let mobile_numbererror = "";

        if (!this.state.firstname) {
            firstnameerror = "please enter firstname";
        }

        if (!this.state.lastname) {
            lastnameerror = "please enter lastname";
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


        if (firstnameerror || lastnameerror || emailerror || mobile_numbererror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, mobile_numbererror });
            return false;
        }
        return true;
    };

    onClickHandler() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                firstname: '',
                firstnameerror: '',
                lastname: '',
                lastnameerror: '',
                mobilenumber: '',
                mobilenumbererror: '',
                email: '',
                emailerror: ''
            })

            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobile_number) {
                console.log("filedatatata", this.state.selectedFile);
                let data = new FormData();
                data.append('first_name', this.state.firstname);
                data.append('last_name', this.state.lastname);
                data.append('email', this.state.email);
                data.append('filename', this.state.selectedFile);
                data.append('mobile_number', this.state.mobile_number);
                data.append('id', this.id);

                API.updateProfile(data)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("editprofile response===", findresponse);
                            Swal.fire("Profile Updated Successfully!", "", "success");

                        } else {
                            console.log("err", err);
                        }
                    }).catch((err) => {
                        console.log("err", err);
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            }
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
                            <div>
                                <Card className="main-card mb-3">
                                    <CardHeader> <CardTitle className="font">My Profile</CardTitle></CardHeader>
                                    <CardBody>
                                        <Form>
                                            <div className="img">
                                                <FormGroup>
                                                    {
                                                        this.state.selectedFile ? (
                                                            <div>
                                                                <img className="picture" src={this.path + this.state.selectedFile} />
                                                            </div>
                                                        ) : (null)
                                                    }
                                                    <Label><i className="fas fa-camera"></i></Label>
                                                    <Input
                                                        type="file"
                                                        id="cover"
                                                        style={{ display: "none" }}
                                                        name="file"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <FormGroup>
                                                <Label>Firstname:</Label>
                                                <Input
                                                    type="text"
                                                    name="firstname"
                                                    className="form-control"
                                                    value={this.state.firstname}
                                                    onChange={this.handleChangeEvent}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.firstnameerror}
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Lastname:</Label>
                                                <Input
                                                    type="text"
                                                    name="lastname"
                                                    className="form-control"
                                                    value={this.state.lastname}
                                                    onChange={this.handleChangeEvent}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.lastnameerror}
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>E-mail:</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={this.state.email}
                                                    onChange={this.handleChangeEvent}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.emailerror}
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Mobile_Number:</Label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    name="mobile_number"
                                                    value={this.state.mobile_number}
                                                    onChange={this.handleChangeEvent}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.mobile_numbererror}
                                                </div>
                                            </FormGroup>
                                            <Button
                                                type="button"
                                                color="primary"
                                                className="mt-1"
                                                onClick={this.onClickHandler}
                                            >
                                                Update profile
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MyProfile;