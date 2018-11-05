import React, { Component } from "react";
import { connect } from "react-redux";
import { changeComponent, loadQuestionAction } from "../actions";
import { getWebSocket } from "../data/serverCommunication";
import { bindActionCreators } from "redux";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { funnyText: false };
    let ws = getWebSocket();
    ws.onerror = () => console.log("WebSocket error");
    ws.onopen = () => console.log("WebSocket connectn established");
    ws.onclose = () => console.log("WebSocket connection closed");
    ws.onmessage = msg => {
      msg = JSON.parse(msg.data);
      console.log(msg.type);
      switch (msg.type) {
        case "get-quistion":
          this.props.loadQuestionAction(
            msg.quistionNumber,
            this.props.quizzerId
          );
          break;
        case "question-closed":
          this.props.changeComponent("empty");
        default:
      }
    };
  }
  
  changeText = event => {
    event.preventDefault();
    this.props.displayText("wait for the next quistion!");
  };
  sendAnswer = event => {
    event.preventDefault();
    let msg = { type: "send-answer", msg: this.refs.answer.value };
    msg = JSON.stringify(msg);
    const ws = getWebSocket();
    ws.send(msg);
    // this.changeText();
  };
  checkerText = event => {
    if (event.target.value.length > 0) {
      return this.setState({ funnyText: true });
    }
  };
  showFunnyText = () => {
    if (this.state.funnyText === true) {
      return (
        <label className="text-success">
          Ya Thats My Man! continue typing :){" "}
        </label>
      );
    }
  };
  render() {
    return (
      <div className="container">
        <h1 id="quizzer-title" className="text-primary">
          Quizzer
        </h1>
        <div className="col">
          <p id="question">{this.props.question}</p>
          {this.showFunnyText()}
        </div>
        <div className="col mt-5">
          {this.props.showActionForm === true ? (
            <form onSubmit={this.sendAnswer}>
              <label>
                <input
                  type="text"
                  onChange={this.checkerText}
                  ref="answer"
                  placeholder="Answer here.."
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    question: state.question,
    text: state.text,
    component: state.Component,
    showActionForm: state.showActionForm,
    quizzerId: state.quizzerId
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changeComponent, loadQuestionAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
