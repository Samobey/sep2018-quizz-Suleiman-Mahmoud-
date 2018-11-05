import React, { Component } from "react";
import TableList from "./components/TableList.jsx";
import QuestionStatus from "./components/QuestionStatus";
import LastAnswers from "./components/LastAnswers";
import Join from "./components/Join";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {
        join: <Join></Join>,
        tableList: <TableList />,
        question: <QuestionStatus />,
        lastAnswer: <LastAnswers />
      }
    };
  }

  render() {
    return (
      <div
        className="container border mt-5
    p-5"
      >
        {this.state.components[this.props.component]}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    component: state.component
  };
};

export default connect(mapStateToProps)(App);
