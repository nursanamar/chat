import React, { Component } from "react";
import { hot } from "react-hot-loader";
// import MessageList from "./MessageList";
import { MainRouter } from "./config/route";
import Header from "./Component/Header";
import { BrowserRouter as Router } from "react-router-dom";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="col-sm-8 col-md-8 col-sm-offset-2">
                    
                    <MainRouter />
                </div>
            </Router>
        )
    }
}

export default hot(module)(App);