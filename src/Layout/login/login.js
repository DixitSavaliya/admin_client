import React from 'react';
import API from '../../service';
import { HashRouter, Link, Route } from "react-router-dom";
import Swal from 'sweetalert2';
import './login.css';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordError: '',
            emailIdError: ''
        }
        this.Login = this.Login.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** onChange event  */
    handleChangeEvent(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /** validation of login form */
    validate = () => {
        let passwordError = "";
        let emailIdError = "";

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email) {
            emailIdError = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailIdError = "invalid email";
        }

        if (!this.state.password) {
            passwordError = "please enter password";
        }

        if (emailIdError || passwordError) {
            this.setState({ emailIdError, passwordError });
            return false;
        }
        return true;
    };

    Login() {
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState({
                password: '',
                passwordError: '',
                email: '',
                emailIdError: '',
                user: []
            })
        };
        if (this.state.email && this.state.password) {
            const obj = {
                email: this.state.email,
                password: this.state.password,
                user_type:1
            }
            /** UserLogin */
            API.login(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        this.setState({
                            user: findresponse
                        })
                        console.log("login response===", this.state.user);
                        localStorage.setItem('email', this.state.user.data.data.user.email);
                        localStorage.setItem('token', this.state.user.data.data.token);
                        localStorage.setItem('userid', this.state.user.data.data.id);
                        window.location.href = '/dashboards/basic';
                    } else {
                        console.log("err", err);
                        // Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    render() {
        return (
            <div className="h-100">
                <div className="h-100 no-gutters row">
                    <div className="d-none d-lg-block col-lg-4">
                        <img className="img-responsive size" src={require('./t2.jpg')} />
                    </div>
                    <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                        <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                            <div className="app-logo">
                                <h1>RKWebtechnology</h1>
                            </div>
                            <h4 className="mb-0">
                                <div>Welcome back,</div>
                                <span>Please sign in to your account.</span>
                            </h4>
                            <div className="margin-top">
                                <form>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="">Email</label>
                                                <input 
                                                type="email" 
                                                aria-describedby="emailHelp" 
                                                name="email"
                                                className="form-control" 
                                                value={this.state.email} 
                                                onChange={this.handleChangeEvent} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.emailIdError}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="">Password</label>
                                                <input 
                                                type="password" 
                                                className="form-control" 
                                                name="password" 
                                                value={this.state.password} 
                                                onChange={this.handleChangeEvent} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.passwordError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="ml-auto"><a href='/forgotpassword' className="btn-lg btn btn-link">Recover Password</a>  <button className="btn btn-primary btn-lg" type="button" onClick={this.Login}>Login to Dashboard</button></div>
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


export default LogIn;