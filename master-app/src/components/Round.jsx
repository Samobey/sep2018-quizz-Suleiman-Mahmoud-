import React, { Component } from 'react';



class Round extends Component {
    
    render() { 
        return (
        <div className="col-sm-12">
            <div className="mb-10">
                <h1 className="text-center">Finish the quizze or start a new round! </h1>
                <p className="text-center">The  round is finished. Do you want to start a new round?</p>
            </div>
            <div className="text-center mt-10">
                <button className="mr btn btn-danger">Finish th quizze</button>
                <button className="btn btn-success">New Round!</button>
            </div>
        </div> );
    }
}
 
export default Round;