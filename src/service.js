import axios from 'axios';
import { config } from './config';

export default {

    login: (obj) => {
        return axios.post(config.baseApiUrl + "/User/loginUser", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    changePassword: (obj) => {
        return axios.post(config.baseApiUrl + "/User/changepassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ForgotPassword: (obj) => {
        return axios.post(config.baseApiUrl + "/User/forgotpassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ResetPassword: (obj) => {
        return axios.post(config.baseApiUrl + "/User/resetpassword", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProfile: (id) => {
        return axios.post(config.baseApiUrl + "/User/getprofile", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateProfile: (data) => {
        console.log("data", data.get('filename'));
        return axios.post(config.baseApiUrl + "/User/updateProfile", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    uploadImage: (data) => {
        console.log("data", data.get('filename'));
        return axios.post(config.baseApiUrl + "/User/uploadImage", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRole: (data) => {
        return axios.post(config.baseApiUrl + "/User/addUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleByIdData: (id) => {
        console.log("id", id);
        return axios.post(config.baseApiUrl + "/User/getUserRoleById", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleData: () => {
        return axios.post(config.baseApiUrl + "/User/getUserRole")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRole: (obj) => {
        return axios.post(config.baseApiUrl + "/User/editUserRole", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleDataById: (id) => {
        return axios.post(config.baseApiUrl + "/User/deleteUserRole", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserData: (data) => {
        return axios.post(config.baseApiUrl + "/User/searchUserRoleData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleDataCount: () => {
        return axios.post(config.baseApiUrl + "/User/userRoleTableCount")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    userRoleDataTablePagination: (obj) => {
        return axios.post(config.baseApiUrl + "/User/userRoleTablePagination", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleAllData: (value) => {
        return axios.post(config.baseApiUrl + "/User/deleteUserRoleAllData", value)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRight: (obj) => {
        console.log("obj", obj);
        return axios.post(config.baseApiUrl + "/User/addUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightData: () => {
        return axios.post(config.baseApiUrl + "/User/getUserRight")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightByIdData: (id) => {
        console.log("id", id);
        return axios.post(config.baseApiUrl + "/User/getUserRightById", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRight: (obj) => {
        return axios.post(config.baseApiUrl + "/User/editUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightDataById: (id) => {
        return axios.post(config.baseApiUrl + "/User/deleteUserRight", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserRightData: (data) => {
        return axios.post(config.baseApiUrl + "/User/searchUserRightData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightDataCount: () => {
        return axios.post(config.baseApiUrl + "/User/userRightTableCount")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    userRightDataTablePagination: (obj) => {
        return axios.post(config.baseApiUrl + "/User/userRightTablePagination", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightAllData: (value) => {
        return axios.post(config.baseApiUrl + "/User/deleteUserRightAllData", value)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleToRightData: (id) => {
        return axios.post(config.baseApiUrl + "/User/getUserRoleToRight", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateUserRightToRoleData: (obj) => {
        return axios.post(config.baseApiUrl + "/User/User_Role_to_Right", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTechnology: () => {
        return axios.post(config.baseApiUrl + "/User/getTechnology")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateProject: (obj) => {
        return axios.post(config.baseApiUrl + "/User/createProject", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjects: () => {
        return axios.post(config.baseApiUrl + "/User/getAllProject")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectsCounts: () => {
        return axios.post(config.baseApiUrl + "/User/getAllProjectCount")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectDataTablePagination: (obj) => {
        return axios.post(config.baseApiUrl + "/User/getProjectTablePagination", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteProjectById: (id) => {
        return axios.post(config.baseApiUrl + "/User/deleteProjectById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProjectByIdData: (id) => {
        return axios.post(config.baseApiUrl + "/User/getProjectById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditProject: (obj) => {
        return axios.post(config.baseApiUrl + "/User/editProject", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchProjectData: (data) => {
        return axios.post(config.baseApiUrl + "/User/searchProjectData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateTask: (obj) => {
        return axios.post(config.baseApiUrl + "/User/createTask", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTasks: () => {
        return axios.post(config.baseApiUrl + "/User/getAllTask")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteTaskById: (id) => {
        return axios.post(config.baseApiUrl + "/User/deleteTaskById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTaskById: (id) => {
        return axios.post(config.baseApiUrl + "/User/getTaskById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditTask:(obj) => {
        return axios.post(config.baseApiUrl + "/User/editTask", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTasksByProjectId: (id) => {
        return axios.post(config.baseApiUrl + "/User/getTaskByProjectId", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchTaskData:(data) => {
        return axios.post(config.baseApiUrl + "/User/searchTaskData", data)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTasksCounts:(id) => {
        return axios.post(config.baseApiUrl + "/User/getAllTaskCount", id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTaskDataTablePagination:(obj) => {
        return axios.post(config.baseApiUrl + "/User/getTaskTablePagination", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectManager:(obj) => {
        return axios.post(config.baseApiUrl + "/User/getALlProjectManager", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    projectAssignData:(obj) => {
        return axios.post(config.baseApiUrl + "/User/assignProject", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProjectsAssignData:(id) => {
        return axios.post(config.baseApiUrl + "/User/getProjectManagerByProjectId", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserCounts:(id) => {
        return axios.post(config.baseApiUrl + "/User/getCounts", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTaskCounts:(id) => {
        return axios.post(config.baseApiUrl + "/User/getTaskByProjectIdCounts", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },
 
    deleteAssignProject:(id) => {
        return axios.post(config.baseApiUrl + "/User/deleteAssignProjectById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAssignProjectId:(id) => {
        return axios.post(config.baseApiUrl + "/User/getAssignProjectById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditProjectAssignData:(obj) => {
        return axios.post(config.baseApiUrl + "/User/editAssignProject", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllAssignProjectCounts:(id) => {
        return axios.post(config.baseApiUrl + "/User/getassignProjectCount", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchAssignProjectData:(data) => {
        return axios.post(config.baseApiUrl + "/User/searchAssignProjectData", data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAssignProjectTablePagination:(data) => {
        return axios.post(config.baseApiUrl + "/User/getAssignProjectTablePagination", data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateUser:(obj) => {
        return axios.post(config.baseApiUrl + "/User/createUser", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    GetUser:() => {
        return axios.post(config.baseApiUrl + "/User/getAllUser")
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUser:(id) => {
        return axios.post(config.baseApiUrl + "/User/getUserById",id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditUser:(obj) => {
        return axios.post(config.baseApiUrl + "/User/editUser",obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUser:(id) => {
        return axios.post(config.baseApiUrl + "/User/deleteUser",id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserData:(data) => {
        return axios.post(config.baseApiUrl + "/User/searchUser",data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllUserCounts:(data) => {
        return axios.post(config.baseApiUrl + "/User/getUserTableCount",data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserTablePagination:(obj) => {
        return axios.post(config.baseApiUrl + "/User/userTablePagination",obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTechnologyById:(id) => {
        return axios.post(config.baseApiUrl + "/User/getTechnologyNameById",id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteTechnologyById:(obj) => {
        return axios.post(config.baseApiUrl + "/User/deleteTechnologies",obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    authenticate: () => {
        const Token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...',
            'token': Token
        }
        return axios.post(config.baseApiUrl + '/User/checkToken', { headers: headers }).then((response) => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    }
}