import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {loadQuistionsAction,addQuistion} from "../actions/index"

class Quistions extends Component {
    addToQuistionList = (event)=>{
        this.props.addQuistion(event.target.id);
    }
    addClassToQuistion = (id)=>this.props.selectedQuistions.includes(`${id}`) ? "bg-success":"col-sm-3 quistions"
    render() { 
        console.log('from component',this.props.selectedQuistions.includes('1'),this.props.selectedQuistions)
        return ( 
        <div className="mt border border-primary col-sm-12 row">
        {
            this.props.quistions.map((quistionGroup)=>{
            return (
            <div key={quistionGroup[0].category} className="m-1 border border-primary col-sm-12 row">
                <h4 className="text-center">choose 12 question!</h4>
                <h2 className="col-sm-12 text-center" key={quistionGroup[0].category}>{quistionGroup[0].category}</h2>
                {quistionGroup.map(quistion=><span className={this.addClassToQuistion(quistion._id)} onClick={this.addToQuistionList} key={quistion._id} id={quistion._id}>{quistion.question}</span>)}
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
