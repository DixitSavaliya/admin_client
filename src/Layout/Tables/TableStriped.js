import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import renderHTML from 'react-render-html';
import Swal from 'sweetalert2';
import API from '../../service';
import { EventEmitter } from '../../event';
import './table.css';

export default class TableStriped extends React.Component {
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
      taskCount: '',
      tasks: []
    }
    this.deleteTaskData = this.deleteTaskData.bind(this);
    this.editTaskData = this.editTaskData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickObjEvent = this.handleClickObjEvent.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);

    EventEmitter.subscribe('selectvalue', (value) => {
      console.log("value", value);
      localStorage.setItem('value', value);
      this.componentDidMount();
    });

    EventEmitter.subscribe('tasks', (data) => {
      console.log("tasks", data);
      this.setState({
        tasks: data
      })
      console.log("datatasks-----------", this.state.tasks)
    });


    EventEmitter.subscribe('searchTaskData', (data) => {
      this.setState({
        searchData: data,
        isData: true
      })
      console.log("datasearch====", this.state.searchData, this.state.isData);
    });

    EventEmitter.subscribe('_id', (id) => {
      console.log("projectid", id);
      localStorage.setItem('projectid', id);
      this.componentDidMount();
  });
  }

  componentDidMount() {
    API.getAllTasks()
      .then((findresponse) => {
        if (findresponse) {
          console.log("getAllTasks response===", findresponse);
        } else {
          console.log("err", err);
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });

    console.log("project_id", localStorage.getItem('projectid'));

    API.getTasksByProjectId({ project_id: localStorage.getItem('projectid') })
    .then((findresponse) => {
        console.log("getTasksByProjectId response===", findresponse);
        if (findresponse) {
           
            console.log("getTasksByProjectId response===",findresponse);
            // EventEmitter.dispatch('tasks', this.state.tasks);
        } else {
            console.log("err", err);
            // Swal.fire("Something went wrong!", "", "warning");
        }
    }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
    });

    API.getAllTasksCounts({ project_id: this.props.data[0].project_id })
      .then((findresponse) => {
        if (findresponse) {
          this.setState({
            taskCount: findresponse.data.data
          })
          console.log("projects response===", this.state.taskCount);
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
        dataPerPage: localStorage.getItem('value'),
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllTaskDataTablePagination response===", findresponse);
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
        dataPerPage: this.state.todosPerPage,
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllTaskDataTablePagination response===", findresponse);
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



  deleteTaskData(id) {
    API.deleteTaskById({ task_id: id })
      .then((findresponse) => {
        if (findresponse) {
          console.log("deleteTaskById response===", findresponse);
          Swal.fire("Task Deleted Successfully!", "", "success");
          this.componentDidMount();
        } else {
          Swal.fire("Something went wrong!", "", "warning");
        }
      }).catch((err) => {
        Swal.fire("Something went wrong!", "", "warning");
      });
  }

  editTaskData(id) {
    API.getTaskById({ task_id: id })
      .then((findresponse) => {
        if (findresponse) {
          console.log("getTaskById response===", findresponse);
          EventEmitter.dispatch('taskdata', findresponse);
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
        dataPerPage: localStorage.getItem('value'),
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
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
        dataPerPage: this.state.todosPerPage,
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
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
        dataPerPage: localStorage.getItem('value'),
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllTaskDataTablePagination response===", findresponse);
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
        project_id: this.props.data[0].project_id
      }
      API.getAllTaskDataTablePagination(obj)
        .then((findresponse) => {
          if (findresponse) {
            console.log("getAllTaskDataTablePagination response===", findresponse);
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

  render() {
    if (localStorage.getItem('value')) {
      var pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.state.taskCount / localStorage.getItem('value')); i++) {
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
      for (let i = 1; i <= Math.ceil(this.state.taskCount / this.state.todosPerPage); i++) {
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
    // this.componentDidMount();
    return (
      <div>
        {
          this.state.tasks ? (
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
                                <th>Hours</th>
                                <th>status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.paginationdata.map((data, index) =>
                                  <tr key={index}>
                                    <td>
                                      <span className="project_tabel">
                                        <i className="fas fa-pencil-alt" onClick={() => this.editTaskData(data.id)}></i>
                                        <i className="fas fa-times" onClick={() => this.deleteTaskData(data.id)}></i>
                                      </span>
                                    </td>
                                    <td>{data.title}</td>
                                    <td>{renderHTML(data.discription)}</td>
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
                            {
                              this.state.tasks ? (
                                <div>
                                  <Table hover className="mb-0" bordered>
                                    <thead>
                                      <tr>
                                        <th>Action</th>
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
                                            <td>
                                              <span className="project_tabel">
                                                <i className="fas fa-pencil-alt" onClick={() => this.editTaskData(data.id)}></i>
                                                <i className="fas fa-times" onClick={() => this.deleteTaskData(data.id)}></i>
                                              </span>
                                            </td>
                                            <td>{data.title}</td>
                                            <td>{renderHTML(data.discription)}</td>
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
                                  null
                                )
                            }
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
                                <td>
                                  <span className="project_tabel">
                                    <i className="fas fa-pencil-alt" onClick={() => this.editTaskData(data.id)}></i>
                                    <i className="fas fa-times" onClick={() => this.deleteTaskData(data.id)}></i>
                                  </span>
                                </td>
                                <td>{data.title}</td>
                                <td>{renderHTML(data.discription)}</td>
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
                    </div>
                  )
              }
            </div>
          ) : (
              null
            )
        }

      </div>
    );
  }
}
