import React, { Component } from 'react';
import { MessageList } from "react-chat-elements";
import { getChats,newChat } from "./utils/model/Chat";
import Header from "./Component/Header";
import { Link } from "react-router-dom";

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.param = this.props.match.params;
        this.state = {
            chats : [],
            textInput : '',
        }

    }

    componentDidMount(){
        let chats = getChats(this.param.id);
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
            chats: temp
        })
        
    }


    sendChat(){
        let prevState = this.state.chats;
        let chat = {
            position: (true) ? 'right' : 'left',
            type: 'text',
            text: this.state.textInput,
            date: Date.now()
        }

        prevState.push(chat);
        this.setState({
            chat: prevState,
            textInput: ''
        })

        newChat(this.param.id,{
            text: chat.text,
            isSelf: true,
            date: chat.date
        })
        
    }

    render(){
        return (
            <div style={{height: window.innerHeight / 10}}>
                <div className="row">
                    <Header title={this.param.id} >
                       <Link to="/" style={{color:"white"}} >
                            <h4>Kembali</h4>
                       </Link>
                    </Header>
                </div>
                <div style={{ height: (window.innerHeight / 10) * 8, overflowY:"scroll" }} className="row" >
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={this.state.chats} />
                </div>
                <div style={{ bottom: 0 }} className="row" >
                    <div className="col-sm-12">
                        <input style={{width:"80%"}} value={this.state.textInput} onChange={(e) => this.setState({ textInput: e.target.value })} type="text" />
                        <button onClick={this.sendChat.bind(this)} >Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatRoom;