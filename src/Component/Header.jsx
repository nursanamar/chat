import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div className="col-sm-12 header">
            <div className="row" >
                <div className="col-sm-2 col-xs-2 col-md-2">
                   <div style={{margin:"auto",padding:"auto"}} >
                        {props.children}
                   </div>
                </div>
                <div className="col-sm-10 col-xs-10 col-md-10" >
                    <div style={{paddingLeft: 20}} >
                        <h2 style={{ color: "white" }} >{props.title}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;