import React from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
// import * as jwt_decode from 'jwt-decode';

class ResetPassword extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            email:'',
            hash:''
        }
        this.resetpassword = this.resetpassword.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    /** first this method call */
    componentDidMount() {
        console.log("query=", this.props.location.pathname.split('/')[2]);
        this.setState({hash:this.props.location.pathname.split('/')[2]});
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
                newPassword:this.state.newpassword,
                hash:this.state.hash
            }
            /** Forgot password */
            API.ResetPassword(obj)
                .then((findresponse) => {
                    Swal.fire("Password reset Successfully!", "", "success");
                    window.location.href = "/login";
                }).catch({ status: 500, message: 'Internal Server Error' });
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center">ResetPassword</h1>
                <form>
                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        name="newpassword" 
                        value={this.state.newpassword} 
                        onChange={this.handleChangeEvent} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.resetpassword}>Submit</button>
                </form>
            </div>
        );
    }
}

export default ResetPassword;