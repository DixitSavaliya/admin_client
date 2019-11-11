import React, { Fragment } from 'react';

class AppFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Year: ''
        }
    }

    componentDidMount() {
        var currentYear = new Date().getFullYear();
        console.log("currentYear==", currentYear);
        var year = 2019;
        if (currentYear == year) {
            this.setState({
                Year: currentYear
            })
        } else {
            this.setState({
                Year: year + '-' + new Date().getFullYear()
            })
        }
    }

    render() {

        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <span>© {this.state.Year} All Rights Reserved By RKWebtechnology</span>
                        </div>
                        <div className="app-footer-right">
                            <span>Developed By , <a href="http://www.rkwebtechnology.com">RKWebtechnology</a></span>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppFooter;