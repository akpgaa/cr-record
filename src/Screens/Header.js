import React from 'react';
import { Link } from 'react-router-dom';
import imag from "../Assets/user.png";
import LoadScript from '../Routes/LoadScript';
import Right from './Right';

var CryptoJS = require("crypto-js");
const Header = (props) => {
    // let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    // return userDetails ? content(userDetails) : null;
    console.log(props);
    var originalText = null
    if (props.location.search) {
        // let query = useQuery();
        // let data = useQuery.get("data")
        // this.setState({ data: [] })
        console.log(props.location.search.split('data='));
        // Decrypt
        let data = []
        var bytes = CryptoJS.AES.decrypt(props.location.search.split('data=')[1], 'secret key 123');
        originalText = bytes.toString(CryptoJS.enc.Utf8);
    }
    return content("a", originalText)
};

function content(userDetails, originalText) {
    return (
        <React.Fragment >
            <div className="theme-red">

                <div className="page-loader-wrapper">
                    <div className="loader">
                        <div className="preloader">
                            <div className="spinner-layer pl-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                        <p>Please wait...</p>
                    </div>
                </div>


                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="javascript:void(0);" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                            <a href="javascript:void(0);" className="bars"></a>
                            <a className="navbar-brand" href="/user">
                                CRIMINAL SEARCH SYSTEM
                            </a>
                        </div>
                    </div>
                </nav>

                <section>
                    <aside id="leftsidebar" className="sidebar">
                        <div className="user-info">
                            <div className="image">
                                <img
                                    // src="http://mdc.murugappa.com/elearning2/web/assets/images/user.png" 
                                    src={imag}
                                    width="48" height="48" alt="User" />
                            </div>
                            <div className="info-container">
                                <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {/* {userDetails.firstname} */}
                                    Name
                                </div>
                                {/* <div className="email">Email</div> */}
                                <div className="btn-group user-helper-dropdown">
                                    <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        keyboard_arrow_down
                                    </i>
                                    <ul className="dropdown-menu pull-right">
                                        {/* <li>
                                        <a href="/profile">
                                            <i className="material-icons">person</i>Profile
                                        </a>
                                    </li> */}
                                        <li role="separator" className="divider"></li>
                                        <li>
                                            <a href="#" onClick={() => LogOut()}>
                                                <i className="material-icons">input</i>Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="menu">
                            <Right originalText={originalText} />
                        </div>
                    </aside>
                </section>

            </div>
            <LoadScript />
        </React.Fragment>
    );
}


function LogOut() {
    document.getElementById('root').style.display = 'none';
    localStorage.clear('userDetails');
    window.location.href = '/';
}
function check(val) {
    let first = window.location.href.split('/')[3];
    return first === val ? 'active' : '';
}

export default Header;
