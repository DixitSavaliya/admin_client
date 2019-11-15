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
      checked: false,
      isData: false,
      searchData: '',
      count: '',
      currentPage: 1,
      todosPerPage: 2,
      paginationdata: '',
      isFetch: false,
      perpage:''
    }
    this.checkAllHandler = this.checkAllHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteUserRoleData = this.deleteUserRoleData.bind(this);
    this.editUserRoleData = this.editUserRoleData.bind(this);
    this.handleClick = this.handleClick.bind(this);

    EventEmitter.subscribe('searchData', (data) => {
      this.setState({
        searchData: data,
        isData: true
      })
      console.log("datasearch====", this.state.searchData, this.state.isData);
    });

    EventEmitter.subscribe('selectvalue', (value) => {
      console.log("value", value,this.state.todosPerPage);
      this.setState({
        todosPerPage: 4
      })
      console.log("selectvalue",this.state.todosPerPage);
      // this.componentDidMount();
    });
  }


  componentDidMount() {
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

    console.log("perpage", this.state.todosPerPage);
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

  checkAllHandler(event) {
    console.log("data", event.target.checked);
    if (event.target.checked == true) {
      this.setState({
        checked: true
      })
    } else {
      this.setState({
        checked: false
      })
    }
  }

  handleChange(event) {
    if (event.target.checked == true) {
      this.setState({
        checked: true
      })
    } else {
      this.setState({
        checked: false
      })
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
          window.location.href = "/userrole";

        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });
  }

  handleClick(event) {
    console.log("currentpage", event.target.id);
    const obj = {
      pageNumber: event.target.id,
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


  render() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.count / this.state.todosPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("pagenumber", pageNumbers);
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        {
          this.state.isData == false ? (
            <div>
              {
                this.state.isFetch == true ? (
                  <Table hover className="mb-0" bordered>
                    <thead>
                      <tr>
                        <th>
                          <CustomInput type="checkbox" id="exampleCustomCheckbox" onClick={this.checkAllHandler} />
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
                                this.state.checked == true ? (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" checked={this.state.checked} /></span>) : (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" /></span>)
                              }
                            </th>
                            <td>
                              <span>
                                <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                                <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                              </span>
                            </td>
                            <td><span>{data.name}</span></td>
                            <td>
                              <div className="btn_size">
                                {
                                  data.status == "active" ? (<Button className="mb-2 mr-2" color="success">
                                    {data.status}
                                  </Button>) : (<Button className="mb-2 mr-2" color="danger">
                                    {data.status}
                                  </Button>)
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
                            <CustomInput type="checkbox" id="exampleCustomCheckbox" onClick={this.checkAllHandler} />
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
                                  this.state.checked == true ? (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" checked={this.state.checked} /></span>) : (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" /></span>)
                                }
                              </th>
                              <td>
                                <span>
                                  <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                                  <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                                </span>
                              </td>
                              <td><span>{data.name}</span></td>
                              <td>
                                <div className="btn_size">
                                  {
                                    data.status == "active" ? (<Button className="mb-2 mr-2" color="success">
                                      {data.status}
                                    </Button>) : (<Button className="mb-2 mr-2" color="danger">
                                      {data.status}
                                    </Button>)
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

              <ul>
                {/* {renderTodos} */}
              </ul>
              <ul className="list" id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>

          ) : (
              <div>
                <Table hover className="mb-0" bordered>
                  <thead>
                    <tr>
                      <th>
                        <CustomInput type="checkbox" id="exampleCustomCheckbox" onClick={this.checkAllHandler} />
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
                              this.state.checked == true ? (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" checked={this.state.checked} /></span>) : (<span><CustomInput type="checkbox" id="exampleCustomCheckbox1" /></span>)
                            }
                          </th>
                          <td>
                            <span>
                              <i className="fas fa-pencil-alt" onClick={() => this.editUserRoleData(data.id)}></i>
                              <i className="fas fa-times" onClick={() => this.deleteUserRoleData(data.id)}></i>
                            </span>
                          </td>
                          <td><span>{data.name}</span></td>
                          <td>
                            <div className="btn_size">
                              {
                                data.status == "active" ? (<Button className="mb-2 mr-2" color="success">
                                  {data.status}
                                </Button>) : (<Button className="mb-2 mr-2" color="danger">
                                  {data.status}
                                </Button>)
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
