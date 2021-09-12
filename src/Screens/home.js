import React, { Component } from 'react'
import Essentials from '../Components/Validation';
export default class home extends Essentials {
    render() {
        return (
            <section class="content">
                <div class="container-fluid">
                    <div class="block-header" align="center">
                        <h3 class="" style={{ color: "#F44336" }}>
                            {" "}
                            Welcome to Criminal Search System
                        </h3>
                    </div>
                </div>
            </section>
        )
    }
}
