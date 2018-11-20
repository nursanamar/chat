import React, { Component } from 'react';
import { MessageList } from "react-chat-elements";
import { getChats } from "./utils/storage";
import Header from "./Component/Header";
import { Link } from "react-router-dom";

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            chats : [],
            textInput : '',
        }

        this.param = this.props.match.params;
    }

    componentDidMount(){
        let chats = getChats(this.param.id);
        let temp = [];
        // console.log(chats)
        chats.forEach(chat => {
            temp.push({
                position: (chat.isSelf) ? 'right' : 'left',
                type: 'text',
                text: chat.text,
                date: chat.date
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
            date: new Date()
        }

        prevState.push(chat);
        this.setState({
            chat: prevState,
            textInput: ''
        })
        
    }

    render(){
        return (
            <div style={{height:window.innerHeight}} >
                <div className="row">
                    <Header title="Fula" >
                       <Link to="/" style={{color:"white"}} >
                            <h4>Kembali</h4>
                       </Link>
                    </Header>
                </div>
                <div className="row" >
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