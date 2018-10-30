import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadCatagoriesAction,loadQuistionsAction} from "../actions/index"

class Quistions extends Component {
    
    render() { 
        console.log(this.props.quistions);
        return ( 
        <div className="mt border border-primary col-sm-12 row">
            {this.props.quistions.map((quistionGroup)=>{<div className="col-sm-4">{quistionGroup[0]}</div>})}
        </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        quistions : state.appReducer.quistions,
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loadCatagoriesAction,loadQuistionsAction }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(Quistions);
