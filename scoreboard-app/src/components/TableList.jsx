import React, { Component } from "react";
import { connect } from "react-redux";
class TableList extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1 id="quizzer-title" className="text-primary text-center">
          Score Board
        </h1>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Teams</th>
              <th scope="col">Round 1</th>
              <th scope="col">Round 2</th>
              <th scope="col">Round 3</th>
              <th scope="col">Totale Score</th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(result => (
              <tr>
                <td key={result.name}>{result.name}</td>
                <td key={result.round1}>{result.round1}</td>
                <td key={result.round2}>{result.round2}</td>
                <td key={result.round3}>{result.round3}</td>
                <td key={result.round1+result.round2+result.round3}>{result.round1+result.round2+result.round3}</td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
  };
};

export default connect(mapStateToProps)(TableList);
