import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import Header from "./Component/Header";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            auth: false,
        }

        console.log(this.props)
    }

    handleInput(e) {
        let text = e.target.value;
        this.setState({
            id: text
        })
    }

    setId(){
        if (this.state.id == '') {
            return;
        }

        this.setState({
            auth: true
        })

       this.props.setId(this.state.id);
    }

    render() {
        if(this.state.auth){
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div>
                <div>
                    <Header title="Set Id">
                        
                    </Header>
                </div>
                <div style={{ marginTop: 30 }} className="col-sm-12 col-md-12" >
                    <input className="form-control" onChange={this.handleInput.bind(this)} value={this.state.id} placeholder="id" type="text" /><br />
                    <button onClick={this.setId.bind(this)} className="btn btn-primary" >Set ID</button>
                </div>
            </div>
        )
    }
}

export default Login;