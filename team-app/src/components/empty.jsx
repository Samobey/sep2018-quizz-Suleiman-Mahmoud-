import React, { Component } from "react";
import { connect } from "react-redux";
import { loadQuestionAction,changeComponent } from "../actions";
import { getWebSocket } from "../data/serverCommunication";
import { bindActionCreators } from "redux";


class Empty extends Component {
  constructor(props) {
    super(props);
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
          this.props.changeComponent("question");
          break;
      }
    };
  }
  render() {
    return (
      <div>
        <h1 id="quizzer-title" className="text-primary">
          Quizzer
        </h1>

        <p id="loading-text" className="align-center-middle">
          {this.props.text}
        </p>
        <div className="col-4" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    text: state.text
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({  loadQuestionAction,changeComponent }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Empty);
