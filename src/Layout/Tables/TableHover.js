import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
import './table.css';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableHover extends React.Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {
      check: false,
      isData: false,
      searchData: '',
      count: '',
      currentPage: 1,
      todosPerPage: 2,
      perpage: '',
      paginationdata: '',
      isFetch: false,
      data: '',
      allRecords: '',
      upperPageBound: 3,
      lowerPageBound: 0,
      pageBound: 3,
      isPrevBtnActive: 'disabled',
      isNextBtnActive: '',
    }

    this.checkAllHandler = this.checkAllHandler.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.deleteUserRoleData = this.deleteUserRoleData.bind(this);
    this.editUserRoleData = this.editUserRoleData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    // this.handleChangeStatus = this.handleChangeStatus.bind(this);

    EventEmitter.subscribe('searchData', (data) => {
      this.setState({
        searchData: data,
        isData: true
      })
      console.log("datasearch====", this.state.searchData, this.state.isData);
    });

    EventEmitter.subscribe('selectvalue', (value) => {
      console.log("value", value);
      localStorage.setItem('value', value);
      this.componentDidMount();
    });

    EventEmitter.subscribe('userroledataget', (data) => {
      console.log("value", data);
      this.componentDidMount();
    });

    EventEmitter.subscribe('isDeleted', (value) => {
      console.log("value", value);
      API.deleteUserRoleAllData({ value: true })
        .then((findresponse) => {
          if (findresponse) {
            console.log("deleteUserRoleAllData response===", findresponse);
            this.setState({
              allRecords: findresponse.data.data
            })
            console.log("allRecords", this.state.allRecords);
          } else {
            Swal.fire("Something went wrong!", "", "warning");
          }
        }).catch((err) => {
          Swal.fire("Something went wrong!", "", "warning");
        });
    });
  }

  componentDidMount() {
    API.getUserRoleData()
      .then((findresponse) => {
        if (findresponse) {

          console.log("user response===", findresponse);

        } else {
          // console.log("err", err);
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });

    API.getUserRoleDataCount()
      .then((findresponse) => {
        if (findresponse) {
          console.log("getUserRoleDataCount response===", findresponse);
          this.setState({
            count: findresponse.data.data
          })
        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });

    if (localStorage.getItem('value')) {
      const obj = {
        pageNumber: 1,
        dataPerPage: localStorage.getItem('value')
      }
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("deleteUserRoleDataById response===", findresponse);
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
        pageNumber: 1,
        dataPerPage: this.state.todosPerPage
      }
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("deleteUserRoleDataById response===", findresponse);
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

  checkAllHandler(event) {
    console.log("data", event.target.checked, event.target.id);
    if (event.target.checked == true) {
      this.setState({
        check: event.target.checked
      })
      EventEmitter.dispatch('checked', this.state.check);
    } else if (event.target.checked == false) {
      this.setState({
        check: event.target.checked
      })
      EventEmitter.dispatch('check', this.state.check);
    }
  }

  editUserRoleData(id) {
    EventEmitter.dispatch('roleId', id);
    API.getUserRoleByIdData({ user_role_id: id })
      .then((findresponse) => {
        if (findresponse) {
          console.log("getUserRoleData response===", findresponse);
          EventEmitter.dispatch('userroledata', findresponse);
        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });
  }

  deleteUserRoleData(id) {
    console.log("data", id);
    API.deleteUserRoleDataById({ user_role_id: id })
      .then((findresponse) => {
        if (findresponse) {
          console.log("deleteUserRoleDataById response===", findresponse);
          Swal.fire("UserRole Deleted Successfully!", "", "success");
          this.componentDidMount();

        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });
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
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("userRoleDataTablePagination response===", findresponse);
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
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("userRoleDataTablePagination response===", findresponse);
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
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("userRoleDataTablePagination response===", findresponse);
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
      API.userRoleDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("userRoleDataTablePagination response===", findresponse);
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

  handleChangeStatus(index) {
    console.log("id", index);
    // this.setState({
    //     check: !this.state.check
    // })
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
      for (let i = 1; i <= Math.ceil(this.state.count / localStorage.getItem('value')); i++) {
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
      for (let i = 1; i <= Math.ceil(this.state.count / this.state.todosPerPage); i++) {
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
                this.state.isFetch == true ? (
                  this.state.paginationdata ? (
                    <Table hover className="mb-0" bordered>
                      <thead>
                        <tr>
                          <th>
                            <CustomInput
                              name="name"
                              value="value"
                              type="checkbox"
                              id="exampleCustomCheckbox"
                              onClick={this.checkAllHandler}
                            />
                          </th>
                          <th>Action</th>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.paginationdata.map((data, index) =>
                            <tr key={index}>
                              <th scope="row">
                                {
                                  this.state.check == true ? (
                                    <span className="margin-t">
                                      <CustomInput
                                        type="checkbox"
                                        id={index}
                                        checked={this.state.check}
                                      />
                                    </span>
                                  ) : (
                                      <span className="margin-t">
                                        <CustomInput
                                          type="checkbox"
                                          id={index}
                                          onChange={this.handleChangeStatus.bind(this, index)}
                                        />
                                      </span>
                                    )
                                }
                              </th>
                              <td>
                                <span>
                                  <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                                  <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                                </span>
                              </td>
                              <td>{data.name}</td>
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
                  ) : (
                      <Table hover className="mb-0" bordered>
                        <thead>
                          <tr>
                            <th>
                              <CustomInput
                                name="name"
                                value="value"
                                type="checkbox"
                                id="exampleCustomCheckbox"
                                onClick={this.checkAllHandler}
                              />
                            </th>
                            <th>Action</th>
                            <th>Name</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </Table>
                    )
                ) : (
                    <Table hover className="mb-0" bordered>
                      <thead>
                        <tr>
                          <th>
                            <CustomInput
                              name="name"
                              value="value"
                              type="checkbox"
                              id="exampleCustomCheckbox"
                              onClick={this.checkAllHandler}
                            />
                          </th>
                          <th>Action</th>
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.data.map((data, index) =>
                            <tr key={index}>
                              <th scope="row">
                                {
                                  this.state.check == true ? (
                                    <span className="margin-t">
                                      <CustomInput
                                        name="name"
                                        type="checkbox"
                                        id={index}
                                        checked={this.state.check}
                                      />
                                    </span>
                                  ) : (
                                      <span className="margin-t">
                                        <CustomInput
                                          name="name"
                                          type="checkbox"
                                          id={index}
                                          onChange={this.handleChangeStatus.bind(this, index)}
                                        />
                                      </span>
                                    )
                                }
                              </th>
                              <td>
                                <span>
                                  <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                                  <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                                </span>
                              </td>
                              <td>{data.name}</td>
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
                  )
              }
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
          ) : (
              <div>
                <Table hover className="mb-0" bordered>
                  <thead>
                    <tr>
                      <th>
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          onClick={this.checkAllHandler}
                        />
                      </th>
                      <th>Action</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.searchData.map((data, index) =>
                        <tr key={index}>
                          <th scope="row">
                            {
                              this.state.check == true ? (
                                <span className="margin-t">
                                  <CustomInput
                                    type="checkbox"
                                    id={index}
                                    checked={this.state.check}
                                  />
                                </span>
                              ) : (
                                  <span className="margin-t">
                                    <CustomInput
                                      type="checkbox"
                                      id={index}
                                      onChange={this.handleChangeStatus.bind(this, index)}
                                    />
                                  </span>
                                )
                            }
                          </th>
                          <td>
                            <span>
                              <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                              <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                            </span>
                          </td>
                          <td>{data.name}</td>
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
              </div>
            )
        }
      </div>
    );
  }
}
