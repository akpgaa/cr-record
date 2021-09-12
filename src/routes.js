import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default class routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* <Route
                        exact
                        path={"/admin"}
                        render={props => (
                            <React.Fragment>
                                <AdminHeader {...props} />
                                <div className="app-body">
                                    <SideNavAdmin {...props} />
                                    <AdminDashboard {...props} />
                                </div>
                                <Footer {...props} />
                            </React.Fragment>
                        )}
                    /> */}
                    <Route exact path={"/home"} render={props => <Login {...props} />} />
                </Switch>
            </Router>
        )
    }
}
