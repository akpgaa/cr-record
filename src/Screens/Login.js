import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import Bridge from '../Components/Bridge'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            Show: false,
            ForgetUsername: '',
            errormail: '',
            mailsend: ''
        };
    }
    handleSubmit = async () => {
        window.location.href = "/user";
        return true;
        let { userName, password } = this.state;
        if (!userName || userName.trim() === "") {

            this.setState({
                erroruserName: "Email Address cannot be empty"

            });
            return false;

        } else if (!password || password.trim() === "") {
            this.setState({
                erroruserName: "",
                errorpassword: "Please enter password"
            });
            return false;
        }
        this.setState({ errorpassword: "" });
        this.setState({ Show: true });

        try {
            const { data: result } = await Bridge.loginCheck(userName, password);
            console.log(result);
            if (result && result[0]) {
                this.setState({ Show: false });
                localStorage.setItem("userDetails", JSON.stringify(result[0]));
                let userDetails = localStorage.getItem("userDetails");
                userDetails = JSON.parse(userDetails);
                // console.log(userDetails)
                switch (userDetails.usertypeId) {
                    case 1: {
                        // this.props.history.push("superadmin")
                        window.location.href = "/superadmin";
                        break;
                    }
                    case 2: {
                        // this.props.history.push("admin")
                        window.location.href = "/admin";
                        break;
                    }
                    case 3: {
                        // this.props.history.push("subadmin")
                        window.location.href = "/user";
                        break;
                    }
                }
            } else {
                this.setState({
                    errorpassword: "Invalid Username or Password",
                    erroruserName: "Please enter valid Username",
                    Show: false
                });
            }
        } catch (error) {
            console.log(error);
            // if(res.status.co)
        }
    };


    onChangeText = (e) => {
        // console.log(e.target.value)
        this.setState({ ForgetUsername: e.target.value })



    }

    _handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    };
    render() {
        let {
            userName,
            password,
            visibility,
            erroruserName,
            errorpassword
        } = this.state;
        return (
            <div className="ecenter">
                <div
                    style={{
                        backgroundColor: "#fff",
                        borderStyle: "solid",
                        marginTop: "5%",
                        marginLeft: "20%",
                        marginRight: "20%",
                        color: "red",
                        borderWidth: "10px"
                    }}
                >
                    <div style={{}}>
                        <div style={{ marginLeft: '10%' }}>

                            <div className="center">
                                <img
                                    src='/logo.png'
                                    className="img-responsive logmres"
                                    style={{ width: "25%", height: 'auto' }}
                                    alt=" Logo"
                                />
                            </div>
                            <div className="center">
                                <h3 className="logmtextcenter">
                                    {" "}
                                    Criminal Search System
                                </h3>
                            </div>
                        </div>


                        <form>
                            <div className="form-horizontal">
                                <div className="form-group m-t-25">
                                    <label className="control-label col-sm-4">User name</label>
                                    <div className="col-sm-6 ">
                                        <div className="form-line">
                                            <Input
                                                style={{ marginLeft: 10 }}
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter a username"
                                                autoComplete="username"
                                                onChange={e =>
                                                    this.setState({ userName: e.target.value })
                                                }
                                                value={userName}
                                            />
                                        </div>
                                        <span className="errortext">{erroruserName}</span>
                                    </div>
                                </div>
                                <div className="form-group m-t-20">
                                    <label className="control-label col-sm-4">Password</label>
                                    <div className="col-sm-6">
                                        <div className="input-group">
                                            <div className="form-line">
                                                <Input
                                                    style={{ marginLeft: 10 }}
                                                    type={visibility ? "text" : "password"}
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    autoComplete="password"
                                                    onChange={e =>
                                                        this.setState({ password: e.target.value })
                                                    }
                                                    value={password}
                                                    onKeyDown={this._handleKeyDown}

                                                />
                                            </div>
                                            <span className="errortext">{errorpassword}</span>
                                            <span
                                                className="input-group-addon" style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    this.setState({ visibility: !visibility })
                                                }
                                            >
                                                <i className="material-icons" style={{ marginLeft: 10 }}>
                                                    {visibility ? "visibility" : "visibility_off"}
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="container">

                                </div>
                                <div className="m-b-20">
                                    <div className="row">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            {this.state.Show === false && (
                                                <Button
                                                    type="button"
                                                    className="btn btn-danger btn-sm btnlogres"
                                                    onClick={this.handleSubmit}
                                                >
                                                    Submit
                                                </Button>
                                            )}
                                            {this.state.Show === true && (
                                                <div className="loader">
                                                    <div
                                                        className="Submitpreloader"
                                                        style={{ left: "20px" }}
                                                    >
                                                        <div className="spinner-layer pl-red">
                                                            <div className="circle-clipper left">
                                                                <div className="circle"></div>
                                                            </div>
                                                            <div className="circle-clipper right">
                                                                <div className="circle"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>please wait...</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* <div className="col-sm-4">


                                            <div type="button" style={{ cursor: "pointer" }} class="" data-backdrop="false" data-toggle="modal" data-target="#myModal">
                                                Forgot Password</div>


                                            <div class="modal fade" id="myModal" role="dialog">
                                                <div class="modal-dialog">

                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                            <h4 class="modal-title" style={{ textAlign: 'center' }}>Forget Password
                                                            </h4>
                                                        </div>
                                                        <br />
                                                        <div class="modal-body">
                                                         
                                                            <div className="m-b-20">
                                                                <div className="row clearfix">
                                                                    <div className="col-sm-4">  <label style={{ marginLeft: 25 }}>Enter Email Address :</label></div>
                                                                    <div className="col-sm-5">
                                                                        <div className="form-line">
                                                                            <input
                                                                                type="text"
                                                                                name="name"
                                                                                className="form-control"
                                                                                placeholder="Enter userName "
                                                                                onChange={e => {
                                                                                    this.onChangeText(e);
                                                                                }}

                                                                            />
                                                                            <span className={'errortext'} style={{ color: 'red' }} > {this.state.errormail}</span>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-3">  </div>
                                                                </div>
                                                                <br />
                                                                <div className="row clearfix">
                                                                    <div className="col-sm-1">  </div>
                                                                    <div className="col-sm-10">
                                                                        <span className={'errortext'} style={{ color: 'red' }} > {this.state.mailsend}</span>
                                                                    </div>
                                                                    <div className="col-sm-1">  </div>
                                                                </div>
                                                                <br />
                                                                <div className="row clearfix">
                                                                    <div className="col-sm-4">  </div>
                                                                    <div className="col-sm-4">
                                                                        <Button
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={this.Forgetpassword}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </div>
                                                                    <div className="col-sm-4">  </div>
                                                                </div>


                                                            </div>

                                                         


                                                        </div>
                                                        <div class="modal-footer">

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div className="page-loader-wrapper"> */}
                                    </div>
                                </div>
                                {/* <label class="control-label" style={{ marginLeft: "0px" }}>
                  <a href="">Forgot Password?</a>
                </label> */}
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}
