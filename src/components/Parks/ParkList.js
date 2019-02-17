import React from "react"
import Park from "./Park"
import DSC04598 from "../../assets/images/DSC04598.JPG"
import "./park-list.css"

const ParkList = (props) =>{
    //Renders a photo if no data is present, displays data if data is present
    return(
        <div className="park-list">
            {props.parks && props.parks.length ?
                (<Park toggleButton={props.toggleButton}
                        parkSelect={props.parkSelect}
                        parks={props.parks}/>) :
                (<div className="img-container">
                    <img id="landing-img" src={DSC04598} alt="mountain lake"/>
                </div>)
            }
        </div>
    )
}

export default ParkList