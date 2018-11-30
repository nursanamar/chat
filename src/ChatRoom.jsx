import React, { Component } from 'react';
import { MessageList } from "react-chat-elements";

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
        this.props.getChats(this.param.id);            
    }


    
    componentWillUnmount(){
        this.props.clearChats()
    }

    sendChat(){
        this.props.sendChat(this.param.id,this.state.textInput);
        this.setState({
            textInput: ''
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
                        dataSource={this.props.chats} />
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