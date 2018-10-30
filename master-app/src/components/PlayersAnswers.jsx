import React, { Component } from 'react';


class AnswersList extends Component {
    
    render() { 
        return ( 
        <div className="mt-2 col-sm-12 row">
            <div className="col-sm-8">
                <di>answer is very good answer</di>
            </div>
            <div className="float-right col-sm-4">
                <button className="mr btn btn-success">Accept</button>
                <button className="btn btn-danger">Reject</button>
            </div>
        </div> );
    }
}
 
export default AnswersList;