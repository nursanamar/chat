import React, { Component } from "react";
import { hot } from "react-hot-loader";
// import MessageList from "./MessageList";
import { MainRouter } from "./config/route";
import Header from "./Component/Header";
import { BrowserRouter as Router,Route,Redirect } from "react-router-dom";
import MessageList from "./MessageList";
import { getMessages } from "./utils/model/Messages";
import ChatRoom from "./ChatRoom";
import NewChat from "./NewChat";
import Login from "./Login";
import { getChats, newChat } from "./utils/model/Chat";


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            refresh : false,
            messages: [],
            chats: [],
            currentId: null,
        }
        this.ws = new WebSocket("wss://fathomless-dusk-76993.herokuapp.com");
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
        this.update();
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
            let payload = JSON.parse(msg.data)
            switch (payload.action) {
                case "auth":
                    console.log("Success")
                    break;
                case "newMsg":
                    let id = payload.data.id;
                    let chat = payload.data.chat;
                    console.log(id,chat)
                    newChat(id, chat);
                    this.update()
                    if(this.state.currentId){
                        console.log(this.state.currentId)
                        this.getChats(this.state.currentId)
                    }
                default:
                    break;
            }
        }
    }

    update() {
        let messages = getMessages();
        this.setState({
            messages: messages
        })
    }

    setId(id){
        this.initWs(id);
        localStorage.setItem("id",id);
    }

    getChats(id){
        let chats = getChats(id);
        let temp = [];
        chats.forEach(chat => {

            temp.push({
                position: (chat.isSelf) ? 'right' : 'left',
                type: 'text',
                text: chat.text,
                date: new Date(chat.date)
            })
        });

        this.setState({
            chats: temp,
            currentId: id
        })

    }

    clearChats(){
        this.setState({
            chats: [],
            currentId:null
        })
    }

    sendChat(id,text) {
        let prevState = this.state.chats;
        let chat = {
            position: (true) ? 'right' : 'left',
            type: 'text',
            text: text,
            date: Date.now()
        }

        prevState.push(chat);
        this.setState({
            chat: prevState,
        })

        let wsPay = {
            action: 'send',
            data: {
                to: id,
                text: text
            }
        }

        this.ws.send(JSON.stringify(wsPay))

        newChat(id, {
            text: chat.text,
            isSelf: true,
            date: chat.date
        })

        this.update()

    }


    render() {
        let id = localStorage.getItem("id");
        return (
            <Router>
                <div className="col-sm-8 col-md-8 col-sm-offset-2">
                    <Route 
                        path="/setId" 
                        render={(props) => {
                            return <Login {...props} refresh={this.state.refresh} setId={this.setId.bind(this)} /> 
                        }} 
                    />
                    <Route 
                        exact 
                        path="/" 
                        render={(props) => {
                            return <MessageList messages={this.state.messages} {...props} ws={this.ws} />
                        }} 
                    />
                    <Route 
                        path="/chat/:id" 
                        render={(props) => {
                            return <ChatRoom {...props} sendChat={this.sendChat.bind(this)} chats={this.state.chats} clearChats={this.clearChats.bind(this)} getChats={this.getChats.bind(this)} />
                        }} 
                    />
                    <Route path="/new" component={NewChat} />
                    {
                        (id == null) && <Redirect to="/setId" />
                    }
                </div>
            </Router>
        )
    }
}

export default App;