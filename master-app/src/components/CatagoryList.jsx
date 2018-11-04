import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadCatagoriesAction,loadQuistionsAction,deleteTheLastCatagory} from "../actions/index"

class CatagoryList extends Component { 
    addQuistionsToList = (event)=>{
        event.preventDefault();
        const id = event.target.id;
        let notAdded = this.props.addCatagories.indexOf(element => element._id = id);
        console.log(notAdded);
        if(notAdded === -1){
            this.props.loadQuistionsAction(id);
        }
        if(this.props.addCatagories.length > 2){
            this.props.deleteTheLastCatagory();
        }
    }
    checkTheClass = (id)=> this.props.addCatagories.includes(id) ? 'alert alert-success' : ''
    render() { 
        return ( 
        <div className="border border-primary list col-sm-8">
            {
                this.props.catagories.map(({_id})=><h2 key={_id} className={this.checkTheClass(_id)}><a href="#" id={_id} onClick={this.addQuistionsToList} >{_id}</a></h2>)
            }
        </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        catagories : state.appReducer.catagories,
        addCatagories: state.appReducer.addCatagories,
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loadCatagoriesAction,loadQuistionsAction,deleteTheLastCatagory }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(CatagoryList);