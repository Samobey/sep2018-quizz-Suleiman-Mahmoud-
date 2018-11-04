import React, { Component } from "react";
import "./App.css";
import Empty from "./components/empty.jsx";
import Entry from "./components/entry";
import Join from "./components/join";
import Question from "./components/question";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {
        empty: <Empty />,
        entry: <Entry />,
        join: <Join />,
        question: <Question />
      }
    };
  }

  render() {
    return (
      <div className="App">
        <div
          className="container border mt-5
        pb-5"
        >
          {this.state.components[this.props.component]}
        </div>
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
