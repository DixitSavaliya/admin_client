import React from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, Form, FormGroup, Label, Table, Input, Button, CardHeader
} from 'reactstrap';
// import * as jwt_decode from 'jwt-decode';

class ResetPassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            email: '',
            hash: ''
        }
        this.resetpassword = this.resetpassword.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** first this method call */
    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        this.setState({ hash: this.props.location.pathname.split('/')[2] });
    }


    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** ForgotPassword function*/
    resetpassword() {
        console.log("msg==")
        if (this.state.newpassword) {
            const obj = {
                newPassword: this.state.newpassword,
                hash: this.state.hash
            }
            /** Forgot password */
            API.ResetPassword(obj)
                .then((findresponse) => {
                    Swal.fire("Password Reset Successfully!", "", "success");
                    window.location.href = "/login";
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <Row>
                <Col md="3">
                </Col>
                <Col md="6" className="m_top">
                    <Card className="main-card mb-3">
                        <CardHeader> <CardTitle className="font">Reset-Password</CardTitle></CardHeader>
                        <CardBody>
                            <Form>

                                <FormGroup>
                                    <Label>New Password:</Label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="newpassword"
                                        value={this.state.newpassword}
                                        onChange={this.handleChangeEvent}
                                    />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.titleerror}
                                    </div>
                                </FormGroup>
                                <Button
                                    type="button"
                                    color="primary"
                                    className="mt-1"
                                    onClick={this.resetpassword}
                                >
                                    Submit
                       </Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3">

                </Col>
            </Row>
        );
    }
}

export default ResetPassword;