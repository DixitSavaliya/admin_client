import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import renderHTML from 'react-render-html';
import AppFooter from '../../Layout/AppFooter/';
import TableUser from '../Tables/TableUser';
import { EventEmitter } from '../../event';

import { Link } from "react-router-dom";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CustomInput, Table,
    CardHeader,
    CardTitle,
} from 'reactstrap';

class ViewProject extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            projectCount: '',
            currentPage: 1,
            todosPerPage: 2,
            upperPageBound: 3,
            lowerPageBound: 0,
            pageBound: 3,
            isFetch: false,
            isData: false,
            paginationdata: [],
            newData: [],
            pdata: [],
            assignData: [],
            tasks: [],
            tId: [],
            taskCount: '',
            taskpaginationdata: [],
            searchData: [],
            searchAssignData: []
        }
        this.projectid = history.state.state.params;
        console.log("projectid", this.projectid);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick1ObjEvent = this.handleClick1ObjEvent.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.searchUserTaskDataKeyUp = this.searchUserTaskDataKeyUp.bind(this);
        this.searchUsersDataKeyUp = this.searchUsersDataKeyUp.bind(this);
    }

    componentDidMount() {
        if (this.projectid) {
            API.getProjectByIdData({ project_id: this.projectid })
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getProjectByIdData response===", findresponse);
                        this.setState({
                            newData: findresponse.data.data
                        })
                        console.log("projectdata", this.state.newData.projectData[0])

                        console.log("newData", this.state.newData);
                        var data = [];
                        data.push(this.state.newData.projectData[0]);
                        console.log("data", data);
                        this.setState({
                            pdata: this.state.pdata = data
                        })
                        console.log("data", this.state.pdata);

                        var arrayvalue = [];
                        for (var i = 0; i < this.state.newData.technologyData.length; i++) {
                            console.log("technologyName", this.state.newData.technologyData[i].technology_id);
                            arrayvalue.push(this.state.newData.technologyData[i].technology_id);
                        }
                        API.getTechnologyById({ technology_id: arrayvalue })
                            .then((findresponse) => {
                                if (findresponse) {
                                    console.log("technologyName response===", findresponse);
                                    this.setState({
                                        tId: findresponse.data.data
                                    })
                                    console.log("technologyName response===", this.state.tId);

                                } else {
                                    console.log("err", err);
                                    // Swal.fire("Something went wrong!", "", "warning");
                                }
                            }).catch((err) => {
                                Swal.fire("Something went wrong!", "", "warning");
                            });
                        console.log("techdata", this.state.techdata);
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });

        }

        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: 1,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid
            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        console.log("getAssignProjectTablePagination response===", this.state.paginationdata);
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: 1,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid
            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        // EventEmitter.dispatch('name', this.state.paginationdata);

                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }

        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: 1,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid
            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        console.log("getTaskTablePagination response===", this.state.paginationdata);
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: 1,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid
            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        // EventEmitter.dispatch('name', this.state.paginationdata);

                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }

        API.getUserCounts({ project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    // this.componentDidMount();
                    this.setState({
                        projectCount: findresponse.data.data
                    })
                    console.log("getAllAssignProjectCounts response===", this.state.projectCount);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getTaskCounts({ project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    // this.componentDidMount();
                    this.setState({
                        taskCount: findresponse.data.data
                    })
                    console.log("getTaskCounts response===", this.state.taskCount);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });




        API.getProjectsAssignData({ project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    console.log("getProjectsAssignData", findresponse);
                    this.setState({
                        assignData: findresponse.data.data
                    })
                    console.log("getProjectsAssignData response===", this.state.assignData);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getTasksByProjectId({ project_id: this.projectid })
            .then((findresponse) => {
                console.log("getTasksByProjectId response===", findresponse);
                if (findresponse) {
                    this.setState({
                        tasks: findresponse.data.data
                    })
                    console.log("getTasksByProjectId response===", this.state.tasks);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    handleChangeEvent(e) {
        localStorage.setItem('value', e.target.value);
        this.componentDidMount();
    }

    handleClick(event) {
        console.log("event current page number", event.target.id);
        if (this.state.currentPage <= event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid
            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid

            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    handleClickObjEvent(event) {
        console.log("event current page number", event.target.id);
        if (this.state.currentPage <= event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid

            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid

            }
            API.getAssignProjectTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {

                        console.log("getAssignProjectTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    handleClick1(event) {
        console.log("event current page number", event.target.id);
        if (this.state.currentPage <= event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid
            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid

            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    handleClick1ObjEvent(event) {
        console.log("event current page number", event.target.id);
        if (this.state.currentPage <= event.target.id) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: localStorage.getItem('value'),
                project_id: this.projectid

            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: event.target.id,
                dataPerPage: this.state.todosPerPage,
                project_id: this.projectid

            }
            API.getAllTaskDataTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {

                        console.log("getAllTaskDataTablePagination response===", findresponse);
                        this.setState({
                            taskpaginationdata: findresponse.data.data,
                            isFetch: true
                        })
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }


    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    searchUserTaskDataKeyUp(e) {
        API.searchTaskData({ searchkey: e.target.value, project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data,
                        isData: this.state.isData = true
                    })
                    console.log("searchdata=====", this.state.searchData);
                    // EventEmitter.dispatch('searchTaskData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    searchUsersDataKeyUp(e) {
        API.searchAssignProjectData({ searchkey: e.target.value, project_id: this.projectid })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchAssignData: findresponse.data.data,
                        isData: this.state.isData = true
                    })
                    console.log("searchdata=====", this.state.searchAssignData);

                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }


    render() {

        if (localStorage.getItem('value')) {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.projectCount / localStorage.getItem('value')); i++) {
                pageNumbers.push(i);
            }
            var renderPageNumbers = pageNumbers.map(number => {
                if (number === 1 && this.state.currentPage === 1) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" onClick={this.handleClickObjEvent}>{number}</a>
                        </li>
                    );
                }
                else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                    return (
                        <li className={this.state.currentPage === number ? 'active' : 'page-item'} key={number} id={number}><a className="page-link" id={number} onClick={this.handleClickObjEvent}>{number}</a></li>
                    )
                }
            });
        } else {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.projectCount / this.state.todosPerPage); i++) {
                pageNumbers.push(i);
            }
            var renderPageNumbers = pageNumbers.map(number => {
                if (number === 1 && this.state.currentPage === 1) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" onClick={this.handleClick}>{number}</a>
                        </li>
                    );
                }
                else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" id={number} onClick={this.handleClick}>{number}</a>
                        </li>
                    )
                }
            });
        }


        if (localStorage.getItem('value')) {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.taskCount / localStorage.getItem('value')); i++) {
                pageNumbers.push(i);
            }
            var renderTaskPageNumbers = pageNumbers.map(number => {
                if (number === 1 && this.state.currentPage === 1) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" onClick={this.handleClick1ObjEvent}>{number}</a>
                        </li>
                    );
                }
                else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                    return (
                        <li className={this.state.currentPage === number ? 'active' : 'page-item'} key={number} id={number}><a className="page-link" id={number} onClick={this.handleClick1ObjEvent}>{number}</a></li>
                    )
                }
            });
        } else {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.taskCount / this.state.todosPerPage); i++) {
                pageNumbers.push(i);
            }
            var renderTaskPageNumbers = pageNumbers.map(number => {
                if (number === 1 && this.state.currentPage === 1) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" onClick={this.handleClick1}>{number}</a>
                        </li>
                    );
                }
                else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                    return (
                        <li
                            key={number}
                            id={number}
                            className={this.state.currentPage === number ? 'active' : 'page-item'}
                        >
                            <a className="page-link" id={number} onClick={this.handleClick1}>{number}</a>
                        </li>
                    )
                }
            });
        }


        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
            </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
            </a>
                </li>
        }


        return (
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Row>
                                <Col md="4">
                                    <Link to="/listproject">
                                        <Button className="mb-2 mr-2" color="primary">
                                            Go back
                                </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardHeader>
                                            <CardTitle className="font">Project Detail</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Title:</h5>
                                                                <p>{data.title}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Budget:</h5>
                                                                <p>{data.budget} <i className="fas fa-dollar-sign"></i></p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Status:</h5>
                                                                <div className="btn_size">
                                                                    {
                                                                        data.status == "active" ? (
                                                                            <span className="badge badge-success">{data.status}</span>
                                                                        ) : (
                                                                                <span className="badge badge-danger">{data.status}</span>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Hours:</h5>
                                                                <p>{data.hours}</p>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                                <br />
                                                <h5 className="tech">Technologies:</h5>
                                                <Col md="12" className="flex">
                                                    {
                                                        this.state.tId.map((data, index) =>
                                                            <span className="left-flex" key={index}>
                                                                <p>{data.name}</p>
                                                            </span>
                                                        )
                                                    }
                                                </Col>
                                                <br />
                                                <Col md="12">
                                                    {
                                                        this.state.pdata.map((data, index) =>
                                                            <div key={index}>
                                                                <h5>Discription:</h5>
                                                                <span>{renderHTML(data.discription)}</span>
                                                            </div>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                {
                                    this.state.paginationdata.length ? (
                                        <Col md="6">
                                            <Card className="main-card mb-3">
                                                <CardHeader>
                                                    <CardTitle className="font">Project Users</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <Row>
                                                        <Col md="4">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    aria-label="Search"
                                                                    onKeyUp={this.searchUsersDataKeyUp}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="8">
                                                            <div className="lt">
                                                                <span>Records per page</span>
                                                                <CustomInput
                                                                    type="select"
                                                                    id="exampleCustomSelect"
                                                                    name="customSelect"
                                                                    onChange={this.handleChangeEvent}
                                                                >
                                                                    <option value="2">2</option>
                                                                    <option value="4">4</option>
                                                                </CustomInput>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <br />

                                                    {
                                                        this.state.isData == false ? (
                                                            <div>
                                                                {
                                                                    this.state.paginationdata ? (
                                                                        <div>
                                                                            <Table hover className="mb-0" bordered>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Name</th>
                                                                                        <th>Hours</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        this.state.paginationdata.map((data, index) =>
                                                                                            <tr key={index}>
                                                                                                <td>{data.name}</td>
                                                                                                <td>{data.hours}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                </tbody>
                                                                            </Table>
                                                                            <div>
                                                                                {
                                                                                    this.state.paginationdata ? (
                                                                                        <div>
                                                                                            <ul className="pagination" id="page-numbers">
                                                                                                {pageDecrementBtn}
                                                                                                {renderPageNumbers}
                                                                                                {pageIncrementBtn}
                                                                                            </ul>
                                                                                        </div>
                                                                                    ) : (
                                                                                            null
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                            <div>


                                                                                <Table hover className="mb-0" bordered>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Name</th>
                                                                                            <th>Hours</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {
                                                                                            this.state.assignData.map((data, index) =>
                                                                                                <tr key={index}>
                                                                                                    <td>{data.name}</td>
                                                                                                    <td>{data.hours}</td>
                                                                                                </tr>
                                                                                            )
                                                                                        }
                                                                                    </tbody>
                                                                                </Table>
                                                                                <div>
                                                                                    {
                                                                                        this.state.paginationdata ? (
                                                                                            <div>
                                                                                                <ul className="pagination" id="page-numbers">
                                                                                                    {pageDecrementBtn}
                                                                                                    {renderPageNumbers}
                                                                                                    {pageIncrementBtn}
                                                                                                </ul>
                                                                                            </div>
                                                                                        ) : (
                                                                                                null
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div>
                                                                    {
                                                                        this.state.searchAssignData ? (
                                                                            <div>
                                                                                <Table hover className="mb-0" bordered>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Name</th>
                                                                                            <th>Hours</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {
                                                                                            this.state.searchAssignData.map((data, index) =>
                                                                                                <tr key={index}>
                                                                                                    <td>{data.name}</td>
                                                                                                    <td>{data.hours}</td>
                                                                                                </tr>
                                                                                            )
                                                                                        }
                                                                                    </tbody>
                                                                                </Table>
                                                                                <div>
                                                                                    {
                                                                                        this.state.paginationdata ? (
                                                                                            <div>
                                                                                                <ul className="pagination" id="page-numbers">
                                                                                                    {pageDecrementBtn}
                                                                                                    {renderPageNumbers}
                                                                                                    {pageIncrementBtn}
                                                                                                </ul>
                                                                                            </div>
                                                                                        ) : (
                                                                                                null
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                                <div>


                                                                                    <Table hover className="mb-0" bordered>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>Name</th>
                                                                                                <th>Hours</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                this.state.assignData.map((data, index) =>
                                                                                                    <tr key={index}>
                                                                                                        <td>{data.name}</td>
                                                                                                        <td>{data.hours}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                    <div>
                                                                                        {
                                                                                            this.state.paginationdata ? (
                                                                                                <div>
                                                                                                    <ul className="pagination" id="page-numbers">
                                                                                                        {pageDecrementBtn}
                                                                                                        {renderPageNumbers}
                                                                                                        {pageIncrementBtn}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            ) : (
                                                                                                    null
                                                                                                )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            )
                                                    }


                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ) : (
                                            null
                                        )
                                }
                            </Row>

                            {
                                this.state.taskpaginationdata.length ? (
                                    <Row>
                                        <Col md="12">
                                            <Card className="main-card mb-3">
                                                <CardHeader>
                                                    <CardTitle className="font">Project Tasks</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <Row>

                                                        <Col md="4">
                                                            <div>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    aria-label="Search"
                                                                    onKeyUp={this.searchUserTaskDataKeyUp}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="8">
                                                            <div className="lt">
                                                                <span>Records per page</span>
                                                                <CustomInput
                                                                    type="select"
                                                                    id="exampleCustomSelect"
                                                                    name="customSelect"
                                                                    onChange={this.handleChangeEvent}
                                                                >
                                                                    <option value="2">2</option>
                                                                    <option value="4">4</option>
                                                                </CustomInput>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <br />

                                                    {
                                                        this.state.isData == false ? (
                                                            <div>
                                                                {
                                                                    this.state.taskpaginationdata ? (
                                                                        <div>
                                                                            <Table hover className="mb-0" bordered>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Name</th>
                                                                                        <th>Discription</th>
                                                                                        <th>Hours</th>
                                                                                        <th>status</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        this.state.taskpaginationdata.map((data, index) =>
                                                                                            <tr key={index}>
                                                                                                <td>{data.title}</td>
                                                                                                <td className="mg-0">{renderHTML(data.discription)}</td>
                                                                                                <td>{data.hours}</td>
                                                                                                <td>
                                                                                                    <div className="btn_size">
                                                                                                        {
                                                                                                            data.status == "active" ? (
                                                                                                                <span className="badge badge-success">{data.status}</span>
                                                                                                            ) : (
                                                                                                                    <span className="badge badge-danger">{data.status}</span>
                                                                                                                )
                                                                                                        }
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                </tbody>
                                                                            </Table>
                                                                            <div>
                                                                                {
                                                                                    this.state.taskpaginationdata ? (
                                                                                        <div>
                                                                                            <ul className="pagination" id="page-numbers">
                                                                                                {pageDecrementBtn}
                                                                                                {renderTaskPageNumbers}
                                                                                                {pageIncrementBtn}
                                                                                            </ul>
                                                                                        </div>
                                                                                    ) : (
                                                                                            null
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                            <div>
                                                                                <Table hover className="mb-0" bordered>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Name</th>
                                                                                            <th>Discription</th>
                                                                                            <th>Hours</th>
                                                                                            <th>status</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {
                                                                                            this.state.tasks.map((data, index) =>
                                                                                                <tr key={index}>
                                                                                                    <td>{data.title}</td>
                                                                                                    <td className="mg-0">{renderHTML(data.discription)}</td>
                                                                                                    <td>{data.hours}</td>
                                                                                                    <td>
                                                                                                        <div className="btn_size">
                                                                                                            {
                                                                                                                data.status == "active" ? (
                                                                                                                    <span className="badge badge-success">{data.status}</span>
                                                                                                                ) : (
                                                                                                                        <span className="badge badge-danger">{data.status}</span>
                                                                                                                    )
                                                                                                            }
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        }
                                                                                    </tbody>
                                                                                </Table>
                                                                                <div>
                                                                                    {
                                                                                        this.state.taskpaginationdata ? (
                                                                                            <div>
                                                                                                <ul className="pagination" id="page-numbers">
                                                                                                    {pageDecrementBtn}
                                                                                                    {renderTaskPageNumbers}
                                                                                                    {pageIncrementBtn}
                                                                                                </ul>
                                                                                            </div>
                                                                                        ) : (
                                                                                                null
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div>
                                                                    {
                                                                        this.state.searchData ? (
                                                                            <div>
                                                                                <Table hover className="mb-0" bordered>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Name</th>
                                                                                            <th>Discription</th>
                                                                                            <th>Hours</th>
                                                                                            <th>status</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {
                                                                                            this.state.searchData.map((data, index) =>
                                                                                                <tr key={index}>
                                                                                                    <td>{data.title}</td>
                                                                                                    <td className="mg-0">{renderHTML(data.discription)}</td>
                                                                                                    <td>{data.hours}</td>
                                                                                                    <td>
                                                                                                        <div className="btn_size">
                                                                                                            {
                                                                                                                data.status == "active" ? (
                                                                                                                    <span className="badge badge-success">{data.status}</span>
                                                                                                                ) : (
                                                                                                                        <span className="badge badge-danger">{data.status}</span>
                                                                                                                    )
                                                                                                            }
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                        }
                                                                                    </tbody>
                                                                                </Table>
                                                                                <div>
                                                                                    {
                                                                                        this.state.taskpaginationdata ? (
                                                                                            <div>
                                                                                                <ul className="pagination" id="page-numbers">
                                                                                                    {pageDecrementBtn}
                                                                                                    {renderTaskPageNumbers}
                                                                                                    {pageIncrementBtn}
                                                                                                </ul>
                                                                                            </div>
                                                                                        ) : (
                                                                                                null
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                                <div>
                                                                                    <Table hover className="mb-0" bordered>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>Name</th>
                                                                                                <th>Discription</th>
                                                                                                <th>Hours</th>
                                                                                                <th>status</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                this.state.tasks.map((data, index) =>
                                                                                                    <tr key={index}>
                                                                                                        <td>{data.title}</td>
                                                                                                        <td className="mg-0">{renderHTML(data.discription)}</td>
                                                                                                        <td>{data.hours}</td>
                                                                                                        <td>
                                                                                                            <div className="btn_size">
                                                                                                                {
                                                                                                                    data.status == "active" ? (
                                                                                                                        <span className="badge badge-success">{data.status}</span>
                                                                                                                    ) : (
                                                                                                                            <span className="badge badge-danger">{data.status}</span>
                                                                                                                        )
                                                                                                                }
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                    <div>
                                                                                        {
                                                                                            this.state.taskpaginationdata ? (
                                                                                                <div>
                                                                                                    <ul className="pagination" id="page-numbers">
                                                                                                        {pageDecrementBtn}
                                                                                                        {renderTaskPageNumbers}
                                                                                                        {pageIncrementBtn}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            ) : (
                                                                                                    null
                                                                                                )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            )
                                                    }


                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                ) : (
                                        null
                                    )
                            }
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewProject;