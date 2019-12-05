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
        if(!this.state.emailId) {
            emailError = "please enter email";
        } else if (!reg.test(this.state.emailId)) {
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
            if (this.state.emailId) {
                const obj = {
                    email: this.state.emailId
                }
                /** Forgot password */
                API.ForgotPassword(obj)
                    .then((findresponse) => {
                        Swal.fire("Email sent Successfully!", "", "success");
                        setTimeout(
                            window.location.href = "/login",
                            6000
                        );
                    }).catch({ status: 500, message: 'Internal Server Error' });
            }
        };
    }

    render() {
        return (
            <div className="h-100">
                <div className="h-100 no-gutters row">
                    <div className="d-none d-lg-block col-lg-4">
                    <img className="img-responsive size" src={require('../login/t3.jpg')} />
                    </div>
                    <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                        <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                            <div className="app-logo">
                                <h1>RKWebtechnology</h1>
                            </div>
                            <h4 className="mb-0">
                                <div>Forgot your Password?</div>
                                <span>Use the form below to recover it.</span>
                            </h4>
                            <div className="margin-top">
                                <form className="">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="">Email</label> 
                                                <input type="email" aria-describedby="emailHelp" name="emailId"
                            className="form-control" value={this.state.emailId} onChange={this.handleChangeEvent} />
                             <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.emailError}
                                                </div>
                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                 <button className="btn btn-primary btn-lg" type="button"  onClick={this.forgotpassword} disabled={!this.state.emailId}>Forgot Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        );
    }
}

export default ForgotPassword;