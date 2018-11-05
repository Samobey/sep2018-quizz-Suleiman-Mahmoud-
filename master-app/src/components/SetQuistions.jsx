import React, { Component } from "react";
import CatagoryList from "./CatagoryList";
import Quistions from "./Quistions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  loadCatagoriesAction,
  chooseComponent,
  increesQuistionsNumber
} from "../actions/index";
import { getWebSocket } from "../data/serverCommunication";
import { sendQuistions } from "../data/asyncData";

class SetQuistions extends Component {
  constructor(props) {
    super(props);
    this.props.loadCatagoriesAction();
  }
  startTheRound = () => {
    sendQuistions(
      this.props.quizzerCode,
      this.props.roundNumber,
      this.props.selectedQuistions
    )
      .then(res => {
        let msg = {
          type: "send-quistion",
          quistionNumber: this.props.quistionNumber,
          roundNumber : this.props.roundNumber,
        };
        msg = JSON.stringify(msg);
        this.props.increesQuistionsNumber();
        const ws = getWebSocket();
        ws.send(msg);
        this.props.chooseComponent("answer");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    console.log(this.props.selectedQuistions.length)
    return (
      <div className="col-sm-12">
        <h1>Quizzer Round ({this.props.roundNumber})</h1>
        <div className="col-sm-12 row">
          <CatagoryList />
          <div className="float-right col-sm-4">
          {this.props.selectedQuistions.length === 12 ? <button className="btn btn-primary" onClick={this.startTheRound}>
              Start the quizze
            </button> : ''}
            
          </div>
        </div>
        <h2 className="text-center">The number of choosed question ({this.props.selectedQuistions.length}) </h2>

        {this.props.addCatagories.length === 3 ?  <Quistions /> : ''}
        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    catagories: state.appReducer.catagories,
    selectedQuistions: state.appReducer.selectedQuistions,
    quistionNumber: state.appReducer.quistionNumber,
    quizzerCode: state.appReducer.quizzerCode,
    roundNumber: state.appReducer.roundNumber,
    addCatagories: state.appReducer.addCatagories
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { loadCatagoriesAction, chooseComponent, increesQuistionsNumber },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(SetQuistions);
