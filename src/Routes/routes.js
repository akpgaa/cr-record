import React, { Component } from "react";
import { BrowserRouter as Router, Route, useLocation, Switch } from "react-router-dom";
import Header from "../Screens/Header";
import Home from "../Screens/home";
import Login from "../Screens/Login";
import Main from "../Screens/Main";
import Right from "../Screens/Right";
import Search from "../Screens/Search";

import LoadScript from "./LoadScript";

export default class routes extends Component {

    state = {
        data: {}
    }
    changedata = (id) => {
        this.setState({ data: id })
    }
    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path={"/"} render={props => <Login {...props} />} />
                    <Route exact path={"/user"} render={props => (
                        <React.Fragment>
                            <Header {...props} navname={"Search"} naved={'/search'} data={this.state.data} changedata={this.changedata} />
                            <Home  {...props} data={this.state.data} />
                            {/* <Right  {...props} data={this.state.data} changedata={this.changedata} /> */}

                        </React.Fragment>
                    )} />
                    <Route exact path={"/Main/:id?"} render={props => {

                        return (
                            <React.Fragment>
                                <Header {...props} navname={"Search"} naved={'/search'} data={this.state.data} changedata={this.changedata} />
                                <Main  {...props} data={this.state.data} />
                                {/* <Right  {...props} data={this.state.data} changedata={this.changedata} /> */}

                            </React.Fragment>
                        )
                    }} />
                    <Route exact path={'/search'} render={props => (
                        <React.Fragment>
                            <Header {...props} navname={"Home"} naved={'/'} data={this.state.data} changedata={this.changedata} />
                            <Search  {...props} />
                            {/* <Right  {...props} data={this.state.data} changedata={this.changedata} /> */}

                        </React.Fragment>
                    )} />
                </Switch>
            </Router>
        )
    }
}
