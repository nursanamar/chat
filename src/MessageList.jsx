import React,{ Component } from "react";
import { ChatItem } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import {getMessages} from "./utils/model/Messages";
import { Link } from "react-router-dom";
import Header from "./Component/Header";

class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages : [],
            isLoading: true
        }
    }

    componentDidMount(){
        let messages = getMessages();
        this.setState({
            messages: messages
        })   
    }

    render(){
        let chatItems = [];
        let messages = this.state.messages;
        messages.reverse();
        messages.forEach((messege,key) => {
            chatItems.push(
                <Link key={key} to={"/chat/"+messege.id} >
                <ChatItem
                    avatar={messege.photo}
                    alt={messege.name}
                    title={messege.name}
                    subtitle={messege.lastChat.text}
                    date={messege.lastChat.date}
                    unread={0}
                /> 
                </Link>
            )
        }) 
        return (
            <div>
                <Header title="Pesan" >
                    <Link to="/new" ><h4>Peasn Baru</h4></Link>
                </Header>
                 {chatItems}  
            </div>
        )
    }
}

export default Message;