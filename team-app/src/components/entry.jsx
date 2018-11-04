import React, { Component } from "react";
import { changeComponent,setQuizzerId } from "../actions";
import { connect } from "react-redux";
import { openWebSocket, getWebSocket } from "../data/serverCommunication";
class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { showButton: false,error:false };
    let ws = openWebSocket();
    ws.onerror = () => this.addMessage("WebSocket error");
    ws.onopen = () => this.addMessage("WebSocket connectn established");
    ws.onclose = () => this.addMessage("WebSocket connection closed");
    ws.onmessage = msg => {
      msg = JSON.parse(msg.data);
      console.log(msg.type);
      switch (msg.type) {
        case "code-accepted":
        this.props.setQuizzerId(this.refs.code.value);
        this.props.changeComponent("join");
          break;
        case "code-not-accepted":
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

  sendCode = event => {
    event.preventDefault();
    let msg = { type: "send_code", code: this.refs.code.value };
    msg = JSON.stringify(msg);
    const ws = getWebSocket();
    ws.send(msg);
  };
  showButtonFunction = ()=>{
    if(this.state.showButton === true) return <input className="btn ml-1" type="submit"  value="Submit" />
    return 
}
validateTheValue = (event)=>{
    if(event.target.value.length > 4){
        return this.setState({showButton:true});
    }
    this.setState({showButton:false});
}
  render() {
    return (
      <div>
        <h1 id="quizzer-title" className="text-primary">
          Quizzer
        </h1>
        <label>Enter your code</label>
        <form onSubmit={this.sendCode}>
        {this.state.error === true ?  <div className="alert alert-danger">code is not correct</div> : ''}
        {/* {this.state.error} */}
        <input className="mr" onChange={this.validateTheValue} ref="code" type="text" placeholder="xxxx"/>
                    {this.showButtonFunction()}
        </form>
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
    changeComponent: Component => dispatch(changeComponent(Component)),
    setQuizzerId: quizzerId => dispatch(setQuizzerId(quizzerId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
