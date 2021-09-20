import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bridge from '../Components/Bridge'
import LoadScript from '../Routes/LoadScript';

import Select from 'react-select';
import { Input, Button } from "reactstrap";
import ListingMore from './Pagination';
var CryptoJS = require("crypto-js");

export default class Search extends Component {

    state = {
        result: [],
        query: '',
        Show: false,
        options: [
            { label: 'Fields', value: 1 },
            { label: 'Image', value: 2 },
            { label: 'FingerPrint', value: 3 },
        ],
        TypeOptions: [
            { label: 'Fire Arms', value: 1, table: 'fire_arms' },
            { label: 'Organizations Details', value: 2, table: 'organization_details' },
            { label: 'Personal Details', value: 3, table: 'personal_details' },
            { label: 'Physical Features', value: 4, table: 'physical_features' },
            { label: 'Possession', value: 5, table: 'possession' },
            { label: 'Other', value: 6, table: 'others' },
        ],
        FieldOptions: [],
        selectedfield: null,
        selectedfield1: [],
        selectedOption: null,
        selectedtype: null
    }
    handleSubmit = async () => {
        let { query, result, selectedOption, options, TypeOptions, selectedtype, selectedfield1, FieldOptions } = this.state;

        try {
            // this.setState({ Show: true })
            if (query.toString().length == 0) {

                return true
            }
            let body = {}
            body.keyword = this.state.query;
            body.query = selectedfield1.join(` LIKE '${query}' OR `) + ` LIKE '${query}'`
            console.log(selectedfield1, selectedfield1.join(` LIKE ${query} and `));
            // return true
            let { data: result } = await Bridge.Search(body);
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
    handleChange = async (x, selectedOption) => {
        await this.setState({ [x]: selectedOption });
        console.log(selectedOption);
        // to get the field options 
        if (x == 'selectedtype') {
            let Query = `SELECT COLUMN_NAME as label,COLUMN_NAME as field FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='crrecords' AND TABLE_NAME = '${selectedOption.table}' AND COLUMN_NAME <> 'CR_IDENTIFIER';`
            let { data: result } = await Bridge.Read(Query)
            // console.log(result);
            if (result) {
                this.setState({
                    FieldOptions: result,
                    selectedfield: null
                })
            }
        } else if (x == 'selectedfield') {
            let selectedfield1 = []
            let wait = await selectedOption.map((ival) => {
                selectedfield1.push(ival.field)
            })
            await Promise.all(wait)

            // console.log(selectedOption1.join(","));
            await this.setState({ selectedfield1 })
        } else if (x == 'selectedOption') {
            this.setState({
                selectedtype: null, selectedfield: null
            })
        }
    };
    render() {
        let { query, result, selectedOption, options, TypeOptions, selectedtype, selectedfield, FieldOptions } = this.state;
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



                                    {/* Type  */}

                                    <div className="row clearfix">
                                        <div className="col-sm-4  form-control-label">
                                            <label>Search By</label>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <Select
                                                    // isMulti={true}
                                                    value={selectedOption}
                                                    onChange={(e) => this.handleChange('selectedOption', e)}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-10" />
                                    </div>

                                    {/* Type  */}

                                    {selectedOption && selectedOption.value == 1 &&
                                        <div>
                                            <div className="row clearfix">
                                                <div className="col-sm-4  form-control-label">
                                                    <label>Type</label>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <Select
                                                            // isMulti={true}
                                                            value={selectedtype}
                                                            onChange={(e) => this.handleChange('selectedtype', e)}
                                                            options={TypeOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-10" />
                                            </div>
                                            <div className="row clearfix">
                                                <div className="col-sm-4  form-control-label">
                                                    <label>Field Name</label>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <Select
                                                            isMulti={true}
                                                            value={selectedfield}
                                                            onChange={(e) => this.handleChange('selectedfield', e)}
                                                            options={FieldOptions}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-10" />
                                            </div>

                                        </div>

                                    }

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
                                                    onKeyDown={this._handleKeyDown}
                                                />

                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-10" />
                                    </div>
                                    <br />


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

                                    <ListingMore result={result} arraylength={result.length} />



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
