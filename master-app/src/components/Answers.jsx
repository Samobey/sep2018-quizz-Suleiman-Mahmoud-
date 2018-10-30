import React, { Component } from 'react';
import AnswersList from "./AnswersList";


class Answers extends Component {
    
    render() { 
        return ( 
        <div className="col-sm-12">
            <h1 className="text-center">All Answers</h1>
            <AnswersList></AnswersList>
            <div className="float-right mt-2">
                <button className="mr btn btn-danger">Close quistion</button>
                <button className="btn btn-success">Next quistion</button>
            </div>
        </div> );
    }
}
 
export default Answers;