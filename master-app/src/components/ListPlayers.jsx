import React, { Component } from 'react';
import AcceptPlayer from "./AcceptPlayer"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {chooseComponent,addPlayer} from "../actions/index"
import { getWebSocket} from '../data/serverCommunication';

class ListPlayers extends Component {
    constructor(props){
        super(props);
        const ws = getWebSocket();
        ws.onerror = () => this.addMessage('WebSocket error');
        ws.onopen = () => this.addMessage('WebSocket connectn established');
        ws.onclose = () => this.addMessage('WebSocket connection closed');
        ws.onmessage = (msg) => {
            this.props.addPlayer(JSON.parse(msg.data));
        };
    }
    addMessage(msg) {
        if(typeof msg !== "string") {
          msg = JSON.stringify(msg);
        }
        console.log(msg);
        return msg;
    };
    accepAll = (event)=>{
        event.preventDefault();
        this.props.chooseComponent('setQuistions');
    }
    render() { 
        console.log(this.props)
        return ( 
        <div className="col-sm-12">
            <h1 className="text-center">Accept Players</h1>
            <div className="border border-primary rounded list">
                {this.props.players.map(({id,name})=><AcceptPlayer key={id} name={name} />)}
            </div>
            <div className="players-buttons float-right">
                <button onClick={this.accepAll} className="mr btn btn-primary">Accept all & Start!</button>
                <button className="btn btn-dark">Start!</button>
            </div>
        </div> );
    }
}
const mapStateToProps = state => {
    return {
      players : state.appReducer.players,
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ chooseComponent ,addPlayer}, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(ListPlayers);
