import React, { Component } from 'react';
import CatagoryList from "./CatagoryList";
import Quistions from "./Quistions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadCatagoriesAction,chooseComponent} from "../actions/index"
import {getWebSocket} from '../data/serverCommunication';

class SetQuistions extends Component {
    constructor(props){
        super(props);
        this.props.loadCatagoriesAction();
    }
    startTheRound = ()=>{
        // console.log(this.props.selectedQuistions);
        let msg = {type:'start-the-round',quistions:this.props.selectedQuistions,me:'master'}
        msg  = JSON.stringify(msg);
        const ws = getWebSocket();
        ws.send(msg);
        this.props.chooseComponent('answer');
    }
    render() { 
        
        return ( 
        <div className="col-sm-12">
            <h1>Quizze  Round (1)</h1>
            <div className="col-sm-12 row">
                    <CatagoryList></CatagoryList>
                    <div className="float-right col-sm-4">
                        <button className="btn btn-primary" onClick={this.startTheRound}>Start the quizze</button>
                    </div>
            </div>
            <div className="float-right col-sm-4">
                <button className=" btn btn-success">Choose the quistions</button>
            </div>
            <Quistions></Quistions>
        </div> );
    }
}
const mapStateToProps = state => {
    return {
      catagories : state.appReducer.catagories,
      selectedQuistions:state.appReducer.selectedQuistions
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loadCatagoriesAction ,chooseComponent}, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(SetQuistions);