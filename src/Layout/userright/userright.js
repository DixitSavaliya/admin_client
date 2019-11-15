import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { MDBInput, MDBFormInline } from 'mdbreact';
import { MDBDataTable } from 'mdbreact';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import FormsCustomControls from './CustomControls';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';
// import {Button} from 'reactstrap';
import '../userrole/userrole.css';

class UserRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:false,
            userrole:'',
            status:''
        }
        this.checkAllHandler = this.checkAllHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.userRoleData = this.userRoleData.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    checkAllHandler(event) {
        console.log("data",event.target.checked);
        if(event.target.checked == true) {
            this.setState({
                checked:true
            })
        } else {
            this.setState({
                checked:false
            })
        }
        // var checkbox = document.getElementsByName('select');
        // if(event.target.checked) {
        //     for (var i in checkbox) {
        //         if(checkbox[i].checked == false) {
        //             checkbox[i].checked == true;
        //         }
        //     }
        // } else {
        //     for (var i in checkbox) {
        //         if(checkbox[i].checked == true) {
        //             checkbox[i].checked == false;
        //         }
        //     }
        // }
    }

    handleChange(event) {
         console.log("data",event.target.checked);
        if(event.target.checked == true) {
            this.setState({
                checked:true
            })
        } else {
            this.setState({
                checked:false
            })
        }
    }

    handleChangeRole(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeStatus(event) {
        console.log("event",event.target.value)
        this.setState({
            status:event.target.value
        })
    }

    userRoleData(data) {
        console.log("data",this.state.userrole,this.state.status);

    }


    render() {
        const data = {
            columns: [
                {
                    label: (
                        <MDBInput
                            label=' '
                            type='checkbox'
                            id='checkbox5'
                          onClick={this.checkAllHandler}
                        />
                    ),
                    field: 'check',
                    sort: 'asc'
                },

                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 270
                }
            ],
            rows: [

                {
                    check: (
                        this.state.checked == true ? (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox5'
                            checked={this.state.checked}
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />) : (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox5'
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />)
                     
                    ),
                    field: 'check',
                    sort: 'asc',
                    action: (
                        <span>
                            <i className="fas fa-pencil-alt"></i>
                            <i className="fas fa-times"></i>
                        </span>
                    ),
                    name: 'dax',
                    status: (
                        <Button className="mb-2 mr-2" color="success">
                        Active
                    </Button>
                    )
                },
                {
                    check: (
                        this.state.checked == true ? (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox6'
                            checked={this.state.checked}
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />) : (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox6'
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />)
                    ),
                    field: 'check',
                    sort: 'asc',
                    action: (
                        <span>
                            <i className="fas fa-pencil-alt"></i>
                            <i className="fas fa-times"></i>
                        </span>
                    ),
                    name: 'dax',
                    status: (
                        <Button className="mb-2 mr-2" color="success">
                        Active
                    </Button>
                    )
                },
                {
                    check: (
                        this.state.checked == true ? (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox7'
                            checked={this.state.checked}
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />) : (   <MDBInput
                            label=' '
                            type='checkbox'
                            name="select[]"
                            id='checkbox7'
                            // onChange={this.handleChange}
                            // value={this.state.checked}
                        />)
                    ),
                    field: 'check',
                    sort: 'asc',
                    action: (
                        <span>
                            <i className="fas fa-pencil-alt"></i>
                            <i className="fas fa-times"></i>
                        </span>
                    ),
                    name: 'dax',
                    status: (
                        <Button className="mb-2 mr-2" color="success">
                        Active
                    </Button>
                    )
                }
               
            ]
        }

        return (
            <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                    
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <Row>
                        <Col md="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>UserRight:</CardTitle>
                                    <form>
                                            <label className="grey-text">
                                                Right Name:
                                            </label>
                                            <input
                                                type="text"
                                                name="userrole"
                                                className="form-control"
                                                value={this.state.userrole}
                                                onChange={this.handleChangeRole}
                                            />
                                            <br />
                                            <label className="grey-text">
                                                Module Name:
                                            </label>
                                            <input
                                                type="text"
                                                name="userrole"
                                                className="form-control"
                                                value={this.state.userrole}
                                                onChange={this.handleChangeRole}
                                            />
                                            <br />
                                            <label className="grey-text">
                                                Status:
                                            </label>
            
                                            <input type="radio" name="status" value="active"  onChange={this.handleChangeStatus}/> Active
                                            <input type="radio" name="status" value="inactive"  onChange={this.handleChangeStatus}/> InActive
                                            {/* <MDBFormInline>
                                                
                                                <MDBInput
                                                    label='Active'
                                                    filled
                                                    type='checkbox'
                                                    name='checkbox1'
                                                    containerclassName='mr-5'
                                                />
                                                <MDBInput
                                                    label='InActive'
                                                    filled
                                                    type='checkbox'
                                                    name='checkbox1'
                                                    containerclassName='mr-5'
                                                />
                                            </MDBFormInline> */}
                                            <div className="text-center mt-4">
                                            <Button className="mb-2 mr-2" color="primary" type="button" onClick={this.userRoleData(this.state.userrole,this.state.status)}>Save</Button>
                                            </div>
                                        </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>UserRight Table:</CardTitle>
                                    <div className="right">
                                    <Button className="mb-2 mr-2" color="warning">
                                      Delete
                                    </Button>
                                    </div>
                                        <MDBDataTable
                                            striped
                                            bordered
                                            small
                                            data={data}
                                        />
                                </CardBody>
                            </Card>
                         
                        </Col>
                    </Row>
                        {/* <FormsCustomControls/> */}
                    </div>
                </ReactCSSTransitionGroup>
           
                    </div>
                    <AppFooter />
                </div>
            </div>
        </Fragment>
            // <Fragment>
            //     <AppHeader />
            //     <div className="app-main">
            //         <AppSidebar />
            //         <div className="app-main__outer">
            //             <div className="app-main__inner">
            //                 <MDBContainer>
            //                     <MDBRow>
            //                         <MDBCol md="6" classNameName="loginUser">
            //                             <form>
            //                                 <p classNameName="h4 text-center mb-4">UserRole</p>
            //                                 <label classNameName="grey-text">
            //                                     Role Name:
            //                                 </label>
            //                                 <input
            //                                     type="text"
            //                                     classNameName="form-control"
            //                                 />
            //                                 <br />
            //                                 <label classNameName="grey-text">
            //                                     Status:
            //                                 </label>
            //                                 <MDBFormInline>
            //                                     <MDBInput
            //                                         label='Active'
            //                                         filled
            //                                         type='checkbox'
            //                                         id='checkbox1'
            //                                         containerclassName='mr-5'
            //                                     />
            //                                     <MDBInput
            //                                         label='InActive'
            //                                         filled
            //                                         type='checkbox'
            //                                         id='checkbox2'
            //                                         containerclassName='mr-5'
            //                                     />
            //                                 </MDBFormInline>
            //                                 <div classNameName="text-center mt-4">
            //                                     <MDBBtn color="indigo" type="button">Save</MDBBtn>
            //                                 </div>
            //                             </form>
            //                         </MDBCol>
            //                     </MDBRow>
            //                     <MDBRow>
            //                         <h1 classNameName="text-center">UserRole Data</h1>
            //                     </MDBRow>
            //                     <MDBRow>
            //                         <MDBCol>
            //                         <Button className="mb-2 mr-2" color="warning">
            //                           Delete
            //                         </Button>
            //                             <MDBDataTable
            //                                 striped
            //                                 bordered
            //                                 small
            //                                 data={data}
            //                             />
            //                         </MDBCol>
            //                     </MDBRow>
            //                 </MDBContainer>
            //             </div>
            //             <AppFooter />
            //         </div>
            //     </div>
            // </Fragment>
        );
    }
}


export default UserRight;