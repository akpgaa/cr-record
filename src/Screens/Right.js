import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bridge from '../Components/Bridge'
import LoadScript from '../Routes/LoadScript'
var CryptoJS = require("crypto-js");


export default class Right extends Component {
    state = {
        Data: [],
        show: false,
    }
    componentDidMount = async () => {
        let { data: result } = await Bridge.GetData()
        if (result) {
            console.log(result.data);
            this.setState({ Data: result.data, collapse: result.collapse, show: true })
        } else {
            this.setState({ show: true })
        }
    }
    // handleClick = async (data) => {
    //     // localStorage.setItem('data', JSON.stringify(data))
    //     this.props.changedata(data)
    // }
    // Mainfunction = async () => {
    //     let { data } = this.props;
    //     // consolethis.props.match.params.id));
    //     console.log(this.props);

    //     if (this.props.location.search) {
    //         // let query = useQuery();
    //         // let data = useQuery.get("data")
    //         // this.setState({ data: [] })
    //         console.log(this.props.location.search.split('data='));
    //         // Decrypt
    //         let data = []
    //         var bytes = CryptoJS.AES.decrypt(this.props.location.search.split('data=')[1], 'secret key 123');
    //         var originalText = bytes.toString(CryptoJS.enc.Utf8);

    //         console.log(originalText);
    //         let { data: result } = await Bridge.getsingledata('cr_identifier', originalText)

    //         data = result[0]
    //         if (result) {
    //             this.setState({
    //                 data
    //             })
    //             return true
    //         }
    //     }
    // }
    check(val) {
        let first = window.location.href.split('/')[3];
        return first === val ? 'active' : '';
    }
    handlecollapse = (choice, key, key1, key2, key3, key4, key5) => {
        let { Data, show, collapse } = this.state;
        if (choice == 1) {
            collapse[key].collapse = !collapse[key].collapse
        } else if (choice == 2) {
            collapse[key][key1].collapse = !collapse[key][key1].collapse
        } else if (choice == 3) {
            collapse[key][key1][key2].collapse = !collapse[key][key1][key2].collapse
        } else if (choice == 4) {
            collapse[key][key1][key2][key3].collapse = !collapse[key][key1][key2][key3].collapse
        } else if (choice == 5) {
            collapse[key][key1][key2][key3][key4].collapse = !collapse[key][key1][key2][key3][key4].collapse
        }
        this.setState({ collapse })
    }
    render() {
        let { Data, show, collapse } = this.state;
        console.log(Data);
        let RightPanel = []
        let RightPanel1 = []
        if (Data) {

            RightPanel1 = Object.keys(Data).map((key, i) => {
                return (
                    <li >
                        <a href="javascript:void(0);" class="menu-toggle" onClick={() => this.handlecollapse(1, key)} >
                            <i class="material-icons">location_city</i>
                            <span>{key}</span>
                        </a>

                        {collapse[key].collapse &&
                            <div id="seconddiv" style={{ paddingLeft: 15 }} >
                                {/* Zone  */}
                                {Data[key] && Object.keys(Data[key]).map((key1, j) => {
                                    return (
                                        <li >
                                            <a href="javascript:void(0);" class="menu-toggle" onClick={() => this.handlecollapse(2, key, key1)} >
                                                <i class="material-icons">map</i>
                                                <span>{key1}</span>
                                            </a>
                                            {collapse[key][key1].collapse &&
                                                <div style={{ paddingLeft: 15 }} >
                                                    {/* Zone  */}
                                                    {Data[key][key1] && Object.keys(Data[key][key1]).map((key2, k) => {

                                                        return (
                                                            <li >
                                                                <a href="javascript:void(0);" class="menu-toggle" onClick={() => this.handlecollapse(3, key, key1, key2)} >
                                                                    <i class="material-icons">navigation</i>
                                                                    <span>{key2}</span>
                                                                </a>
                                                                {collapse[key][key1][key2].collapse &&
                                                                    <div style={{ paddingLeft: 15 }} >
                                                                        {/* Zone  */}
                                                                        {Data[key][key1][key2] && Object.keys(Data[key][key1][key2]).map((key3, l) => {
                                                                            return (
                                                                                <li >
                                                                                    <a href="javascript:void(0);" class="menu-toggle" onClick={() => this.handlecollapse(4, key, key1, key2, key3)} >
                                                                                        <i class="material-icons">pin_drop</i>
                                                                                        <span>{key3}</span>
                                                                                    </a>
                                                                                    {collapse[key][key1][key2][key3].collapse &&
                                                                                        <div style={{ paddingLeft: 15 }} >
                                                                                            {/* Zone  */}
                                                                                            {Data[key][key1][key2][key3] && Object.keys(Data[key][key1][key2][key3]).map((key4, m) => {

                                                                                                return (
                                                                                                    <li >
                                                                                                        <a href="javascript:void(0);" class="menu-toggle" onClick={() => this.handlecollapse(5, key, key1, key2, key3, key4)} >
                                                                                                            <i class="material-icons">my_location</i>
                                                                                                            <span>{key4}</span>
                                                                                                        </a>
                                                                                                        {collapse[key][key1][key2][key3][key4].collapse &&
                                                                                                            <div style={{ paddingLeft: 15 }} >
                                                                                                                {/* Zone  */}
                                                                                                                {Data[key][key1][key2][key3][key4] && Object.keys(Data[key][key1][key2][key3][key4]).map((key5, n) => {
                                                                                                                    let id = Data[key][key1][key2][key3][key4][key5].cr_identifier;
                                                                                                                    // Encrypt
                                                                                                                    var ciphertext = CryptoJS.AES.encrypt(`${id}`, 'secret key 123').toString();
                                                                                                                    return (
                                                                                                                        <div class="card-body">
                                                                                                                            <div class="card-header" id={`head${i}${j}${k}${l}${m}${n}`}>
                                                                                                                                <h2 class="mb-0">
                                                                                                                                    {(Data[key][key1][key2][key3][key4][key5].cr_identifier) ?
                                                                                                                                        <li >
                                                                                                                                            <Link
                                                                                                                                                to={`/Main/data?data=${ciphertext}`}
                                                                                                                                                // onClick={() => this.handlecollapse(5, key, key1, key2, key3, key4)}
                                                                                                                                                class=" waves-effect waves-block"
                                                                                                                                            >
                                                                                                                                                <i class="material-icons">person</i>
                                                                                                                                                <span style={{ color: this.props.originalText == id ? '#F44336' : '#1e1e1e' }}>{Data[key][key1][key2][key3][key4][key5].Personal_Details_Name_First}</span>
                                                                                                                                            </Link>

                                                                                                                                        </li>
                                                                                                                                        : <a href="#"  >
                                                                                                                                            <i class="material-icons">person</i>
                                                                                                                                            <span>No data found </span>
                                                                                                                                        </a>
                                                                                                                                    }
                                                                                                                                </h2>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )

                                                                                                                })
                                                                                                                }
                                                                                                            </div>
                                                                                                        }
                                                                                                    </li>
                                                                                                )
                                                                                            })
                                                                                            }
                                                                                        </div>
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        })
                                                                        }
                                                                    </div>
                                                                }
                                                            </li>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                                }
                            </div>
                        }
                    </li >

                )
            })

        }
        return (
            <React.Fragment>
                {!show && <div >
                    <div class="page-loader-wrapper" >
                        <div class="loader">
                            <div class="preloader">
                                <div class="spinner-layer pl-red"
                                ><div class="circle-clipper left">
                                        <div class="circle"></div></div>
                                    <div class="circle-clipper right">
                                        <div class="circle">
                                        </div></div></div>
                            </div><p>Please wait...</p></div></div>
                    {/* <div class="overlay"></div> */}
                </div>}

                <div class="menu" style={{}}>
                    <ul class="list">
                        <li className={this.check('user')}>
                            <a href="/user">
                                <i className="material-icons">home</i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li className={this.check('search')}>
                            <a href="/search">
                                <i className="material-icons">search</i>
                                <span>Search</span>
                            </a>
                        </li>
                        <li className='mobile-menu'>
                            <a href="#" onClick={this.props.Logout}>
                                <i className="material-icons">input</i>
                                <span>LogOut</span>
                            </a>
                        </li>

                        {RightPanel1}
                    </ul>
                </div >


                <LoadScript />
            </React.Fragment >
        )

    }
}
