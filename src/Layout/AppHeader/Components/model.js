import React from 'react';
import './popup.css';
import API from '../../../service';
import Swal from 'sweetalert2'

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordError: '',
      oldPassword: '',
      oldPasswordError: '',
      showPopup: false
    }
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.changePassword = this.changePassword.bind(this);
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
    let newPasswordError = "";
    let oldPasswordError = "";

    if (!this.state.newPassword) {
      newPasswordError = "please enter newpassword";
    }


    if (!this.state.oldPassword) {
      oldPasswordError = "please enter oldpassword";
    }

    if (newPasswordError || oldPasswordError) {
      this.setState({ newPasswordError, oldPasswordError });
      return false;
    }
    return true;
  };


  changePassword() {
    const isValid = this.validate();
    if (isValid) {
        console.log(this.state);
        this.setState({
          newPasswordError: '',
          oldPasswordError: '',
          newPassword:'',
          oldPassword:''
        })
    };

    if (this.state.newPassword && this.state.oldPassword) {
      const obj = {
        newPassword: this.state.newPassword,
        oldPassword: this.state.oldPassword,
        user_id: localStorage.getItem('userid')
      }
      /** UserLogin */
      API.changePassword(obj)
        .then((findresponse) => {
          console.log("response", findresponse);
          Swal.fire(
            'Updated',
            'Your password successfully updated.',
            'success'
          )
          this.props.closePopup();
        }).catch((err) => {
          Swal.fire("Something went wrong!", "", "warning");
        });
    }
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 className="text-center">ChangePassword</h1>
          <form>
            <div className="form-group">
              <label>Old Password</label>
              <input type="password" className="form-control" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChangeEvent} />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.oldPasswordError}
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" name="newPassword" value={this.state.newPassword} onChange={this.handleChangeEvent} />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.newPasswordError}
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.changePassword}>Change Password</button>
            <button type="button" className="btn btn-primary" onClick={this.props.closePopup}>Close </button>
          </form>
        </div>
      </div>
    );
  }
}


export default Popup;