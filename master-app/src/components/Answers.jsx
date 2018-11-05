import React, { Component } from "react";
import AnswersList from "./AnswersList";
import { connect } from "react-redux";
import { changeQuistionclosedState,increesQuistionsNumber,chooseComponent } from "../actions/index";
import { bindActionCreators } from "redux";
import { getWebSocket } from "../data/serverCommunication";

class Answers extends Component {
    constructor(props) {
        super(props);
        let ws = getWebSocket();
        ws.onerror = () => this.addMessage("WebSocket error");
        ws.onopen = () => this.addMessage("WebSocket connectn established");
        ws.onclose = () => this.addMessage("WebSocket connection closed");
        ws.onmessage = msg => {
        };
    }
    nextQuestion = ()=>{
      let msg = {
        type: "send-quistion",
        quistionNumber: this.props.quistionNumber,
        roundNumber : this.props.roundNumber,
      };
      msg = JSON.stringify(msg);
      this.props.increesQuistionsNumber();
      const ws = getWebSocket();
      ws.send(msg);
      this.props.changeQuistionclosedState(false);
    }
  closeTheQuestion = (event) => {
    if(this.props.quistionNumber < 11){
      event.preventDefault();
      let msg = {type:'close-the-question'}
          msg  = JSON.stringify(msg);
          const ws = getWebSocket();
          ws.send(msg);
      this.props.changeQuistionclosedState(true);  
    }else{
      // let msg = {
      //   type: "send-quistion",
      //   quistionNumber: this.props.quistionNumber,
      // };
      // msg = JSON.stringify(msg);
      // this.props.increesQuistionsNumber();
      // const ws = getWebSocket();
      // ws.send(msg);

      this.props.chooseComponent('round');
    }
  };
  render() {
    return (
      <div className="col-sm-12">
        <h1 className="text-center">All Answers</h1>
        <AnswersList />
        <div className="float-right mt-2">
          {this.props.questionClosed === true ? (
            this.props.answers.length > 0 ?
            ''
            : <button className="btn btn-success" onClick={this.nextQuestion}>Next quistion</button>
          ) : (
            <button
              className="mr btn btn-danger"
              onClick={this.closeTheQuestion}
            >
              Close quistion
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    answers: state.appReducer.answers,
    questionClosed: state.appReducer.questionClosed,
    quistionNumber: state.appReducer.quistionNumber,
    roundNumber:state.appReducer.roundNumber
    
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators({ changeQuistionclosedState,increesQuistionsNumber,chooseComponent }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Answers);
