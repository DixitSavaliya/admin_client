// import React from 'react';
// import AppFooter from './AppFooter/index';
// import AppHeader from './AppHeader/index';

// import AppNav from './AppNav/VerticalNavWrapper';
// import API from '../service';
// import { EventEmitter } from '../event';


// class Component extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedFile: null
//         }
//         this.id = localStorage.getItem('userid');
//     }                               

//     componentDidMount() {
    
//         API.getProfile({id:this.id})
//             .then((findresponse) => {
//                 console.log("getProfile response===", findresponse);
//                 this.setState({
//                     selectedFile: findresponse.data.data.filename
//                 });
//                 localStorage.setItem('profilepic', this.state.selectedFile);
//                 EventEmitter.dispatch('profile', this.state.selectedFile);
//             }).catch(
//                 { status: 500, message: 'Internal Server Error' }
//             );
//     }

//     render() {
//         return (
//             <div>
//                 <AppHeader />
//                 <AppNav />
             
//                 <AppFooter />
//             </div>
//         );
//     }
// }


// export default Component;