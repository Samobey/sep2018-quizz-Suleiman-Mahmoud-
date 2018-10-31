import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadQuistionsAction,addQuistion} from "../actions/index"

class Quistions extends Component {
    addToQuistionList = (event)=>{
        this.props.addQuistion(event.target.id);
    }
    addClassToQuistion = (id)=>this.props.selectedQuistions.includes(`${id}`) ? "alert alert-success":"col-sm-3 quistions"
    render() { 
        console.log('from component',this.props.selectedQuistions.includes('1'),this.props.selectedQuistions)
        return ( 
        <div className="mt border border-primary col-sm-12 row">
        {
            this.props.quistions.map((quistionGroup)=>{
            return (
            <div key={quistionGroup[0].catId} className="m-1 border border-primary col-sm-12 row">
                <h2 className="col-sm-12 text-center" key={quistionGroup[0].catId}>{quistionGroup[0].catId}</h2>
                {quistionGroup.map(quistion=><span className={this.addClassToQuistion(quistion.id)} onClick={this.addToQuistionList} key={quistion.id} id={quistion.id}>{quistion.quistion}</span>)}
            </div>)
        })}
        </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        quistions : state.appReducer.quistions,
        selectedQuistions:state.appReducer.selectedQuistions
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({ addQuistion,loadQuistionsAction }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(Quistions);
