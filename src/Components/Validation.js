import React, { Component } from "react";

export default class Essentials extends Component {
    getMaster = async () => {
        const adminId = await localStorage.getItem("userId");
        this.setState({ adminId });
    };

    validate = (state, errorState, errorMessage) => {
        if (!state) {
            this.setState({
                [errorState]: [errorMessage],
                enterallfield: 'Enter All Fields'
            });
            return true;
        } else {
            this.setState({
                [errorState]: null,
                enterallfield: null
            });
            return false;
        }
    };
    checkPasswordComplexity = (password, errorState) => {
        let result = this.checkPwd(password)
        if (result == 'ok') {
            this.setState({
                [errorState]: null,
                enterallfield: null
            });
            return false;
        } else {
            this.setState({
                [errorState]: [result],
                enterallfield: 'Enter All Fields'
            });
            return true;
        }
    }
    checkPwd(str) {
        if (str.length < 6) {
            return ("Minimun 6 character need");
        }
        // else if (str.length > 50) {
        //   return ("too_long");
        // }
        else if (str.search(/\d/) == -1) {
            return ("You have to enter Numbers and Letters");
        } else if (str.search(/[a-zA-Z]/) == -1) {
            return ("You have to enter Numbers and Letters");
        }
        // else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        //   return ("bad_char");
        // }
        return ("ok");
    }
    validateText = (state, errorState, errorMessage) => {
        if (state && state.toString().trim()) {
            this.setState({
                [errorState]: null, enterallfield: null
            });
            return false;
        } else {
            this.setState({
                [errorState]: [errorMessage],
                enterallfield: 'Enter All Fields'
            });
            return true;
        }
    };
    validateInteger = (state, errorState, errorMessage) => {
        if (parseInt(state) <= 0) {
            this.setState({
                [errorState]: [errorMessage],
                enterallfield: 'Enter All Fields'
            });
            return true;
        } else {
            this.setState({
                [errorState]: null, enterallfield: null
            });
            return false;
        }
    };

    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (false)
            //correct
        }
        // alert("You have entered an invalid email address!")
        return (true)
    }
    validatecsv = (state, errorState, errorMessage) => {
        console.log(state.name);
        var fileExtension = state.name.split('.').pop();
        if (fileExtension == "csv" || fileExtension == "CSV") {

            this.setState({
                [errorState]: null
            });
            return false;
        } else {
            this.setState({
                [errorState]: [errorMessage]
            });
            return true;
        }
    };

    onChangeSelect = e => {
        let val = {
            label: e.target.options[e.target.selectedIndex].innerHTML,
            value: e.target.value
        };
        this.setState({ [e.target.name]: val });
    };

    handleChange = selectedOption => {
        console.log(selectedOption)
        let selectedValue = '';
        selectedOption.map(values => (selectedValue += `${values.value},`));
        selectedValue = selectedValue.replace(/,\s*$/, '');
        this.setState({
            selectedService: selectedOption,
            servicesValue: selectedValue
        });
    };

    selectMultipleImage = e => {
        // console.log(e.target.files);
        this.setState({ [e.target.name]: e.target.files });
    };
    selectSingleImage = e => {
        // console.log(e.target.files);
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    ValidationView = errorname => {
        return (
            <React.Fragment>
                <span style={{ color: "#F44336" }}>{errorname}</span>
            </React.Fragment>
        );
    };
    getValueFromArray = (d, array, ch = "value", ch1 = "label") => {
        if (array.length > 0) {
            if (array.length !== 0) {
                let filtered = array.filter(function (item) {
                    return item[ch] == d;
                });
                let v = filtered[0];
                if (v != undefined) {
                    return v[ch1];
                } else {
                    return '-';
                }
            }
        } else {
            return '-';
        }

    };
    getValueFromArray1 = (d, array) => {
        //console.log(array);
        if (array.length > 0) {
            if (array.length !== 0) {
                let filtered = array.filter(function (item) {
                    return item.value == d;
                });
                let v = filtered[0];
                if (v != undefined) {
                    return v
                } else {
                    return "-";
                }
            }
        } else {
            return "-";
        }
    };
    geterrorvalue = (d) => {
        let data = JSON.parse(d)

        if (data) {
            return data.stripeErrorCode
        } else { return "" }
    }
    geterrorvalue1 = (d) => {
        let data = JSON.parse(d)

        if (data) {
            return data.message
        } else { return "" }
    }
    geterrorvalue2 = (d) => {
        let data = JSON.parse(d)

        if (data) {
            return data.type
        } else { return "" }
    }
    getnameFromArray = (d, userlist, productlist) => {
        let val = ""
        let val1 = ""
        if (productlist) {
            val1 = productlist.map((a) => {
                if (a.id == d) {
                    val = userlist.map((ival) => {
                        if (parseInt(ival.value) == parseInt(a.merchant_id)) {
                            return ival.label
                        }
                    })
                    return val
                }
            })
        }
        return val1
    }
    edit = (d, modalId) => {
        return (
            <div>
                <button
                    type="button"
                    data-color="red"
                    data-toggle="modal"
                    data-target={`#${modalId}`}
                    class="btn bg-red waveseffect"
                    onClick={() => this.buttonEdit(d)}
                >
                    Edit
                </button>
            </div>
        );
    };

    button = (title = 'Edit', onClick, style = 'bg-red') => {
        return (
            <button
                type="button"
                class={`btn ${style} waveseffect`}
                onClick={onClick}
            >
                {title}
            </button>
        );
    };

    checkEmpty = d => {
        return <span>{d ? d : "-"}</span>;
    };
    getstatusFromArray = d => {
        if (d == 3) {
            return <button className="btn btn-success" style={{ width: 100 }}>Accepted</button>
        } else if (d == 1) {
            return <button className="btn btn-danger" style={{ width: 100 }}>Declined</button>
        }
    }
    datechange = (d) => {
        if (d) {
            let date = new Date()
            date.setTime(d)
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            if (month < 10) {
                month = "0" + month
            }
            return day + "-" + month + "-" + year
        } else {
            return "-"
        }
    }
    dateformatchange = (d) => {
        if (d) {
            let date = new Date(d)
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            if (month < 10) {
                month = "0" + month
            }
            return day + "-" + month + "-" + year
        } else {
            return "-"
        }
    }
    dealtype = (d) => {
        if (d == 1) {
            return "Super deal"
        }
        else {
            return "1+ deal"
        }
    }
}
