import ListTeam from "./listTeam";
import React, { Component } from "react";
import { changeComponent } from "../actions";
import { connect } from "react-redux";
import {getWebSocket } from "../data/serverCommunication";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = { coolWarning: false,error:false };
    let ws = getWebSocket();
    ws.onerror = () => this.addMessage("WebSocket error");
    ws.onopen = () => this.addMessage("WebSocket connectn established");
    ws.onclose = () => this.addMessage("WebSocket connection closed");
    ws.onmessage = msg => {
      msg = JSON.parse(msg.data);
      console.log(msg.type);
      switch (msg.type) {
        case "player-accpted":  
        this.props.changeComponent("question");
          break;
        case "player-not-accepted":
          this.setState({error:true});
      }
    }
  }
  addMessage(msg) {
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }
    console.log(msg);
  }

  sendname = event => {
    event.preventDefault();
    let msg = { type: "add-me-player", name: this.refs.name.value };
    msg = JSON.stringify(msg);
    const ws = getWebSocket();
    ws.send(msg);
  };
  checkerText = event => {
    if (event.target.value.length <= 3) {
      return this.setState({ coolWarning: true });
    }
  };
  showText = () => {
    if (this.state.coolWarning === true) {
      return (
        <label className="text-warning">
          Cool names are longer than 3 charecters ^_^
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
        <div className="row">
          <div className="col-7">
            <ListTeam />
          </div>

          <div className="col-3">
            <label>
              {this.state.error === true ?  <div className="alert alert-danger">code is not correct</div> : ''}
              <h6>Enter your name </h6>
            </label>
            {this.showText()}
            <form onSubmit={this.sendname}>
              <label>
                <input
                  type="text"
                  ref="name"
                  onChange={this.checkerText}
                  placeholder="Enter your name"
                />
              </label>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.question,
    text: state.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeComponent: Component => dispatch(changeComponent(Component))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
