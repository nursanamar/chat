import React,{ Component } from "react";
import { ChatItem } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { Link } from "react-router-dom";
import Header from "./Component/Header";
import { newChat } from "./utils/model/Chat";

class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages : [],
            isLoading: true
        }
    }


    render(){
        let chatItems = [];
        let messages = this.props.messages;
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