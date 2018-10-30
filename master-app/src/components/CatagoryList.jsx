import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadCatagoriesAction,loadQuistionsAction} from "../actions/index"

class CatagoryList extends Component { 
    
    render() { 
        return ( 
        <div className="border border-primary list col-sm-8">
            {
                this.props.catagories.map(({id})=><h2 onClick={()=>this.props.loadQuistionsAction(id)} key={id}>{id}</h2>)
            }
        </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        catagories : state.appReducer.catagories,
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loadCatagoriesAction,loadQuistionsAction }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(CatagoryList);