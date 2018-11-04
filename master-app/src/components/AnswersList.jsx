import React, { Component } from "react";
import { getWebSocket } from "../data/serverCommunication";
import { connect } from "react-redux";
import { addAnswer, deleteAnswer } from "../actions/index";
import { bindActionCreators } from "redux";

class AnswersList extends Component {
  constructor(props) {
    super(props);
    let ws = getWebSocket();
    ws.onerror = () => this.addMessage("WebSocket error");
    ws.onopen = () => this.addMessage("WebSocket connectn established");
    ws.onclose = () => this.addMessage("WebSocket connection closed");
    ws.onmessage = msg => {
      msg = JSON.parse(msg.data);
      console.log(msg);
      switch (msg.type) {
        case "get-answer":
          this.props.addAnswer(msg.teamId, msg.answer);
          break;
        default:
      }
    };
  }
  addMessage(msg) {
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }
  }
  acceptTheAnswer = event => {
    let msg = {
      type: "accept-the-answer",
      teamId: event.target.id,
      roundNumber: this.props.roundNumber
    };
    msg = JSON.stringify(msg);
    const ws = getWebSocket();
    ws.send(msg);
    this.props.deleteAnswer(event.target.id);
  };
  rejectTheAnswer = event => {
    let msg = {
      type: "reject-the-answer",
      teamId: event.target.id,
      roundNumber: this.props.roundNumber
    };
    msg = JSON.stringify(msg);
    const ws = getWebSocket();
    ws.send(msg);
    this.props.deleteAnswer(event.target.id);
  };
  showQuestionsOption = id => {
    if (this.props.questionClosed) {
      return (
        <div className="float-right col-sm-4">
          <button
            id={id}
            onClick={this.acceptTheAnswer}
            className="mr btn btn-success"
          >
            Accept
          </button>
          <button id={id} onClick={this.rejectTheAnswer} className="btn btn-danger">Reject</button>
        </div>
      );
    } else {
      return;
    }
  };
  render() {
    console.log(this.props.answers);
    return (
      <div className="col-sm-12 list border border-primary">
        {this.props.answers.map(answer => (
          <div
            key={answer.teamId}
            id={answer.teamId}
            ref="answer"
            className="mt-2 col-sm-12 row"
          >
            <div className="col-sm-8">
              <div>{answer.answer}</div>
            </div>
            {this.showQuestionsOption(answer.teamId)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    answers: state.appReducer.answers,
    questionClosed: state.appReducer.questionClosed,
    roundNumber: state.appReducer.roundNumber
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators({ deleteAnswer,addAnswer }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AnswersList);
