import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {chooseComponent} from "../actions/index"
import { openWebSocket, getWebSocket} from '../data/serverCommunication';

class Create extends Component {
    constructor(props){
        super(props);
        this.state = {showButton : false}
        let ws = openWebSocket();
        ws.onerror = () => this.addMessage('WebSocket error');
        ws.onopen = () => this.addMessage('WebSocket connectn established');
        ws.onclose = () => this.addMessage('WebSocket connection closed');
        ws.onmessage = (msg) => this.addMessage(msg.data);
    }
    addMessage(msg) {
        if(typeof msg !== "string") {
          msg = JSON.stringify(msg);
        }
        // console.log(msg);
    };
    creatCode = (event)=>{
        event.preventDefault();        
        if(!this.state.showButton){
            return false;
        }
        let msg = {type:'set-code',msg:this.refs.codeInput.value}
        msg  = JSON.stringify(msg);
        const ws = getWebSocket();
        ws.send(msg);
        this.props.chooseComponent('listPlayers');

    }
    showButtonFunction = ()=>{
        if(this.state.showButton === true) return <input className="btn btn-primary" type="submit"  value="Submit" />
        return 
    }
    validateTheValue = (event)=>{
        if(event.target.value.length > 4){
            return this.setState({showButton:true});
        }
        this.setState({showButton:false});
    }
    render() { 
        
        return ( 
        <div className="col-sm-12 border">
            <h1 className="text-center" >Create a new Quizze</h1>
            <form onSubmit={this.creatCode}>
                <div className="text-center">
                    <input className="mr" onChange={this.validateTheValue} ref="codeInput" type="text" placeholder="Create a new game code!"/>
                    {this.showButtonFunction()}
                </div>
            </form>
        </div> );
    }
}

  const mapStateToProps = state => {
    return {
      component : state.appReducer.component,
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ chooseComponent }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(Create);
 
