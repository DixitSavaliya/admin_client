import React from 'react';
import './popup.css';
import API from '../../../service';
import Swal from 'sweetalert2'

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      oldPassword: '',
      showPopup:false
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

  changePassword() {
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
          
          // window.location.href = '/dashboards';
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
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" name="newPassword" value={this.state.newPassword} onChange={this.handleChangeEvent} />
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