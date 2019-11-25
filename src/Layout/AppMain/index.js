import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import './appmain.css';

import {
    ToastContainer,
} from 'react-toastify';


const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));
const UserRole = lazy(() => import('../../Layout/userrole/userrole'));
const UserRight = lazy(() => import('../../Layout/userright/userright'));
const UserRoletoRight = lazy(() => import('../../Layout/user_role_to_right/user_role_to_right'));
const UserTable = lazy(() => import('../Tables'));
const MyProfile = lazy(() => import('../../Layout/myprofile/myprofile'));
const Widgets = lazy(() => import('../../DemoPages/Widgets'));
const Elements = lazy(() => import('../../DemoPages/Elements'));
const Components = lazy(() => import('../../DemoPages/Components'));
const Charts = lazy(() => import('../../DemoPages/Charts'));
const Forms = lazy(() => import('../../DemoPages/Forms'));
// const Tables = lazy(() => import('../../DemoPages/Tables'));
const AppMain = () => {

    return (
        <Fragment>
            {/* Components */}
            <Suspense fallback={
               <div className="loader"></div>
            }>
                <Route path="/components" component={Components}/>
            </Suspense>

            {/* Forms */}

            <Suspense fallback={
              <div className="loader"></div>
            }>
                <Route path="/forms" component={Forms}/>
            </Suspense>

            {/* Charts */}

            <Suspense fallback={
               <div className="loader"></div>
            }>
                <Route path="/charts" component={Charts}/>
            </Suspense>

            {/* Tables */}

            <Suspense fallback={
               <div className="loader"></div>
            }>
                <Route path="/Tables" component={UserTable}/>
            </Suspense>

            {/* Elements */}

            <Suspense fallback={
               <div className="loader"></div>
            }>
                <Route path="/elements" component={Elements}/>
            </Suspense>

            {/* Dashboard Widgets */}

            <Suspense fallback={
                <div className="loader"></div>
            }>
                <Route path="/widgets" component={Widgets}/>
            </Suspense>

            {/* Dashboards */}

            <Suspense fallback={
               <div className="loader"></div>
            }>
                <Route path="/dashboards" component={Dashboards}/>
            </Suspense>

            <Suspense fallback={
              <div className="loader"></div>
            }>
                <Route path="/myprofile" component={MyProfile}/>
            </Suspense>

            <Suspense fallback={
              <div className="loader"></div>
            }>
                <Route path="/userrole" component={UserRole}/>
            </Suspense>

            <Suspense fallback={
              <div className="loader"></div>
            }>
                <Route path="/userright" component={UserRight}/>
            </Suspense>

            <Suspense fallback={
              <div className="loader"></div>
            }>
                <Route path="/user_role_to_right" component={UserRoletoRight}/>
            </Suspense>

            <Route exact path="/" render={() => (
                <Redirect to="/dashboards/basic"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;