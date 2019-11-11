import React from 'react';
import API from '../../service';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Swal from 'sweetalert2';

class ForgotPassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            emailError: '',
            modal: false
        }
        this.forgotpassword = this.forgotpassword.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** first this method call when app run */
    componentDidMount() {
        this.toggle();
    }

    /** Model Open */
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of forgotpassword */
    validate = () => {
        let emailError = "";

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.emailId)) {
            emailError = "invalid email";
        }

        if (emailError) {
            this.setState({ emailError });
            return false;
        }
        return true;
    };

    /** ForgotPassword function*/
    forgotpassword() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                emailId: '',
                emailError: ''
            })
        };
        if (this.state.emailId) {
            const obj = {
                email: this.state.emailId
            }
            /** Forgot password */
            API.ForgotPassword(obj)
                .then((findresponse) => {
                    Swal.fire("Email sent Successfully!", "", "success");
                    this.setState({ modal: false });
                    setTimeout(
                        window.location.href = "/login",
                        6000
                    );
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>ForgotPassword</MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <label className="grey-text">
                                    Enter Your email
                          </label>
                                <input
                                    type="email"
                                    name="emailId"
                                    className="form-control"
                                    value={this.state.emailId}
                                    onChange={this.handleChangeEvent}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                                <br />
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="primary" onClick={this.forgotpassword} disabled={!this.state.emailId}>Send</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

export default ForgotPassword;