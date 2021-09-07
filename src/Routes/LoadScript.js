import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

export default class LoadScript extends Component {
    render() {
        return (
            <React.Fragment>
                <ScriptTag type="text/javascript" src="/assets/js/jquery.min.js" />
                <ScriptTag type="text/javascript" src="/assets/js/bootstrap.js" />
                <ScriptTag type="text/javascript" src="/assets/js/admin.js" />
                <ScriptTag type="text/javascript" src="/assets/js/waves.js" />
            </React.Fragment>
        );
    }
}