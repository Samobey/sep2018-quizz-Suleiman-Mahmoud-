import React, { Component } from 'react';
import PlayersAnswers from "./PlayersAnswers"


class AnswersList extends Component {
    
    render() { 
        return ( 
        <div className="col-sm-12 list border border-primary">
            <PlayersAnswers></PlayersAnswers>
            <PlayersAnswers></PlayersAnswers>
            <PlayersAnswers></PlayersAnswers>
            <PlayersAnswers></PlayersAnswers>
            <PlayersAnswers></PlayersAnswers>
            <PlayersAnswers></PlayersAnswers>
        </div> );
    }
}
 
export default AnswersList;