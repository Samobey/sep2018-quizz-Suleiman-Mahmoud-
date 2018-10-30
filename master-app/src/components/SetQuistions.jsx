import React, { Component } from 'react';
import CatagoryList from "./CatagoryList";
import Quistions from "./Quistions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadCatagoriesAction} from "../actions/index"

class ListPlayers extends Component {
    constructor(props){
        super(props);
        this.props.loadCatagoriesAction();
    }
    render() { 
        
        return ( 
        <div className="col-sm-12">
            <h1>Quizze  Round (1)</h1>
            <div className="col-sm-12 row">
                    <CatagoryList></CatagoryList>
                    <div className="float-right col-sm-4">
                        <button className="btn btn-primary">Start the quizze</button>
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
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loadCatagoriesAction }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(ListPlayers);