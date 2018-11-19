import React,{ Component } from "react";
import { hot } from "react-hot-loader";
import MessageList from "./MessageList";

class App extends Component {
    render(){
        return (
            <div className="col-sm-8 col-md-8 col-sm-offset-2">
                <MessageList />
            </div>
        )
    }
}

export default hot(module)(App);