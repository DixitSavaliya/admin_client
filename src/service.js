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