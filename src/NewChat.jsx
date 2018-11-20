import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "./Component/Header";

class NewChat extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:''
        }
    }

    handleInput(e){
        let text = e.target.value;
        if(text == ''){
            return ;
        }

        this.setState({
            id:text
        })
    }

    render(){
        return (
            <div>
                <div>
                    <Header title="Pesan baru">
                        <Link to="/" style={{ color: "white" }} >
                            <h4>Kembali</h4>
                        </Link>
                    </Header>
                </div>
                <div style={{marginTop:30}} className="col-sm-12 col-md-12" >
                    <input className="form-control" onChange={this.handleInput.bind(this)} value={this.state.id} placeholder="id"  type="text"/><br/>
                    <Link to={"/chat/"+this.state.id} ><button className="btn btn-primary" >Chat</button></Link>
                </div>
            </div>
        )
    }
}

export default NewChat;