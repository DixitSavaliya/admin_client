import axios from 'axios';

export default {

    login: (obj) => {
        return axios.post("http://localhost:3505/User/loginUser", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    changePassword: (obj) => {
        return axios.post("http://localhost:3505/User/changepassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ForgotPassword: (obj) => {
        return axios.post("http://localhost:3505/User/forgotpassword", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    ResetPassword: (obj) => {
        return axios.post("http://localhost:3505/User/resetpassword", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProfile: (id) => {
        return axios.post("http://localhost:3505/User/getprofile", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateProfile: (data) => {
        console.log("data", data.get('filename'));
        return axios.post("http://localhost:3505/User/updateProfile", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    uploadImage: (data) => {
        console.log("data", data.get('filename'));
        return axios.post("http://localhost:3505/User/uploadImage", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRole: (data) => {
        return axios.post("http://localhost:3505/User/addUserRole", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleByIdData: (id) => {
        console.log("id", id);
        return axios.post("http://localhost:3505/User/getUserRoleById", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleData: () => {
        return axios.get("http://localhost:3505/User/getUserRole")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRole: (obj) => {
        return axios.post("http://localhost:3505/User/editUserRole", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleDataById: (id) => {
        return axios.post("http://localhost:3505/User/deleteUserRole", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserData: (data) => {
        return axios.post("http://localhost:3505/User/searchUserRoleData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleDataCount: () => {
        return axios.get("http://localhost:3505/User/userRoleTableCount")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    userRoleDataTablePagination: (obj) => {
        return axios.post("http://localhost:3505/User/userRoleTablePagination", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleAllData: (value) => {
        return axios.post("http://localhost:3505/User/deleteUserRoleAllData", value)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRight: (obj) => {
        console.log("obj", obj);
        return axios.post("http://localhost:3505/User/addUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightData: () => {
        return axios.get("http://localhost:3505/User/getUserRight")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightByIdData: (id) => {
        console.log("id", id);
        return axios.post("http://localhost:3505/User/getUserRightById", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRight: (obj) => {
        return axios.post("http://localhost:3505/User/editUserRight", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightDataById: (id) => {
        return axios.post("http://localhost:3505/User/deleteUserRight", id)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserRightData: (data) => {
        return axios.post("http://localhost:3505/User/searchUserRightData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightDataCount: () => {
        return axios.get("http://localhost:3505/User/userRightTableCount")
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    userRightDataTablePagination: (obj) => {
        return axios.post("http://localhost:3505/User/userRightTablePagination", obj)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightAllData: (value) => {
        return axios.post("http://localhost:3505/User/deleteUserRightAllData", value)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleToRightData: (id) => {
        return axios.post("http://localhost:3505/User/getUserRoleToRight", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateUserRightToRoleData: (obj) => {
        return axios.post("http://localhost:3505/User/User_Role_to_Right", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTechnology: () => {
        return axios.post("http://localhost:3505/User/getTechnology")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateProject: (obj) => {
        return axios.post("http://localhost:3505/User/createProject", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjects: () => {
        return axios.post("http://localhost:3505/User/getAllProject")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectsCounts: () => {
        return axios.post("http://localhost:3505/User/getAllProjectCount")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectDataTablePagination: (obj) => {
        return axios.post("http://localhost:3505/User/getProjectTablePagination", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteProjectById: (id) => {
        return axios.post("http://localhost:3505/User/deleteProjectById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProjectByIdData: (id) => {
        return axios.post("http://localhost:3505/User/getProjectById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditProject: (obj) => {
        return axios.post("http://localhost:3505/User/editProject", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchProjectData: (data) => {
        return axios.post("http://localhost:3505/User/searchProjectData", data)
            .then(response => {
                console.log("response===", response);
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateTask: (obj) => {
        return axios.post("http://localhost:3505/User/createTask", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTasks: () => {
        return axios.post("http://localhost:3505/User/getAllTask")
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteTaskById: (id) => {
        return axios.post("http://localhost:3505/User/deleteTaskById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTaskById: (id) => {
        return axios.post("http://localhost:3505/User/getTaskById", id)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditTask:(obj) => {
        return axios.post("http://localhost:3505/User/editTask", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getTasksByProjectId: (id) => {
        return axios.post("http://localhost:3505/User/getTaskByProjectId", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchTaskData:(data) => {
        return axios.post("http://localhost:3505/User/searchTaskData", data)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTasksCounts:(id) => {
        return axios.post("http://localhost:3505/User/getAllTaskCount", id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllTaskDataTablePagination:(obj) => {
        return axios.post("http://localhost:3505/User/getTaskTablePagination", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllProjectManager:(obj) => {
        return axios.post("http://localhost:3505/User/getALlProjectManager", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    projectAssignData:(obj) => {
        return axios.post("http://localhost:3505/User/assignProject", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getProjectsAssignData:(id) => {
        return axios.post("http://localhost:3505/User/getProjectManagerByProjectId", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },
 
    deleteAssignProject:(id) => {
        return axios.post("http://localhost:3505/User/deleteAssignProjectById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAssignProjectId:(id) => {
        return axios.post("http://localhost:3505/User/getAssignProjectById", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditProjectAssignData:(obj) => {
        return axios.post("http://localhost:3505/User/editAssignProject", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllAssignProjectCounts:(id) => {
        return axios.post("http://localhost:3505/User/getassignProjectCount", id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchAssignProjectData:(data) => {
        return axios.post("http://localhost:3505/User/searchAssignProjectData", data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAssignProjectTablePagination:(data) => {
        return axios.post("http://localhost:3505/User/getAssignProjectTablePagination", data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    CreateUser:(obj) => {
        return axios.post("http://localhost:3505/User/createUser", obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    GetUser:() => {
        return axios.post("http://localhost:3505/User/getAllUser")
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUser:(id) => {
        return axios.post("http://localhost:3505/User/getUserById",id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    EditUser:(obj) => {
        return axios.post("http://localhost:3505/User/editUser",obj)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUser:(id) => {
        return axios.post("http://localhost:3505/User/deleteUser",id)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserData:(data) => {
        return axios.post("http://localhost:3505/User/searchUser",data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getAllUserCounts:(data) => {
        return axios.post("http://localhost:3505/User/getUserTableCount",data)
        .then(response => {
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserTablePagination:(obj) => {
        return axios.post("http://localhost:3505/User/userTablePagination",obj)
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
        return axios.post('http://localhost:3505/User/checkToken', { headers: headers }).then((response) => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    }
}