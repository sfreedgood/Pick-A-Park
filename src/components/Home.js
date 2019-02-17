import React from "react"
import Select from "react-select"
import ParkList from "./Parks/ParkList"
import StateList from "../states.json"

//Get data from json object (a list of all 50 states and their state code)
const states = StateList

const Home = (props) =>{
    //Used for the "React-Select" plugin, seen as <Select/> JSX
    const options = states.map((state) => (
        {value: state.value, label: state.label}
        ))
    return(
        <div>
            <h1>{props.parks.length === 0 ? "Select a State to Pick a Park" : "Pick a Park"}</h1>
            <Select 
                value={props.selectedOption}
                onChange={props.handleChange}
                options={options}
            />
            <ParkList toggleButton={props.toggleButton} 
                    parkSelect={props.parkSelect}
                    parks={props.parks}
            />
        </div>
    )
}

export default Home