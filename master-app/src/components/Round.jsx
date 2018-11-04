import React, { Component } from 'react';
import { newRound ,chooseComponent} from "../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class Round extends Component {
    newRound =()=>{
        this.props.newRound();
    }
    finishTheQuizze = ()=>{
        window.location.reload()
    }
    render() { 
        return (
        <div className="col-sm-12">
            <div className="mb-10">
                <h1 className="text-center">Finish the quizze or start a new round! </h1>
                <p className="text-center">The  round is finished. Do you want to start a new round?</p>
            </div>
            <div className="text-center mt-10">
                <button className="mr btn btn-danger" onClick={this.finishTheQuizze}>Finish th quizze</button>
                <button className="btn btn-success" onClick={this.newRound}>New Round!</button>
            </div>
        </div> );
    }
}
const mapStateToProps = state => {
    return {
      answers: state.appReducer.answers,
      questionClosed: state.appReducer.questionClosed,
      quistionNumber: state.appReducer.quistionNumber,
      
    };
  };
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({newRound,chooseComponent }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    matchDispatchToProps
  )(Round);