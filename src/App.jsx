import React, { Component } from "react";
import { hot } from "react-hot-loader";
// import MessageList from "./MessageList";
import { MainRouter } from "./config/route";
import Header from "./Component/Header";
import { BrowserRouter as Router,Route,Redirect } from "react-router-dom";
import MessageList from "./MessageList";
import ChatRoom from "./ChatRoom";
import NewChat from "./NewChat";
import Login from "./Login";


class App extends Component {
    constructor(props){
        super(props);
        this.ws = new WebSocket("ws://localhost:9000");
    }

    initWs(id){
        let payload = {
            action: "init",
            data: {
                id: id
            }
        }

        this.ws.send(JSON.stringify(payload))
    }

    componentDidMount(){
        this.ws.onopen = () => {
            console.log("openned")
            let id = localStorage.getItem("id");
            if(id == null){
                return;
            }else{
                this.initWs(id);
            }
        }

        this.ws.onmessage = (msg) => {
            console.log(msg)
        }
    }

    setId(id){
        this.initWs(id);
        localStorage.setItem("id",id);
    }

    render() {
        let id = localStorage.getItem("id");
        return (
            <Router>
                <div className="col-sm-8 col-md-8 col-sm-offset-2">
                    <Route 
                        path="/setId" 
                        render={(props) => {
                            return <Login {...props} setId={this.setId.bind(this)} /> 
                        }} 
                    />
                    <Route 
                        exact 
                        path="/" 
                        render={(props) => {
                           return <MessageList {...props} ws={this.ws} />
                        }} 
                    />
                    <Route path="/chat/:id" component={ChatRoom} />
                    <Route path="/new" component={NewChat} />
                    {
                        (id == null) && <Redirect to="/setId" />
                    }
                </div>
            </Router>
        )
    }
}

export default hot(module)(App);