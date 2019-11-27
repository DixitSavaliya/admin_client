import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import API from '../../service';
import { EventEmitter } from '../../event';
import { Link } from "react-router-dom";
import renderHTML from 'react-render-html';
import history from '../../history';
import './table.css';
import Swal from 'sweetalert2';

export default class TableBordered extends React.Component {
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
      isData: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.editProjectData = this.editProjectData.bind(this);
    this.deleteProjectData = this.deleteProjectData.bind(this);

    EventEmitter.subscribe('selectvalue', (value) => {
      console.log("value", value);
      localStorage.setItem('value', value);
      this.componentDidMount();
    });

    EventEmitter.subscribe('searchData', (data) => {
      this.setState({
        searchData: data,
        isData: true
      })
      console.log("datasearch====", this.state.searchData, this.state.isData);
    });
  }

  componentDidMount() {
    API.getAllProjectsCounts()
      .then((findresponse) => {
        if (findresponse) {
          this.setState({
            projectCount: findresponse.data.data
          })
          console.log("projects response===", this.state.projectCount);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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
      API.getAllProjectDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllProjectDataTablePagination response===", findresponse);
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

  deleteProjectData(id) {
    API.deleteProjectById({ project_id: id })
      .then((findresponse) => {
        if (findresponse) {
          console.log("deleteProjectById response===", findresponse);
          Swal.fire("Project Deleted Successfully!", "", "success");
          this.componentDidMount();
        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });
  }

  editProjectData(id) {
    console.log("history", history)
    history.push('/editProject/' + id, { params: id }, { query: { id: id } })
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

    let pageIncrementBtn = null;
    if (pageNumbers.length > this.state.upperPageBound) {
      pageIncrementBtn = <li className='page-item'><a className='page-link' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn = null;
    if (this.state.lowerPageBound >= 1) {
      pageDecrementBtn = <li className='page-item'><a className='page-link' onClick={this.btnDecrementClick}> &hellip; </a></li>
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
                          <th>Name</th>
                          <th>Discription</th>
                          <th>Budget</th>
                          <th>Hours</th>
                          <th>status</th>
                          <th>Created-Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.paginationdata.map((data, index) =>
                            <tr key={index}>
                              <td>
                                <span className="project_tabel">
                                  <i className="fas fa-pencil-alt" onClick={() => this.editProjectData(data.id)}></i>
                                  <i className="fas fa-times" onClick={() => this.deleteProjectData(data.id)}></i>
                                </span>
                              </td>
                              <td><p>{data.title}</p></td>
                              <td>{renderHTML(data.discription)}</td>
                              <td><p>{data.budget} <i className="fas fa-rupee-sign"></i></p></td>
                              <td><p>{data.hours}</p></td>
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
                              <td><p>{data.created_date}</p></td>
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
                    <Table hover className="mb-0" bordered>
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Name</th>
                          <th>Discription</th>
                          <th>Budget</th>
                          <th>ProjectType</th>
                          <th>Hours</th>
                          <th>status</th>
                          <th>Created-Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.data.map((data, index) =>
                            <tr key={index}>
                              <td>
                                <span className="project_tabel">
                                  <i className="fas fa-pencil-alt" ></i>
                                  <i className="fas fa-times" ></i>
                                </span>
                              </td>
                              <td><p>{data.title}</p></td>
                              <td>{renderHTML(data.discription)}</td>
                              <td><p>{data.budget}</p></td>
                              <td><p>{data.project_type}</p></td>
                              <td><p>{data.hours}</p></td>
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
                              <td><p>{data.created_date}</p></td>
                            </tr>
                          )
                        }
                      </tbody>
                    </Table>
                  )
              }

            </div>
          ) : (
              <div>
                <Table hover className="mb-0" bordered>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Name</th>
                      <th>Discription</th>
                      <th>Budget</th>
                      <th>Hours</th>
                      <th>status</th>
                      <th>Created-Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.searchData.map((data, index) =>
                        <tr key={index}>
                          <td>
                            <span className="project_tabel">
                              <i className="fas fa-pencil-alt" onClick={() => this.editProjectData(data.id)}></i>
                              <i className="fas fa-times" onClick={() => this.deleteProjectData(data.id)}></i>
                            </span>
                          </td>
                          <td><p>{data.title}</p></td>
                          <td>{renderHTML(data.discription)}</td>
                          <td><p>{data.budget} <i className="fas fa-rupee-sign"></i></p></td>
                          <td><p>{data.hours}</p></td>
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
                          <td><p>{data.created_date}</p></td>
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
