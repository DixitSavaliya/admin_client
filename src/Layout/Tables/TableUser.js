import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import API from '../../service';
import history from '../../history';
import { EventEmitter } from '../../event';
import './table.css';

export default class TableUser extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            projectCount: '',
            currentPage: 1,
            todosPerPage: 2,
            upperPageBound: 3,
            lowerPageBound: 0,
            pageBound: 3,
            isFetch: false,
            paginationdata: [],
            editProjectData: [],
            searchData: '',
            isData: false,
            _count: '',
            assignProjectCount: '',
            pid: '',
            assignData: []
        }

        this.editUserData = this.editUserData.bind(this);
        this.deleteUserData = this.deleteUserData.bind(this);
        this.getUser = this.getUser.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.viewUserData = this.viewUserData.bind(this);

        EventEmitter.subscribe('selectvalue', (value) => {
            console.log("value", value);
            localStorage.setItem('value', value);
            this.componentDidMount();
        });

        EventEmitter.subscribe('searchUserData', (data) => {
            this.setState({
                searchData: data,
                isData: true
            })
            console.log("datasearch====", this.state.searchData, this.state.isData);
        });

        EventEmitter.subscribe('userid', (id) => {
            console.log("userid", id);
            this.componentDidMount();
        });
    }

    componentDidMount() {
        API.getAllUserCounts()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        _count: findresponse.data.data
                    })
                    console.log("projects response===", this.state._count);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });


        if (localStorage.getItem('value')) {
            const obj = {
                pageNumber: 1,
                dataPerPage: localStorage.getItem('value')
            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUserTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        console.log("getUserTablePagination response===", this.state.paginationdata);
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            const obj = {
                pageNumber: 1,
                dataPerPage: this.state.todosPerPage
            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUserTablePagination response===", findresponse);
                        this.setState({
                            paginationdata: findresponse.data.data,
                            isFetch: true
                        })
                        EventEmitter.dispatch('name', this.state.paginationdata);
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    getUser() {
        API.GetUser()
            .then((findresponse) => {
                if (findresponse) {
                    console.log("GetUser response===", findresponse);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    deleteUserData(id) {
        API.deleteUser({ user_id: id })
            .then((findresponse) => {
                if (findresponse) {
                    console.log("deleteUserData response===", findresponse);
                    Swal.fire("User Deleted Successfully!", "", "success");
                    this.componentDidMount();
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    editUserData(id) {
        console.log("history", history)
        history.push('/editUser/' + id, { params: id }, { query: { id: id } })
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
                dataPerPage: localStorage.getItem('value')

            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUserTablePagination response===", findresponse);
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
                dataPerPage: this.state.todosPerPage

            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUserTablePagination response===", findresponse);
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
                dataPerPage: localStorage.getItem('value')

            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getUserTablePagination response===", findresponse);
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
                dataPerPage: this.state.todosPerPage

            }
            API.getUserTablePagination(obj)
                .then((findresponse) => {
                    if (findresponse) {

                        console.log("getUserTablePagination response===", findresponse);
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

    viewUserData(id) {
        console.log("id",id);
        history.push('/viewuser', { params: id });
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

    render() {
        if (localStorage.getItem('value')) {
            var pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state._count / localStorage.getItem('value')); i++) {
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
            for (let i = 1; i <= Math.ceil(this.state._count / this.state.todosPerPage); i++) {
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
            <div>
                {
                    this.state.isData == false ? (
                        <div>
                            {
                                this.state.paginationdata ? (
                                    <div>
                                        <Table hover className="mb-0" bordered>
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>First_Name</th>
                                                    <th>Last_Name</th>
                                                    <th>E-Mail</th>
                                                    <th>Phone-Number</th>
                                                    <th>Gender</th>
                                                    <th>User_Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.paginationdata.map((data, index) =>
                                                        <tr key={index}>
                                                            <td>
                                                                <span className="project_tabel">
                                                                    <i className="fas fa-pencil-alt" onClick={() => this.editUserData(data.id)}></i>
                                                                    <i className="fas fa-times" onClick={() => this.deleteUserData(data.id)}></i>
                                                                </span>
                                                            </td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.first_name}</td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.last_name}</td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.email}</td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.mobile_number}</td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.gender}</td>
                                                            <td onClick={() => this.viewUserData(data.id)}>{data.user_role}</td>
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
                                                        <th>Action</th>
                                                        <th>First_Name</th>
                                                        <th>Last_Name</th>
                                                        <th>E-Mail</th>
                                                        <th>Phone-Number</th>
                                                        <th>Gender</th>
                                                        <th>User_Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.data.map((data, index) =>
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="project_tabel">
                                                                        <i className="fas fa-pencil-alt" onClick={() => this.editUserData(data.id)}></i>
                                                                        <i className="fas fa-times" onClick={() => this.deleteUserData(data.id)}></i>
                                                                    </span>
                                                                </td>
                                                                <td>{data.first_name}</td>
                                                                <td>{data.last_name}</td>
                                                                <td>{data.email}</td>
                                                                <td>{data.mobile_number}</td>
                                                                <td>{data.gender}</td>
                                                                <td>{data.user_role}</td>
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
                                <Table hover className="mb-0" bordered>
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>First_Name</th>
                                            <th>Last_Name</th>
                                            <th>E-Mail</th>
                                            <th>Phone-Number</th>
                                            <th>Gender</th>
                                            <th>User_Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.searchData.map((data, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        <span className="project_tabel">
                                                            <i className="fas fa-pencil-alt" onClick={() => this.editUserData(data.id)}></i>
                                                            <i className="fas fa-times" onClick={() => this.deleteUserData(data.id)}></i>
                                                        </span>
                                                    </td>
                                                    <td>{data.first_name}</td>
                                                    <td>{data.last_name}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.mobile_number}</td>
                                                    <td>{data.gender}</td>
                                                    <td>{data.user_role}</td>
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
        );
    }
}