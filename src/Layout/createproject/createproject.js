import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import TableStriped from '../Tables/TableStriped';
import TypeAhead from '../../DemoPages/Components/Typeahead/Typeahead';
import history from '../../history';
import API from '../../service';
import Multiselect from 'multiselect-dropdown-react';

import { Link } from "react-router-dom";
import { EventEmitter } from '../../event';
import './createproject.css';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, Form, FormGroup, Label, Table, Input, Button, CardHeader
} from 'reactstrap';
import TableProject from '../Tables/TableProject';

class CreateProject extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            technology: [],
            title: '',
            titleerror: '',
            discription: '',
            discriptionerror: '',
            budget: '',
            budgeterror: '',
            projecttype: '',
            projecttypeerror: '',
            hours: '',
            hourserror: '',
            multiple: true,
            apiPath: 'User/getTechnology',
            selecttechnology: '',
            selecttechnologyerror: '',
            status: '',
            statuserror: '',
            createdDate: new Date(),
            statuscheck1: false,
            statuscheck2: false,
            typename: '',
            newData: [],
            technologyName: '',
            tasktitle: '',
            tasktitleerror: '',
            taskdiscription: '',
            taskdiscriptionerror: '',
            taskhours: '',
            taskhourserror: '',
            taskstatus: '',
            taskstatuserror: '',
            taskstatuscheck1: false,
            taskstatuscheck2: false,
            taskeditdata: [],
            tasks: [],
            buttonVisiblity: false,
            task_id: '',
            searchData: '',
            searchAssignData: '',
            projectManager: [],
            pmId: '',
            pmName: '',
            pmNameerror: '',
            projectassignhours: '',
            projectassignhourserror: '',
            assignData: [],
            visiblity: false,
            project_assign_id: '',
            assignProjectCount: '',
            pagination: '',
            tharray: '',
            dataTg: '',
            tname: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.createProject = this.createProject.bind(this);
        this.createTask = this.createTask.bind(this);
        this.id = localStorage.getItem('userid');
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeTaskStatus = this.handleChangeTaskStatus.bind(this);
        this.handleChangeStatusName = this.handleChangeStatusName.bind(this);
        this.handleChangeStatusTaskName = this.handleChangeStatusTaskName.bind(this);
        this.editProject = this.editProject.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleTaskEditorChange = this.handleTaskEditorChange.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.searchTaskDataKeyUp = this.searchTaskDataKeyUp.bind(this);
        this.handleProjectAssignHours = this.handleProjectAssignHours.bind(this);
        this.projectAssign = this.projectAssign.bind(this);
        this.editprojectAssign = this.editprojectAssign.bind(this);
        this.searchAssignProjectKeyUp = this.searchAssignProjectKeyUp.bind(this);
        this.handleChangeAssignProjectEvent = this.handleChangeAssignProjectEvent.bind(this);
        this.array = [];
        EventEmitter.subscribe('taskdata', (data) => {
            if (data.data.data[0].status == "active") {
                this.setState({
                    tasktitle: data.data.data[0].title,
                    taskdiscription: data.data.data[0].discription,
                    taskhours: data.data.data[0].hours,
                    taskstatus: data.data.data[0].status,
                    taskstatuscheck1: true,
                    buttonVisiblity: this.state.buttonVisiblity = true,
                    task_id: data.data.data[0].id
                })
            } else if (data.data.data[0].status == "inactive") {
                this.setState({
                    tasktitle: data.data.data[0].title,
                    taskdiscription: data.data.data[0].discription,
                    taskhours: data.data.data[0].hours,
                    taskstatus: data.data.data[0].status,
                    taskstatuscheck2: true,
                    buttonVisiblity: this.state.buttonVisiblity = true,
                    task_id: data.data.data[0].id
                })
            }
        });

        EventEmitter.subscribe('assignProjectdata', (data) => {
            this.setState({
                projectassignhours: data.data.data[0].hours,
                pmName: data.data.data[0].name,
                visiblity: this.state.visiblity = true,
                project_assign_id: data.data.data[0].id
            })
        });

        EventEmitter.subscribe('name', (data) => {
            this.setState({
                pagination: this.state.pagination = data
            })
        });

        EventEmitter.subscribe('tgarray', (dataarray) => {
            var array = [];
            console.log("data", dataarray);
            for (var i = 0; i < dataarray.length; i++) {
                array.push(((dataarray[i].id).toString()))
            }
            this.setState({
                tharray: this.state.tharray = array
            })
            this.componentDidMount();
        });

    }

    componentDidMount() {
        console.log("this.arry", this.state.tharray);
        API.getTechnology()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        technology: findresponse.data.data
                    })
                    console.log("technology response===", this.state.technology);
                    EventEmitter.dispatch('technologies', this.state.technology);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getTasksByProjectId({ project_id: this.props.location.pathname.split('/')[2] })
            .then((findresponse) => {
                console.log("getTasksByProjectId response===", findresponse);
                if (findresponse) {
                    this.setState({
                        tasks: findresponse.data.data
                    })
                    console.log("getTasksByProjectId response===", this.state.tasks);
                    EventEmitter.dispatch('_id', this.props.location.pathname.split('/')[2]);
                    EventEmitter.dispatch('tasks', this.state.tasks);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getAllProjectManager({ user_type: 2 })
            .then((findresponse) => {
                console.log("getAllProjectManager response===", findresponse);
                if (findresponse) {
                    this.setState({
                        projectManager: findresponse.data.data
                    })
                    console.log("getAllProjectManager response===", this.state.projectManager);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        API.getProjectsAssignData({ project_id: this.props.location.pathname.split('/')[2] })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        assignData: findresponse.data.data
                    })
                    console.log("technology response===", this.state.assignData);
                    EventEmitter.dispatch('project_id', this.props.location.pathname.split('/')[2]);
                } else {
                    console.log("err", err);
                    // Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });

        if (this.props.location.pathname.split('/')[2]) {
            API.getProjectByIdData({ project_id: this.props.location.pathname.split('/')[2] })
                .then((findresponse) => {
                    if (findresponse) {
                        console.log("getProjectByIdData response===", findresponse);
                        this.setState({
                            newData: findresponse.data.data
                        })

                        console.log("projectdata", this.state.newData.projectData[0])
                        var arrayvalue = [];
                        for (var i = 0; i < this.state.newData.technologyData.length; i++) {
                            console.log("technologyName", this.state.newData.technologyData[i].technology_id);
                            arrayvalue.push(this.state.newData.technologyData[i].technology_id);
                        }
                        console.log("arrayvalue", arrayvalue);
                        API.getTechnologyById({ technology_id: arrayvalue })
                            .then((findresponse) => {
                                if (findresponse) {
                                    console.log("technologyName response===", findresponse);
                                    this.setState({
                                        tname: findresponse.data.data
                                    })
                                    console.log("technologyName response===", this.state.tname);

                                    EventEmitter.dispatch('tname', this.state.tname);
                                } else {
                                    console.log("err", err);
                                    // Swal.fire("Something went wrong!", "", "warning");
                                }
                            }).catch((err) => {
                                Swal.fire("Something went wrong!", "", "warning");
                            });

                        if (this.state.newData.projectData[0].status == "active") {
                            this.setState({
                                title: this.state.newData.projectData[0].title,
                                discription: this.state.newData.projectData[0].discription,
                                hours: this.state.newData.projectData[0].hours,
                                projecttype: this.state.newData.projectData[0].project_type,
                                budget: this.state.newData.projectData[0].budget,
                                // selecttechnology: this.state.newData.technology_id,
                                status: this.state.newData.projectData[0].status,
                                statuscheck1: this.state.statuscheck1 = true
                            })
                        } else if (this.state.newData.projectData[0].status == "inactive") {
                            this.setState({
                                title: this.state.newData.projectData[0].title,
                                discription: this.state.newData.projectData[0].discription,
                                hours: this.state.newData.projectData[0].hours,
                                projecttype: this.state.newData.projectData[0].project_type,
                                budget: this.state.newData.projectData[0].budget,
                                // selecttechnology: this.state.newData.technology_id,
                                status: this.state.newData.projectData[0].status,
                                statuscheck2: this.state.statuscheck2 = true
                            })
                        }
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        }
    }

    /** onChange event  */
    handleChange(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleTaskChange(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onItemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            projecttype: this.state.projecttype = _id
        })
    }

    onTechnologySelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            selecttechnology: this.state.selecttechnology = _id
        })
    }

    handleChangeStatus(event) {
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: "active"
        })
        console.log("active", this.state.status);
    }

    handleChangeTaskStatus(event) {
        this.setState({
            taskstatuscheck1: this.state.taskstatuscheck1 = event.target.checked,
            taskstatus: "active"
        })
        console.log("active", this.state.taskstatus);
    }

    handleChangeStatusName(event) {
        this.setState({
            statuscheck2: this.state.statuscheck2 = event.target.checked,
            status: "inactive"
        })
        console.log("inactive", this.state.status);
    }

    handleChangeStatusTaskName(event) {
        this.setState({
            taskstatuscheck2: this.state.taskstatuscheck2 = event.target.checked,
            taskstatus: "inactive"
        })
        console.log("inactive", this.state.taskstatus);
    }

    handleEditorChange(e) {
        console.log('Content was updated:', e.target.getContent());
        this.setState({ discription: e.target.getContent() });

    }

    handleTaskEditorChange(e) {
        console.log('Content was updated:', e.target.getContent());
        this.setState({ taskdiscription: e.target.getContent() });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('selectvalue', e.target.value);
    }

    onProjectManagerSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        let pmName1 = event.target.options[event.target.selectedIndex].innerHTML;
        this.setState({
            pmId: this.state.pmId = _id,
            pmName: this.state.pmName = pmName1
        })
    }

    handleProjectAssignHours(event) {
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeAssignProjectEvent(e) {
        EventEmitter.dispatch('selectvalue', e.target.value);
    }

    /** validation of createproject form */
    validate = () => {
        let titleerror = "";
        let discriptionerror = "";
        let budgeterror = "";
        let projecttypeerror = "";
        let hourserror = "";
        let selecttechnologyerror = "";
        let statuserror = "";

        if (!this.state.title) {
            titleerror = "please enter title";
        }

        if (!this.state.discription) {
            discriptionerror = "please enter discription";
        }

        if (!this.state.budget) {
            budgeterror = "please enter budget";
        }

        if (!this.state.projecttype) {
            projecttypeerror = "please enter projecttype";
        }

        var regexp = /^\d+(\.\d{1,2})?$/;
        if (!this.state.hours) {
            hourserror = "please enter hours";
        } else if (!regexp.test(this.state.hours)) {
            hourserror = "please enter valid hours";
        }

        // if (!this.state.selecttechnology) {
        //     selecttechnologyerror = "please enter selecttechnology";
        // }

        if (!this.state.status) {
            statuserror = "please enter status";
        }

        if (titleerror || statuserror || discriptionerror || budgeterror || projecttypeerror || hourserror) {
            this.setState({ titleerror, statuserror, discriptionerror, budgeterror, projecttypeerror, hourserror });
            return false;
        }
        return true;
    };

    /** validation of createproject form */
    validateTask = () => {
        let tasktitleerror = "";
        let taskdiscriptionerror = "";
        let taskhourserror = "";
        let taskstatuserror = "";

        if (!this.state.tasktitle) {
            tasktitleerror = "please enter title";
        }

        if (!this.state.taskdiscription) {
            taskdiscriptionerror = "please enter discription";
        }

        var regexp = /^\d+(\.\d{1,2})?$/;
        if (!this.state.taskhours) {
            taskhourserror = "please enter hours";
        } else if (!regexp.test(this.state.taskhours)) {
            taskhourserror = "please enter valid hours";
        }


        if (!this.state.taskstatus) {
            taskstatuserror = "please enter status";
        }

        if (tasktitleerror || taskdiscriptionerror || taskhourserror || taskstatuserror) {
            this.setState({ tasktitleerror, taskdiscriptionerror, taskhourserror, taskstatuserror });
            return false;
        }
        return true;
    };

    validateProjectAssign = () => {
        let pmNameerror = "";
        let projectassignhourserror = "";

        if (!this.state.pmName) {
            pmNameerror = "please select name";
        }

        var regexp = /^\d+(\.\d{1,2})?$/;
        if (!this.state.projectassignhours) {
            projectassignhourserror = "please enter hours";
        } else if (!regexp.test(this.state.projectassignhours)) {
            projectassignhourserror = "please enter valid hours";
        }

        if (pmNameerror || projectassignhourserror) {
            this.setState({ pmNameerror, projectassignhourserror });
            return false;
        }
        return true;
    };

    createProject() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                title: '',
                titleerror: '',
                discription: '',
                discriptionerror: '',
                budget: '',
                budgeterror: '',
                projecttype: '',
                projecttypeerror: '',
                hours: '',
                hourserror: '',
                selecttechnology: '',
                selecttechnologyerror: '',
                status: '',
                statuserror: ''
            })
            if (this.state.title && this.state.discription && this.state.hours && this.state.budget && this.state.projecttype && this.state.tharray && this.state.status) {
                const obj = {
                    owner_id: this.id,
                    title: this.state.title,
                    discription: this.state.discription,
                    budget: this.state.budget,
                    project_type: this.state.projecttype,
                    hours: this.state.hours,
                    technology_id: this.state.tharray,
                    status: this.state.status,
                    created_date: this.state.createdDate
                }
                console.log("obj", obj)
                API.CreateProject(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("technology response===", findresponse);
                            Swal.fire("Project Created Successfully!", "", "success");
                            history.push('/listproject');
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };
    }

    editProject() {
        console.log("this.arry", this.state.tharray);
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                title: '',
                titleerror: '',
                discription: '',
                discriptionerror: '',
                budget: '',
                budgeterror: '',
                projecttype: '',
                projecttypeerror: '',
                hours: '',
                hourserror: '',
                // selecttechnology: '',
                // selecttechnologyerror: '',
                status: '',
                statuserror: ''
            })
            if (this.state.title && this.state.discription && this.state.hours && this.state.budget && this.state.status && this.state.projecttype) {
                const obj = {
                    project_id: this.props.location.pathname.split('/')[2],
                    owner_id: this.id,
                    title: this.state.title,
                    discription: this.state.discription,
                    budget: this.state.budget,
                    project_type: this.state.newData.project_type,
                    hours: this.state.hours,
                    technology_id: this.state.tharray,
                    status: this.state.status,
                    created_date: this.state.createdDate
                }
                console.log("obj", obj);
                API.EditProject(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("technology response===", findresponse);
                            Swal.fire("Project Edited Successfully!", "", "success");
                            history.push('/listproject');
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };

    }

    createTask() {
        const isValid = this.validateTask();
        if (isValid) {
            this.setState({
                tasktitle: '',
                tasktitleerror: '',
                taskdiscription: '',
                taskdiscriptionerror: '',
                taskhours: '',
                taskhourserror: '',
                taskstatus: '',
                taskstatuserror: '',
                taskstatuscheck1: this.state.taskstatuscheck1 = false,
                taskstatuscheck2: this.state.taskstatuscheck2 = false
            })
            if (this.state.tasktitle && this.state.taskdiscription && this.state.taskhours && this.state.taskstatus) {
                const obj = {
                    user_id: this.id,
                    title: this.state.tasktitle,
                    discription: this.state.taskdiscription,
                    hours: this.state.taskhours,
                    status: this.state.taskstatus,
                    project_id: this.props.location.pathname.split('/')[2]
                }
                API.CreateTask(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("CreateTask response===", findresponse);
                            this.setState({
                                taskstatuscheck1: this.state.taskstatuscheck1 = false,
                                taskstatuscheck2: this.state.taskstatuscheck2 = false
                            })
                            Swal.fire("Task Created Successfully!", "", "success");
                            this.componentDidMount();
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };

    }

    editTask() {
        const isValid = this.validateTask();
        if (isValid) {
            this.setState({
                tasktitle: '',
                tasktitleerror: '',
                taskdiscription: '',
                taskdiscriptionerror: '',
                taskhours: '',
                taskhourserror: '',
                taskstatus: '',
                taskstatuserror: '',

            })
            if (this.state.tasktitle && this.state.taskdiscription && this.state.taskhours && this.state.taskstatus) {
                const obj = {
                    task_id: this.state.task_id,
                    user_id: this.id,
                    title: this.state.tasktitle,
                    discription: this.state.taskdiscription,
                    hours: this.state.taskhours,
                    status: this.state.taskstatus,
                    project_id: this.props.location.pathname.split('/')[2]
                }
                API.EditTask(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("EditTask response===", findresponse);
                            this.setState({
                                taskstatuscheck1: this.state.taskstatuscheck1 = false,
                                taskstatuscheck2: this.state.taskstatuscheck2 = false,
                                buttonVisiblity: this.state.buttonVisiblity = false
                            })
                            Swal.fire("Task Edited Successfully!", "", "success");
                            this.componentDidMount();
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };

    }

    searchTaskDataKeyUp(e) {
        API.searchTaskData({ searchkey: e.target.value, project_id: this.props.location.pathname.split('/')[2] })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchData: findresponse.data.data
                    })
                    console.log("searchdata=====", this.state.searchData);
                    EventEmitter.dispatch('searchTaskData', this.state.searchData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    projectAssign() {
        const isValid = this.validateProjectAssign();
        if (isValid) {
            this.setState({
                pmName: '',
                pmNameerror: '',
                projectassignhours: '',
                projectassignhourserror: ''
            })

            if (this.state.assignData.length) {
                for (var i = 0; i < this.state.assignData.length; i++) {
                    if (this.state.assignData[i].name == this.state.pmName) {
                        console.log("assigndata", this.state.assignData[i].name == this.state.pmName)
                        Swal.fire({
                            html: "Already Assign Project To " + "" + this.state.pmName + "!"
                        });
                        return true;
                    }

                }
            }
            if (this.state.pmName && this.state.projectassignhours) {
                const obj = {
                    name: this.state.pmName,
                    user_id: this.state.pmId,
                    project_id: this.props.location.pathname.split('/')[2],
                    hours: this.state.projectassignhours
                }
                console.log("obj", obj);
                API.projectAssignData(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("projectAssignData=====", findresponse);
                            Swal.fire("Project Assign To ProjectManager Successfully!", "", "success");
                            this.componentDidMount();
                        } else {
                            Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please select field first!", "", "warning");
            }
            return false;
        };

    }

    editprojectAssign() {
        const isValid = this.validateProjectAssign();
        if (isValid) {
            this.setState({
                pmName: '',
                pmNameerror: '',
                projectassignhours: '',
                projectassignhourserror: ''
            })
            if (this.state.pmName && this.state.projectassignhours) {
                console.log("pmname", this.state.pmName);
                const obj = {
                    name: this.state.pmName,
                    user_id: this.state.pmId,
                    project_id: this.props.location.pathname.split('/')[2],
                    hours: this.state.projectassignhours,
                    project_assign_id: this.state.project_assign_id
                }
                console.log("obj", obj);
                API.EditProjectAssignData(obj)
                    .then((findresponse) => {
                        if (findresponse) {
                            console.log("EditProjectAssignData response===", findresponse);
                            this.setState({
                                visiblity: this.state.visiblity = false
                            })
                            Swal.fire("Assign Project To ProjectManager Edited Successfully!", "", "success");
                            this.componentDidMount();
                        } else {
                            console.log("err", err);
                            // Swal.fire("Something went wrong!", "", "warning");
                        }
                    }).catch((err) => {
                        Swal.fire("Something went wrong!", "", "warning");
                    });
            } else {
                Swal.fire("Please enter field first!", "", "warning");
            }
        };


    }

    searchAssignProjectKeyUp(e) {
        API.searchAssignProjectData({ searchkey: e.target.value, project_id: this.props.location.pathname.split('/')[2] })
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        searchAssignData: findresponse.data.data
                    })
                    console.log("searchdata=====", this.state.searchAssignData);
                    EventEmitter.dispatch('searchAssignData', this.state.searchAssignData);
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
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
                            {
                                this.props.location.pathname.split('/')[2] ? (
                                    <div>
                                        <Row>
                                            <Col md="4">
                                                <Link to="/listproject"><Button className="mb-2 mr-2" color="primary">
                                                    Go back
                                </Button></Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Card className="main-card mb-3">
                                                    {
                                                        this.props.location.pathname.split('/')[2] ? (
                                                            <CardHeader> <CardTitle className="font">Edit-Project</CardTitle></CardHeader>
                                                        ) : (
                                                                <CardHeader> <CardTitle className="font">Create-Project</CardTitle></CardHeader>
                                                            )
                                                    }
                                                    <CardBody>
                                                        <Form>
                                                            <Row>
                                                                <Col md="4">
                                                                    <FormGroup>
                                                                        <Label>Title:</Label>
                                                                        <Input
                                                                            type="text"
                                                                            name="title"
                                                                            className="form-control"
                                                                            value={this.state.title}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.titleerror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="4">
                                                                    <FormGroup>
                                                                        <Label>Budget:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="budget"
                                                                            className="form-control"
                                                                            value={this.state.budget}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.budgeterror}
                                                                        </div>
                                                                    </FormGroup>

                                                                </Col>
                                                                <Col md="4">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label for="exampleCustomSelect">Select Project-Type:</Label>
                                                                                <CustomInput
                                                                                    type="select"
                                                                                    id="exampleCustomSelect"
                                                                                    name="projecttype"
                                                                                    defaultValue={this.state.newData.project_type == "1" ? "Fixed" : "hourly"}
                                                                                    onChange={() => this.onItemSelect(event)}
                                                                                >
                                                                                    <option value="0">hourly</option>
                                                                                    <option value="1">Fixed</option>

                                                                                </CustomInput>
                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.projecttypeerror}
                                                                                </div>
                                                                            </FormGroup>

                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <Label for="exampleCustomSelect">Select Project-Type:</Label>
                                                                                    <CustomInput
                                                                                        type="select"
                                                                                        id="exampleCustomSelect"
                                                                                        name="projecttype"
                                                                                        onChange={() => this.onItemSelect(event)}
                                                                                    >
                                                                                        <option value="">Select Type:</option>
                                                                                        <option value="1">Fixed</option>
                                                                                        <option value="0">hourly</option>
                                                                                    </CustomInput>
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.projecttypeerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label>Hours:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="hours"
                                                                            className="form-control"
                                                                            value={this.state.hours}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.hourserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label>Select Status:</Label>
                                                                        <div>
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio"
                                                                                name="status"
                                                                                value={this.state.status}
                                                                                onChange={this.handleChangeStatus}
                                                                                checked={this.state.statuscheck1}
                                                                                label="Active" inline />
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio1"
                                                                                value={this.state.status}
                                                                                name="status"
                                                                                checked={this.state.statuscheck2}
                                                                                onChange={this.handleChangeStatusName}
                                                                                label="InActive" inline />
                                                                        </div>
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.statuserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label for="exampleCustomSelect">Select Technology:</Label>
                                                                                <TypeAhead data={this.state.multiple} api={this.state.apiPath} th={this.state.technology} name={this.state.tname} />

                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.selecttechnologyerror}
                                                                                </div>
                                                                            </FormGroup>
                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <TypeAhead data={this.state.multiple} api={this.state.apiPath} th={this.state.technology} name={this.state.tname} />

                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.selecttechnologyerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label>Description:</Label>
                                                                                <Editor
                                                                                    init={{
                                                                                        plugins: 'link image code',
                                                                                        toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                                                                                    }}
                                                                                    value={this.state.discription}
                                                                                    onChange={this.handleEditorChange} />

                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.discriptionerror}
                                                                                </div>
                                                                            </FormGroup>
                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <Label>Description:</Label>
                                                                                    <Editor
                                                                                        init={{
                                                                                            plugins: 'link image code',
                                                                                            toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                                                                                        }}
                                                                                        onChange={this.handleEditorChange} />
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.discriptionerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            {
                                                                this.props.location.pathname.split('/')[2] ? (
                                                                    <Button
                                                                        color="primary"
                                                                        className="mt-1"
                                                                        onClick={this.editProject}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                ) : (
                                                                        <Button
                                                                            color="primary"
                                                                            className="mt-1"
                                                                            onClick={this.createProject}
                                                                        >
                                                                            Create
                                                                        </Button>
                                                                    )
                                                            }
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5">
                                                <Card className="main-card mb-3">
                                                    {
                                                        this.state.buttonVisiblity == true ? (
                                                            <CardHeader> <CardTitle className="font">Update-Task</CardTitle></CardHeader>
                                                        ) : (
                                                                <CardHeader> <CardTitle className="font">Create-Task</CardTitle></CardHeader>
                                                            )
                                                    }
                                                    <CardBody>
                                                        <Form>
                                                            <Row>
                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label>Title:</Label>
                                                                        <Input
                                                                            type="text"
                                                                            name="tasktitle"
                                                                            className="form-control"
                                                                            value={this.state.tasktitle}
                                                                            onChange={this.handleTaskChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.tasktitleerror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>

                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label>Hours:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="taskhours"
                                                                            className="form-control"
                                                                            value={this.state.taskhours}
                                                                            onChange={this.handleTaskChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.taskhourserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label>Select Status:</Label>
                                                                        <div>
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio21"
                                                                                name="taskstatus"
                                                                                value={this.state.taskstatus}
                                                                                onChange={this.handleChangeTaskStatus}
                                                                                checked={this.state.taskstatuscheck1}
                                                                                label="Active" inline />
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio31"
                                                                                value={this.state.taskstatus}
                                                                                name="taskstatus"
                                                                                checked={this.state.taskstatuscheck2}
                                                                                onChange={this.handleChangeStatusTaskName}
                                                                                label="InActive" inline />
                                                                        </div>
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.taskstatuserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>

                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label>Description:</Label>
                                                                        <Editor
                                                                            init={{
                                                                                plugins: 'link image code',
                                                                                toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                                                                            }}
                                                                            value={this.state.taskdiscription}
                                                                            onChange={this.handleTaskEditorChange} />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.taskdiscriptionerror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            {
                                                                this.state.buttonVisiblity == true ? (
                                                                    <Button
                                                                        color="primary"
                                                                        className="mt-1"
                                                                        onClick={this.editTask}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                ) : (
                                                                        <Button
                                                                            color="primary"
                                                                            className="mt-1"
                                                                            onClick={this.createTask}
                                                                        >
                                                                            Create
                                                                        </Button>
                                                                    )
                                                            }
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col md="7">
                                                {
                                                    this.state.tasks.length ? (
                                                        <Card className="main-card mb-3">
                                                            <CardHeader> <CardTitle className="font">Task-List-Table</CardTitle></CardHeader>
                                                            <CardBody>
                                                                <div>
                                                                    <Row>
                                                                        {/* <Col md="2">
                                                                        <div className="right">
                                                                            <Link to="/editproject/"><Button className="mb-2 mr-2" color="primary">
                                                                                Add
                                                                </Button></Link>
                                                                        </div>
                                                                    </Col> */}
                                                                        <Col md="6">
                                                                            <div>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    placeholder="Search"
                                                                                    aria-label="Search"
                                                                                    onKeyUp={this.searchTaskDataKeyUp} />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="6">
                                                                            <div className="rt">
                                                                                <span>Records per page</span>
                                                                                <CustomInput
                                                                                    type="select"
                                                                                    id="exampleCustomSelect"
                                                                                    name="customSelect"
                                                                                    onChange={this.handleChangeEvent}>
                                                                                    <option value="2">2</option>
                                                                                    <option value="4">4</option>
                                                                                </CustomInput>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <br />
                                                                <TableStriped data={this.state.tasks} />
                                                            </CardBody>
                                                        </Card>
                                                    ) : (
                                                            null
                                                        )
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <Card className="main-card mb-3">
                                                    {
                                                        this.state.visiblity == true ? (

                                                            <CardHeader> <CardTitle className="font">Edit-Project-Assign</CardTitle></CardHeader>
                                                        ) : (
                                                                <CardHeader> <CardTitle className="font">Project-Assign</CardTitle></CardHeader>
                                                            )
                                                    }
                                                    <CardBody>
                                                        <Form>
                                                            <Row>
                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label for="exampleCustomSelect">Select ProjectManager:</Label>
                                                                        <CustomInput
                                                                            type="select"
                                                                            id="exampleCustomSelect"
                                                                            name="selecttechnology"
                                                                            value={this.state.pmName}
                                                                            onChange={() => this.onProjectManagerSelect(event)}
                                                                        >
                                                                            <option value={this.state.pmName}>{this.state.pmName}</option>
                                                                            {
                                                                                this.state.projectManager.map((data, index) =>
                                                                                    <option key={data.id} value={data.id}>{data.first_name} {data.last_name}</option>
                                                                                )
                                                                            }
                                                                        </CustomInput>
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.pmNameerror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>

                                                                <Col md="12">
                                                                    <FormGroup>
                                                                        <Label>Hours:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="projectassignhours"
                                                                            className="form-control"
                                                                            value={this.state.projectassignhours}
                                                                            onChange={this.handleProjectAssignHours}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.projectassignhourserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            {
                                                                this.state.visiblity == true ? (
                                                                    <Button
                                                                        color="primary"
                                                                        className="mt-1"
                                                                        onClick={this.editprojectAssign}
                                                                    >
                                                                        Update
                                                                </Button>
                                                                ) : (
                                                                        <Button
                                                                            color="primary"
                                                                            className="mt-1"
                                                                            onClick={this.projectAssign}
                                                                        >
                                                                            Create
                                                                </Button>
                                                                    )
                                                            }

                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>

                                            <Col md="6">
                                                {
                                                    this.state.assignData.length ? (
                                                        <Card className="main-card mb-3">
                                                            <CardHeader> <CardTitle className="font">Project-Assign-Table-List</CardTitle></CardHeader>
                                                            <CardBody>
                                                                <div>
                                                                    <Row>
                                                                        {/* <Col md="2">
                                                                        <div className="right">
                                                                            <Link to="/editproject/"><Button className="mb-2 mr-2" color="primary">
                                                                                Add
                                                                </Button></Link>
                                                                        </div>
                                                                    </Col> */}
                                                                        <Col md="4">
                                                                            <div>
                                                                                <input
                                                                                    className="form-control"
                                                                                    type="text"
                                                                                    placeholder="Search"
                                                                                    aria-label="Search"
                                                                                    onKeyUp={this.searchAssignProjectKeyUp}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="8">
                                                                            <div className="rt">
                                                                                <span>Records per page</span>
                                                                                <CustomInput
                                                                                    type="select"
                                                                                    id="exampleCustomSelect"
                                                                                    name="customSelect"
                                                                                    onChange={this.handleChangeAssignProjectEvent}
                                                                                >
                                                                                    <option value="2">2</option>
                                                                                    <option value="4">4</option>
                                                                                </CustomInput>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <br />
                                                                <TableProject data={this.state.assignData} />
                                                            </CardBody>
                                                        </Card>
                                                    ) : (
                                                            null
                                                        )
                                                }

                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                        <Row>
                                            <Col md="12">
                                                <Card className="main-card mb-3">
                                                    {
                                                        this.props.location.pathname.split('/')[2] ? (
                                                            <CardHeader> <CardTitle className="font">Edit-Project</CardTitle></CardHeader>
                                                        ) : (
                                                                <CardHeader> <CardTitle className="font">Create-Project</CardTitle></CardHeader>
                                                            )
                                                    }
                                                    <CardBody>
                                                        <Form>
                                                            <Row>
                                                                <Col md="4">
                                                                    <FormGroup>
                                                                        <Label>Title:</Label>
                                                                        <Input
                                                                            type="text"
                                                                            name="title"
                                                                            className="form-control"
                                                                            value={this.state.title}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.titleerror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="4">
                                                                    <FormGroup>
                                                                        <Label>Budget:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="budget"
                                                                            className="form-control"
                                                                            value={this.state.budget}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.budgeterror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="4">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label for="exampleCustomSelect">Select Project-Type:</Label>
                                                                                <CustomInput
                                                                                    type="select"
                                                                                    id="exampleCustomSelect"
                                                                                    name="projecttype"
                                                                                    defaultValue={this.state.newData.project_type == "1" ? "Fixed" : "hourly"}
                                                                                    onChange={() => this.onItemSelect(event)}
                                                                                >
                                                                                    <option value="0">hourly</option>
                                                                                    <option value="1">Fixed</option>

                                                                                </CustomInput>
                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.projecttypeerror}
                                                                                </div>
                                                                            </FormGroup>

                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <Label for="exampleCustomSelect">Select Project-Type:</Label>
                                                                                    <CustomInput
                                                                                        type="select"
                                                                                        id="exampleCustomSelect"
                                                                                        name="projecttype"
                                                                                        onChange={() => this.onItemSelect(event)}
                                                                                    >
                                                                                        <option value="">Select Type:</option>
                                                                                        <option value="1">Fixed</option>
                                                                                        <option value="0">hourly</option>
                                                                                    </CustomInput>
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.projecttypeerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label>Hours:</Label>
                                                                        <Input
                                                                            type="number"
                                                                            name="hours"
                                                                            className="form-control"
                                                                            value={this.state.hours}
                                                                            onChange={this.handleChange}
                                                                        />
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.hourserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label>Select Status:</Label>
                                                                        <div>
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio"
                                                                                name="status"
                                                                                value={this.state.status}
                                                                                onChange={this.handleChangeStatus}
                                                                                checked={this.state.statuscheck1}
                                                                                label="Active" inline />
                                                                            <CustomInput
                                                                                type="radio"
                                                                                id="exampleCustomRadio1"
                                                                                value={this.state.status}
                                                                                name="status"
                                                                                checked={this.state.statuscheck2}
                                                                                onChange={this.handleChangeStatusName}
                                                                                label="InActive" inline />
                                                                        </div>
                                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                                            {this.state.statuserror}
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label for="exampleCustomSelect">Select Technology:</Label>
                                                                                <TypeAhead data={this.state.multiple} api={this.state.apiPath} th={this.state.technology} name={this.state.tname} />

                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.selecttechnologyerror}
                                                                                </div>
                                                                            </FormGroup>
                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <Label for="exampleCustomSelect">Select Technology:</Label>
                                                                                    <TypeAhead data={this.state.multiple} api={this.state.apiPath} th={this.state.technology} name={this.state.tname} />

                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.selecttechnologyerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    {
                                                                        this.props.location.pathname.split('/')[2] ? (
                                                                            <FormGroup>
                                                                                <Label>Description:</Label>
                                                                                <Editor
                                                                                    // initialValue={content}
                                                                                    init={{
                                                                                        plugins: 'link image code',
                                                                                        toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                                                                                    }}
                                                                                    value={this.state.discription}
                                                                                    onChange={this.handleEditorChange} />

                                                                                <div style={{ fontSize: 12, color: "red" }}>
                                                                                    {this.state.discriptionerror}
                                                                                </div>
                                                                            </FormGroup>
                                                                        ) : (
                                                                                <FormGroup>
                                                                                    <Label>Description:</Label>
                                                                                    <Editor
                                                                                        // initialValue={content}
                                                                                        init={{
                                                                                            plugins: 'link image code',
                                                                                            toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                                                                                        }}
                                                                                        onChange={this.handleEditorChange} />
                                                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                                                        {this.state.discriptionerror}
                                                                                    </div>
                                                                                </FormGroup>
                                                                            )
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            {
                                                                this.props.location.pathname.split('/')[2] ? (
                                                                    <Button
                                                                        color="primary"
                                                                        className="mt-1"
                                                                        onClick={this.editProject}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                ) : (
                                                                        <Button
                                                                            color="primary"
                                                                            className="mt-1"
                                                                            onClick={this.createProject}
                                                                        >
                                                                            Create
                                                                        </Button>
                                                                    )
                                                            }
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
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

export default CreateProject;