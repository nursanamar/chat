import React,{ Component } from "react";
import { ChatItem } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';

class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages : []
        }
    }
    render(){
        return (
            <div>
                <ChatItem 
                    avatar={'https://facebook.github.io/react/img/logo.svg'}
                    alt={'Reactjs'}
                    title={'Facebook'}
                    subtitle={'What are you doing?'}
                    date={new Date()}
                    unread={0}
                />    
            </div>
        )
    }
}

export default Message;