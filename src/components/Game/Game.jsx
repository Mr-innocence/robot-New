import React from 'react';
import "./Game.css";
import Map from "../Map";

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div className="game">
                <Map></Map>
            </div>
        );
        
    }
}

export default Game;