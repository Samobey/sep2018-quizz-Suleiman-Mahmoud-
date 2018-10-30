import React from "react";
import { connect } from "react-redux";
import Create from "./Create"
import ListPlayers from "./ListPlayers"
import Answers from "./Answers"
import SetQuistions from "./SetQuistions"
import Round from "./Round"
import { bindActionCreators } from "redux";

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={components:{
      create: <Create></Create>,
      listPlayers :<ListPlayers></ListPlayers>,
      answer:<Answers></Answers>,
      round :<Round></Round>,
      setQuistions:<SetQuistions></SetQuistions>

    }}
  }
 
  render() {
    return (
      <div className="container">
        <div className="row">
            {this.state.components[this.props.component]}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    component : state.appReducer.component,
  };
};
const matchDispatchToProps = dispatch => {
  return bindActionCreators({  }, dispatch);
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(App);
