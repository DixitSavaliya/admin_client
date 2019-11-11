import React, { Fragment } from 'react';
import API from '../../service';
import './myprofile.css';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import Swal from 'sweetalert2';

class MyProfile extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
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
                    selectedFile: findresponse.data.data.filename
                });
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
                    // window.location.reload();
                } else {
                    console.log("err", err);
                }
            }).catch((err) => {
                console.log("err", err);
            });
    }

    onClickHandler() {
        console.log("filedatatata", this.state.selectedFile);
        let data = new FormData();
        data.append('first_name', this.state.firstname);
        data.append('last_name', this.state.lastname);
        data.append('email', this.state.email);
        data.append('filename', this.state.selectedFile);
        data.append('id', this.id);

        API.updateProfile(data)
            .then((findresponse) => {
                if (findresponse) {
                    console.log("editprofile response===", findresponse);
                    Swal.fire("Profile Updated Successfully!", "", "success");
                    // window.location.reload();
                } else {
                    console.log("err", err);
                }
            }).catch((err) => {
                console.log("err", err);
                Swal.fire("Something went wrong!", "", "warning");
            });
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
                                <h1 className="text-center">My Profile</h1>
                                <form>
                                    <div className="form-group">
                                        {
                                            this.state.selectedFile ? (
                                                <div>
                                                    <img className="picture" src={this.path + this.state.selectedFile} />
                                                </div>
                                            ) : (null)
                                        }
                                        <div>
                                            <label htmlFor="cover"><i className="fas fa-camera"></i></label>
                                            <input type="file" id="cover" style={{ display: "none" }} name="file" onChange={this.onChangeHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Firstname</label>
                                        <input type="text" name="firstname"
                                            className="form-control" value={this.state.firstname} onChange={this.handleChangeEvent} />
                                    </div>
                                    <div className="form-group">
                                        <label>Lastname</label>
                                        <input type="text" name="lastname"
                                            className="form-control" value={this.state.lastname} onChange={this.handleChangeEvent} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" name="email"
                                            className="form-control" value={this.state.email} onChange={this.handleChangeEvent} />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={this.onClickHandler}>Update profile</button>
                                </form>
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