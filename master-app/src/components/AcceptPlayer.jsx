import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {acceptOrReject} from "../actions/index"
import { getWebSocket} from '../data/serverCommunication';

class AcceptPlayer extends Component {
    constructor(props){
        super(props);
        
    }
    acceptRejectPlayer = (status)=>{
        let msg = {type:status,id:this.props.id}
        msg  = JSON.stringify(msg);
        const ws = getWebSocket();
        ws.send(msg);
        this.props.acceptOrReject(this.props.id,status)
    }
    render() { 
        return ( 
        <div className="players">
            <div>
                <span>{this.props.name} </span>
                <div className="float-right">
                    <button onClick={()=>this.acceptRejectPlayer('accepted')} className="mr btn btn-success">Accept!</button>
                    <button onClick={()=>this.acceptRejectPlayer('rejected')} className="btn btn-danger">Reject!</button>
                </div>
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
    return bindActionCreators({ acceptOrReject }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(AcceptPlayer);
