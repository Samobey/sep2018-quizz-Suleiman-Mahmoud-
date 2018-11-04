import React, { Component } from "react";
import { connect } from "react-redux";
class ListTeam extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.teams.map(team => (
          <li key={team} className="list-group-item">{team}</li>
        ))}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTeam);
