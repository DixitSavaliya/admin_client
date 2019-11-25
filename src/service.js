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
        return axios.post("http://localhost:3505/User/getprofile" , id)
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
        console.log("id",id);
        return axios.post("http://localhost:3505/User/getUserRoleById", id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleData:() => {
        return axios.get("http://localhost:3505/User/getUserRole")
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRole:(obj) => {
        return axios.post("http://localhost:3505/User/editUserRole",obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleDataById:(id) => {
        return axios.post("http://localhost:3505/User/deleteUserRole",id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserData:(data) => {
        return axios.post("http://localhost:3505/User/searchUserRoleData",data)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleDataCount:() => {
        return axios.get("http://localhost:3505/User/userRoleTableCount")
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    userRoleDataTablePagination:(obj) => {
        return axios.post("http://localhost:3505/User/userRoleTablePagination",obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRoleAllData:(value) => {
        return axios.post("http://localhost:3505/User/deleteUserRoleAllData",value)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    addUserRight:(obj) => {
        console.log("obj",obj);
        return axios.post("http://localhost:3505/User/addUserRight",obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightData:() => {
        return axios.get("http://localhost:3505/User/getUserRight")
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRightByIdData:(id) => {
        console.log("id",id);
        return axios.post("http://localhost:3505/User/getUserRightById", id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    editUserRight:(obj) => {
        return axios.post("http://localhost:3505/User/editUserRight",obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightDataById:(id) => {
        return axios.post("http://localhost:3505/User/deleteUserRight",id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    searchUserRightData:(data) => {
        return axios.post("http://localhost:3505/User/searchUserRightData",data)
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
        return axios.post("http://localhost:3505/User/userRightTablePagination",obj)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    deleteUserRightAllData:(value) => {
        return axios.post("http://localhost:3505/User/deleteUserRightAllData",value)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    getUserRoleToRightData:(id) => {
        return axios.post("http://localhost:3505/User/getUserRoleToRight",id)
        .then(response => {
            console.log("response===", response);
            return response;
        }).catch({ status: 500, message: 'Internal Server Error' });
    },

    updateUserRightToRoleData:(obj) => {
        return axios.post("http://localhost:3505/User/User_Role_to_Right",obj)
        .then(response => {
            console.log("response===", response);
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