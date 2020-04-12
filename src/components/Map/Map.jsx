import React from 'react';
import "./Map.css";

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x: [0,1,2,3],
            y:[0,1,2,3]
        }
    }

    render(){
        const { x, y } = this.state;
        return(
            <div className="game-map">
            {y.map((yElement) =>(
                <div className="map-row">
                {x.map((xElement) => (
                    <span className="grid-element">{xElement}{yElement}</span>
                ))}            
            </div>
            ))}     
            </div>
        );
        
    }







}

export default Map;