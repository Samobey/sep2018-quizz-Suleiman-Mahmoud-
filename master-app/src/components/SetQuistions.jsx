import React, { Component } from 'react';
import CatagoryList from "./CatagoryList";
import Quistions from "./Quistions"

class ListPlayers extends Component {
    
    render() { 
        return ( 
        <div className="col-sm-12">
            <h1>Quizze  Round (1)</h1>
            <div className="col-sm-12 row">
                    <CatagoryList></CatagoryList>
                    <div className="float-right col-sm-4">
                        <button className="btn btn-primary">Start the quizze</button>
                    </div>
            </div>
            <div className="float-right col-sm-4">
                <button className=" btn btn-success">Choose the quistions</button>
            </div>
            <Quistions></Quistions>
        </div> );
    }
}
 
export default ListPlayers;