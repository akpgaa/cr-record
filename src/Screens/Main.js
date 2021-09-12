import React, { Component } from 'react'
import Bridge from '../Components/Bridge';
import JSON from '../Json/Details.json';
var md5 = require('md5');
var CryptoJS = require("crypto-js");


export default class Main extends Component {
    state = {
        result: null
    }

    componentDidUpdate = () => {
        if (this.props.location.search) {
            var bytes = CryptoJS.AES.decrypt(this.props.location.search.split('data=')[1], 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (this.state.originalText == originalText) {
                // console.log('Already Called');
            } else {
                this.Mainfunction()
            }
        }
    }
    componentDidMount = async () => {
        this.Mainfunction()
    }
    Mainfunction = async () => {
        let { data } = this.props;
        // consolethis.props.match.params.id));
        console.log(this.props);

        if (this.props.location.search) {
            // let query = useQuery();
            // let data = useQuery.get("data")
            // this.setState({ data: [] })
            console.log(this.props.location.search.split('data='));
            // Decrypt
            let data = []
            var bytes = CryptoJS.AES.decrypt(this.props.location.search.split('data=')[1], 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            console.log(originalText);
            let { data: result } = await Bridge.getsingledata('cr_identifier', originalText)

            data = result[0]
            if (result) {
                this.setState({
                    data,
                    originalText
                })
                return true
            }
        }
    }
    render() {
        let { data } = this.state;
        let Personal = []
        let Physical = []
        let Possession = []
        let Fire = []
        let Organization = []
        let others = []
        let jsonofjson = [
            { key: 'personal', arr: Personal, display: "Personal Details" },
            { key: 'Physical', arr: Physical, display: "Physical Features" },
            { key: 'Possession', arr: Possession, display: "Possession" },
            { key: 'Fire', arr: Fire, display: "Fire Arms" },
            { key: 'Organization', arr: Organization, display: "Organization Details" },
            { key: 'Others', arr: others, display: "Others Details" }
        ]
        if (data) {
            jsonofjson.map((jval) => {
                JSON[jval.key].map((ival, i) => {
                    jval.arr.push(
                        <tr>
                            {/* <th scope="row">{i + 1}</th> */}
                            {
                                ival.bold == 'yes' ?
                                    <th scope="col">{ival.name}</th>
                                    :
                                    <td>{ival.name}</td>
                            }
                            <td>{data[ival.key]}</td>
                        </tr>
                    )
                })
            })
        }
        let Accord = []
        jsonofjson.map((ival, i) => {
            Accord.push(
                <div class="card">

                    <div class="card-header" id={`head${i}`}>
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`} >
                                <i class="material-icons">add
                                </i>{" "}
                                <span style={{ color: '#F44336' }}>
                                    {ival.display}
                                </span>
                            </button>
                        </h2>
                    </div>

                    <div id={`collapse${i}`} class="collapse" aria-labelledby={`head${i}`} data-parent="#accordionExample">
                        <div class="card-body">
                            {data &&

                                < table class="table">
                                    {/* <thead>
                                    <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                    </tr>
                            </thead> */}
                                    <tbody>
                                        {ival.arr}
                                    </tbody>
                                </table>
                            }  </div>
                    </div>
                </div>

            )
        })
        return (
            <section class="content">
                <div class="overlay">
                </div>
                <div class="container-fluid">
                    <div class="block-header">
                        <h2></h2>
                    </div>
                </div>
                {/* <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> */}


                <center>
                    <img src="https://sample-videos.com/img/Sample-jpg-image-50kb.jpg" class="rounded mx-auto d-block" alt="..."></img>
                    <div >
                        <h1>{data && data.Personal_Details_Name_First}</h1>
                        <h2>{data && data.Personal_Details_Native_Police_Station}</h2>

                    </div>
                </center>
                <div class="accordion" id="accordionExample">

                    {Accord}
                </div>


                {/* </div> */}
            </section >
        )
    }
}
