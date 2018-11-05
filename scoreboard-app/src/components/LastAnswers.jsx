import React, { Component } from "react";
import { connect } from "react-redux";
class QuestionClosed extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1 id="quizzer-title" className="text-primary text-center">
          Question in Closed.
        </h1>

        <div className="row">
          <h4 className="col text-center text-danger">category : {this.props.category}</h4>
        </div>
        <div className="row">
          <h5 className="col-4 offset-4 text-center border 
          shadow-lg p-3 mb-5 bg-white rounded">{this.props.question}</h5>
        </div> <div className="row">
          <p className="col text-center">This is the last answers</p>
        </div>
        <div className="row">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Teams</th>
              <th scope="col">Answers</th>
             
            </tr>
          </thead>
          <tbody>
          {this.props.teams.map(team => (
              <tr>
                <td key={team}>{team}</td>

                
                  <td key={this.props.answers}>{this.props.answers}</td>
               
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
    answers: state.answers,
    teams: state.teams,
    question:state.question,
    category:state.category,

  };
};

export default connect(mapStateToProps)(QuestionClosed);
