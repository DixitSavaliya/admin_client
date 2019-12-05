import React from 'react';
import './popup.css';
import API from '../../../service';
import Swal from 'sweetalert2';
import {
  Row, Col,
  Card, CardBody,
  CardTitle,
  CustomInput, Form, FormGroup, Label, Table, Input, Button, CardHeader
} from 'reactstrap';

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
        newPassword: '',
        oldPassword: ''
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
          <Card className="main-card mb-3">
            <CardHeader> <CardTitle className="font">Change-Password</CardTitle></CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Old Password:</Label>
                  <Input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    value={this.state.oldPassword}
                    onChange={this.handleChangeEvent}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.oldPasswordError}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>New Password:</Label>
                  <Input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.handleChangeEvent}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.newPasswordError}
                  </div>
                </FormGroup>
                <Button
                  type="button"
                  color="primary"
                  className="mt-1"
                  onClick={this.changePassword}
                >
                  Change Password
                       </Button>
                <Button
                  type="button"
                  color="warning"
                  className="mt-1"
                  onClick={this.props.closePopup}
                >
                  Close
                       </Button>

              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}


export default Popup;