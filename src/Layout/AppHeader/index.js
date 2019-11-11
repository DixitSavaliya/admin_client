import React, {Fragment} from 'react';
import cx from 'classnames';
import API from '../../service';
import {connect} from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };

        this.id = localStorage.getItem('userid');

    }
    componentDidMount() {
        /** Get Profile */
        API.getProfile({ id: this.id })
            .then((findresponse) => {
                console.log("getProfile response===", findresponse);
                this.setState({
                    selectedFile: findresponse.data.data.filename
                });
                localStorage.setItem('profilepic', this.state.selectedFile);
            }).catch(
                { status: 500, message: 'Internal Server Error' }
            );
    }

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo/>

                    <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}>
                        <div className="app-header-left">
                            <SearchBox/>
                        </div>
                        <div className="app-header-right">
                            <UserBox/>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);