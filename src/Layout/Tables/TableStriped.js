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
      isData: false
    }
    this.deleteTaskData = this.deleteTaskData.bind(this);
    this.editTaskData = this.editTaskData.bind(this);
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

  render() {
    return (
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
            this.props.data.map((data, index) =>
              <tr key={index}>
                <td>
                  <span className="project_tabel">
                    <i className="fas fa-pencil-alt" onClick={() => this.editTaskData(data.id)}></i>
                    <i className="fas fa-times" onClick={() => this.deleteTaskData(data.id)}></i>
                  </span>
                </td>
                <td><p>{data.title}</p></td>
                <td>{renderHTML(data.discription)}</td>
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
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}
