import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bridge from '../Components/Bridge'
import LoadScript from '../Routes/LoadScript';

import Select from 'react-select';
import { Input, Button } from "reactstrap";
var CryptoJS = require("crypto-js");

export default class Search extends Component {

    state = {
        result: null,
        query: '',
        Show: false,
        options: [
            { label: 'Criminal Record', value: 0 }
        ],
        selectedOption: null
    }
    handleSubmit = async () => {
        try {
            this.setState({ Show: true })
            let { data: result } = await Bridge.Search(this.state.query);
            console.log(result);
            if (result) {
                this.setState({
                    result,
                    Show: false
                })
            } else {
                this.setState({ Show: false })
            }
        } catch (error) {
            console.log(error);
        }
    }
    _handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {
        let { query, result, selectedOption, options } = this.state;
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Search</h2>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                            <div className="body">
                                < div className="form-horizontal" >

                                    {/* query  */}

                                    <div className="row clearfix">
                                        <div className="col-sm-4  form-control-label">
                                            <label>Keyword</label>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="bname"
                                                    className="form-control"
                                                    placeholder="Type and Enter Here..."
                                                    onChange={e => {
                                                        // console.log(e.target.name);
                                                        this.setState({ query: e.target.value })
                                                    }}
                                                    value={query}
                                                // onKeyDown={this._handleKeyDown}
                                                />

                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-10" />
                                    </div>

                                    {/* Type  */}

                                    <div className="row clearfix">
                                        <div className="col-sm-4  form-control-label">
                                            <label>Type</label>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-10" />
                                    </div>
                                    <br /> <br />


                                    <div className="row clearfix">
                                        <div className="col-sm-4  form-control-label" />
                                        <div className="col-sm-6">
                                            <div className="form-group">
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
                                        </div>
                                        <div className="col-md-10" />
                                    </div>


                                    {result &&
                                        <div class="list-group">
                                            {result.map((ival) => {
                                                var ciphertext = CryptoJS.AES.encrypt(`${ival.cr_identifier}`, 'secret key 123').toString();
                                                return (

                                                    <a href={`/Main/data?data=${ciphertext}`} class="list-group-item list-group-item-action" target='_blank'>
                                                        {/* <Link
                                                            to={`/Main/data?data=${ciphertext}`}
                                                            // onClick={() => this.handlecollapse(5, key, key1, key2, key3, key4)}
                                                            class=" waves-effect waves-block"
                                                        > */}
                                                        <i class="material-icons">person</i>
                                                        &nbsp;  &nbsp; &nbsp;
                                                        <span style={{ color: '#1e1e1e' }}>{ival.Personal_Details_Name_First}</span>
                                                        {/* </Link> */}


                                                    </a>
                                                )
                                            })}
                                        </div>
                                    }


                                </div >




                            </div>
                        </div>
                    </div>
                </div>
                <LoadScript />
            </section>
        )
    }
}
