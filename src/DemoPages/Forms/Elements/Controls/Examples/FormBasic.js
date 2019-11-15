import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormsCustomControls from './CustomControls';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

export default class FormsDefault extends React.Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <Row>
                        <Col md="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>UserRole</CardTitle>
                                    <form>
                                            <p classNameName="h4 text-center mb-4">UserRole</p>
                                            <label classNameName="grey-text">
                                                Role Name:
                                            </label>
                                            <input
                                                type="text"
                                                classNameName="form-control"
                                            />
                                            <br />
                                            <label classNameName="grey-text">
                                                Status:
                                            </label>
                                            <MDBFormInline>
                                                <MDBInput
                                                    label='Active'
                                                    filled
                                                    type='checkbox'
                                                    id='checkbox1'
                                                    containerclassName='mr-5'
                                                />
                                                <MDBInput
                                                    label='InActive'
                                                    filled
                                                    type='checkbox'
                                                    id='checkbox2'
                                                    containerclassName='mr-5'
                                                />
                                            </MDBFormInline>
                                            <div classNameName="text-center mt-4">
                                                <MDBBtn color="indigo" type="button">Save</MDBBtn>
                                            </div>
                                        </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>UserRole Table</CardTitle>
                                    <Button className="mb-2 mr-2" color="warning">
                                      Delete
                                    </Button>
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
                        <FormsCustomControls/>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
