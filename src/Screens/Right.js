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
        let result = await Bridge.GetData()
        if (result) {
            console.log(result.data);
            this.setState({ Data: result.data, show: true })
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
    render() {
        let { Data, show } = this.state;
        console.log(this.props.data);
        let RightPanel = []
        let RightPanel1 = []
        if (Data) {
            RightPanel = Object.keys(Data).map((key, i) => {
                return (
                    <li className={this.check('main')} style={{ paddingLeft: 15, marginTop: -20 }}>
                        {/* City  */}
                        <div class="card-header" id={`heasd${i}`}>
                            <h2 class="mb-0">
                                <i class="material-icons">location_city</i>
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapses${i}`} aria-expanded="true" aria-controls={`#collapses${i}`} >
                                    <span>{key}</span>
                                </button>
                                {/* <i style={{ justifyContent: 'flex-end' }} class="material-icons">add
                                        </i> */}
                            </h2>
                        </div>
                        <div id={`collapses${i}`} class="collapse" aria-labelledby={`heasd${i}`} data-parent="#accordionExample">
                            {/* Zone  */}
                            {Data[key] && Object.keys(Data[key]).map((key1, j) => {
                                return (
                                    <div class="card-body">
                                        <div class="card-header" id={`head${i}${j}`}>
                                            <h2 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}${j}`} aria-expanded="true" aria-controls={`#collapse${i}${j}`} >
                                                    <i class="material-icons">map</i>
                                                    {' '}      <span>{key1}</span>
                                                </button>
                                            </h2>
                                        </div>
                                        <div style={{ paddingLeft: 15 }} id={`collapse${i}${j}`} class="collapse" aria-labelledby={`head${i}${j}`} data-parent="#accordionExample">
                                            {/* Range  */}
                                            {Data[key][key1] && Object.keys(Data[key][key1]).map((key2, k) => {
                                                return (
                                                    <div class="card-body">
                                                        <div class="card-header" id={`head${i}${j}${k}`}>
                                                            <h2 class="mb-0">
                                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}${j}${k}`} aria-expanded="true" aria-controls={`#collapse${i}${j}${k}`} >
                                                                    <i class="material-icons">navigation</i>
                                                                    {' '}      <span>{key2}</span>
                                                                </button>
                                                            </h2>
                                                        </div>
                                                        <div style={{ paddingLeft: 15 }} id={`collapse${i}${j}${k}`} class="collapse" aria-labelledby={`head${i}${j}${k}`} data-parent="#accordionExample">
                                                            {/* District  */}
                                                            {Data[key][key1][key2] && Object.keys(Data[key][key1][key2]).map((key3, l) => {
                                                                return (
                                                                    <div class="card-body">
                                                                        <div class="card-header" id={`head${i}${j}${k}${l}`}>
                                                                            <h2 class="mb-0">
                                                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}${j}${k}${l}`} aria-expanded="true" aria-controls={`#collapse${i}${j}${k}${l}`} >
                                                                                    <i class="material-icons">pin_drop</i>
                                                                                    {' '}      <span>{key3}</span>
                                                                                </button>
                                                                            </h2>
                                                                        </div>
                                                                        <div style={{ paddingLeft: 15 }} id={`collapse${i}${j}${k}${l}`} class="collapse" aria-labelledby={`head${i}${j}${k}${l}`} data-parent="#accordionExample">
                                                                            {/* Station  */}
                                                                            {Data[key][key1][key2][key3] && Object.keys(Data[key][key1][key2][key3]).map((key4, m) => {
                                                                                return (
                                                                                    <div class="card-body">
                                                                                        <div class="card-header" id={`head${i}${j}${k}${l}${m}`}>
                                                                                            <h2 class="mb-0">
                                                                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}${j}${k}${l}${m}`} aria-expanded="true" aria-controls={`#collapse${i}${j}${k}${l}${m}`} >
                                                                                                    <i class="material-icons">my_location</i>
                                                                                                    {' '}      <span>{key4}</span>
                                                                                                </button>
                                                                                            </h2>
                                                                                        </div>
                                                                                        <div style={{ paddingLeft: 15 }} id={`collapse${i}${j}${k}${l}${m}`} class="collapse" aria-labelledby={`head${i}${j}${k}${l}${m}`} data-parent="#accordionExample">
                                                                                            {/* Station  */}
                                                                                            {Data[key][key1][key2][key3][key4] && Object.keys(Data[key][key1][key2][key3][key4]).map((key5, n) => {
                                                                                                let id = Data[key][key1][key2][key3][key4][key5].cr_identifier;
                                                                                                // Encrypt
                                                                                                var ciphertext = CryptoJS.AES.encrypt(`${id}`, 'secret key 123').toString();


                                                                                                return (
                                                                                                    <div class="card-body">
                                                                                                        <div class="card-header" id={`head${i}${j}${k}${l}${m}${n}`}>
                                                                                                            <h2 class="mb-0">
                                                                                                                <li class="">
                                                                                                                    <Link
                                                                                                                        to={`/Main/data?data=${ciphertext}`}
                                                                                                                        // onClick={() => this.handleClick(id)}
                                                                                                                        class=" waves-effect waves-block"
                                                                                                                    >
                                                                                                                        <i class="material-icons">person</i>
                                                                                                                        <span style={{ color: this.props.originalText == id ? '#F44336' : '#1e1e1e' }}>{Data[key][key1][key2][key3][key4][key5].Personal_Details_Name_First}</span>
                                                                                                                    </Link>

                                                                                                                </li>
                                                                                                            </h2>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </li>

                )
            })


            // RightPanel1 = Object.keys(Data).map((key, i) => {
            //     return (
            //         <li className={this.check('category') || this.check('session') || this.check('course')}>
            //             <a href="javascript:void(0);" class="menu-toggle">
            //                 <i class="material-icons">location_city</i>
            //                 <span>{key}</span>
            //             </a>
            //             <ul class="ml-menu">
            //                 {/* Zone  */}
            //                 {Data[key] && Object.keys(Data[key]).map((key1, j) => {
            //                     return (
            //                         <li className={this.check('category') || this.check('session') || this.check('course')}>
            //                             <a href="javascript:void(0);" class="menu-toggle">
            //                                 <i class="material-icons">map</i>
            //                                 <span>{key1}</span>
            //                             </a>
            //                             <ul class="ml-menu">
            //                                 <li className={this.check('category')}>
            //                                     <a href="/category">Add Category</a>
            //                                 </li>
            //                                 <li className={this.check('session')}>
            //                                     <a href="/session">Add Session</a>
            //                                 </li>
            //                                 <li className={this.check('course')}>
            //                                     <a href="/course">Add Course</a>
            //                                 </li>
            //                             </ul>
            //                         </li>)
            //                 })
            //                 }
            //             </ul>
            //         </li>

            //     )
            // })

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

                <div class="menu" style={{ overflowY: 'scroll' }}>
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

                        {RightPanel}
                    </ul>
                </div >


                <LoadScript />
            </React.Fragment >
        )

    }
}
