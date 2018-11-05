import React, { Component } from "react";
import { connect } from "react-redux";
import { getWebSocket } from "../data/serverCommunication";
import { loadQuestionAction, addAnswer ,loadResultsAction} from "../actions/index";
import { bindActionCreators } from "redux";

class questionStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswers: false,
      funnyText: false,
      accepted: [],
      roundNumber: 1
    };
    
    let ws = getWebSocket();
    console.log(ws);
    ws.onerror = () => console.log("err in websocket");
    ws.onclose = () => console.log("websocket closed");
    ws.onmessage = msg => {
      msg = JSON.parse(msg.data);
      console.log(msg);
      switch (msg.type) {
        case "get-quistion":
          this.setState({ accepted: [], roundNumber: msg.roundNumber });
          this.props.loadQuestionAction(
            msg.quistionNumber,
            this.props.quizzerId
          );
          break;
        case "get-answer":
          this.props.addAnswer(msg.teamId, msg.answer, msg.name);
          break;
        case "question-closed":
          this.setState({ showAnswers: true });
          break;
        case "accept-the-answer":
          let accepted = [...this.state.accepted];
          accepted.push(msg.teamId);
          this.setState({ accepted });
          break;
        case "get-results":
            this.props.loadResultsAction(this.props.quizzerId);
        break;
      }
    };
  }
  checkAccepted(id) {
    console.log(this.state.accepted, id);
    if (this.state.accepted.includes(`${id}`))
      return <span className="alert alert-success">ok</span>;
    return <span className="alert alert-danger">not accepted yet</span>;
  }
  render() {
    console.log("answers", this.props.answers);
    return (
      <div className="container">
        <h1 id="quizzer-title" className="text-primary text-center">
          Question in progress..
        </h1>

        <div className="row">
          <h5 className="col text-center text-primary">
            Round number : {this.state.roundNumber}
          </h5>
          <h5 className="col text-center">
            <div className="text-warning">
              category : {this.props.question.category}
            </div>
          </h5>
        </div>
        <div className="row">
          <div
            className="col-4 offset-4 text-center border 
          shadow-lg p-3 mb-5 bg-white rounded
          "
          >
            {this.props.question.question}
          </div>
        </div>
        <div className="row">
          <table className="table border">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Teams</th>
                {this.state.showAnswers ? <th scope="col">answers</th> : ""}
              </tr>
            </thead>
            <tbody>
              {this.props.answers.map(answer => (
                <tr>
                  <td key={answer.teamId}>{answer.name}</td>
                  {this.state.showAnswers ? (
                    <td key={answer.teamId}>
                      {answer.answer}
                      {this.checkAccepted(answer.teamId)}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    teams: state.teams,
    question: state.question,
    quizzerId: state.quizzerId,
    answers: state.answers
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators({ loadQuestionAction, addAnswer,loadResultsAction }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(questionStatus);
